import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { HomePage } from "./pages/HomePage.jsx";
import { InfoPage } from "./pages/InfoPage.jsx";
import { WorksPage } from "./pages/WorksPage.jsx";
import { WorkDetailPage } from "./pages/WorkDetailPage.jsx";
import { sitePages } from "./data/sitePages.js";
import { usePortfolioMotion } from "./hooks/usePortfolioMotion.js";

function forceScrollTop() {
  const scrollingElement = document.scrollingElement || document.documentElement;
  const previousHtmlBehavior = document.documentElement.style.scrollBehavior;
  const previousBodyBehavior = document.body.style.scrollBehavior;

  document.documentElement.style.scrollBehavior = "auto";
  document.body.style.scrollBehavior = "auto";
  scrollingElement.scrollTop = 0;
  scrollingElement.scrollLeft = 0;
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
  document.documentElement.style.scrollBehavior = previousHtmlBehavior;
  document.body.style.scrollBehavior = previousBodyBehavior;
}

function forceScrollTo(top) {
  const scrollingElement = document.scrollingElement || document.documentElement;
  const previousHtmlBehavior = document.documentElement.style.scrollBehavior;
  const previousBodyBehavior = document.body.style.scrollBehavior;

  document.documentElement.style.scrollBehavior = "auto";
  document.body.style.scrollBehavior = "auto";
  scrollingElement.scrollTop = top;
  scrollingElement.scrollLeft = 0;
  document.documentElement.scrollTop = top;
  document.body.scrollTop = top;
  window.scrollTo(0, top);
  document.documentElement.style.scrollBehavior = previousHtmlBehavior;
  document.body.style.scrollBehavior = previousBodyBehavior;
}

function scrollToHash(hash) {
  const targetId = hash.startsWith("#") ? hash.slice(1) : hash;

  if (!targetId) {
    return;
  }

  const target = document.getElementById(decodeURIComponent(targetId));

  if (!target) {
    return;
  }

  const targetTop = target.getBoundingClientRect().top + window.scrollY;

  forceScrollTo(targetTop);
}

function scheduleScrollSettling(callback, options = {}) {
  const {
    cancelOnUserInput = false,
    delays = [0, 40, 120, 260, 520, 900, 1400],
  } = options;
  let canceled = false;
  const cancelSettling = () => {
    canceled = true;
  };
  const runCallback = () => {
    if (!canceled) {
      callback();
    }
  };
  const userEvents = ["wheel", "touchmove", "pointerdown", "keydown"];

  if (cancelOnUserInput) {
    userEvents.forEach((eventName) => {
      window.addEventListener(eventName, cancelSettling, { passive: true });
    });
  }

  runCallback();

  const frame = window.requestAnimationFrame(runCallback);
  const timeouts = delays.map((delay) => window.setTimeout(runCallback, delay));

  return () => {
    cancelSettling();
    window.cancelAnimationFrame(frame);
    timeouts.forEach((timeout) => window.clearTimeout(timeout));

    if (cancelOnUserInput) {
      userEvents.forEach((eventName) => {
        window.removeEventListener(eventName, cancelSettling);
      });
    }
  };
}

function ScrollToTop() {
  const { hash, key, pathname, search, state } = useLocation();

  useLayoutEffect(() => {
    const shouldScrollToWorks = pathname === "/" && (!hash || hash === "#works")
      && (state?.scrollToWorks === true
        || window.sessionStorage.getItem("caixin-scroll-to-works-once") === "true");

    if (shouldScrollToWorks) {
      const settleScroll = () => {
        window.sessionStorage.removeItem("caixin-scroll-to-works-once");
        scrollToHash("#works");
      };

      const cancelSettling = scheduleScrollSettling(settleScroll, {
        cancelOnUserInput: true,
        delays: [0, 48],
      });
      const cleanupHash = hash === "#works"
        ? window.setTimeout(() => {
          window.history.replaceState(window.history.state, "", `${pathname}${search}`);
        }, 260)
        : undefined;

      return () => {
        cancelSettling();
        window.clearTimeout(cleanupHash);
      };
    }

    if (!hash) {
      return scheduleScrollSettling(forceScrollTop);
    }

    if (pathname === "/" && hash === "#works" && !shouldScrollToWorks) {
      const cancelSettling = scheduleScrollSettling(forceScrollTop);
      const cleanupHash = window.setTimeout(() => {
        window.history.replaceState(window.history.state, "", `${pathname}${search}`);
      }, 0);

      return () => {
        cancelSettling();
        window.clearTimeout(cleanupHash);
      };
    }

    const cancelSettling = scheduleScrollSettling(() => scrollToHash(hash));

    return () => {
      cancelSettling();
    };
  }, [hash, key, pathname, search, state]);

  return null;
}

function MotionController() {
  const { hash, pathname, state } = useLocation();
  const isHomeWorksReturn = pathname === "/" && (!hash || hash === "#works")
    && (state?.scrollToWorks === true
      || window.sessionStorage.getItem("caixin-scroll-to-works-once") === "true");

  usePortfolioMotion(pathname, { isHomeWorksReturn });

  return null;
}

export function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <MotionController />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/classroom" element={<InfoPage page={sitePages.classroom} />} />
        <Route path="/teachers" element={<InfoPage page={sitePages.teachers} />} />
        <Route path="/works/:slug" element={<WorkDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
