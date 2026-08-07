import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const hasMotion = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function revealSet(selector, vars = {}) {
  const targets = gsap.utils.toArray(selector);

  if (!targets.length) {
    return;
  }

  gsap.set(targets, {
    autoAlpha: 0,
    clipPath: "inset(0 0 100% 0)",
    y: 34,
    scaleY: 0.92,
    transformOrigin: "50% 100%",
    ...vars,
  });
}

function animatePageIntro() {
  const timeline = gsap.timeline({
    defaults: { duration: 1.18, ease: "power4.out" },
  });

  timeline
    .fromTo(
      ".site-header__inner",
      { autoAlpha: 0, y: -26, filter: "blur(10px)" },
      { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1 },
      0,
    )
    .fromTo(
      ".hero__media",
      {
        clipPath: "inset(0 0 42% 0)",
        filter: "blur(10px) brightness(0.82)",
        scale: 1.14,
        y: 44,
      },
      {
        clipPath: "inset(0 0 0% 0)",
        filter: "blur(0px) brightness(1)",
        scale: 1,
        y: 0,
        duration: 1.65,
      },
      0.06,
    )
    .fromTo(
      ".section-heading h1",
      {
        autoAlpha: 0,
        clipPath: "inset(0 100% 0 0)",
        scaleX: 0.88,
        x: -76,
        y: 28,
        transformOrigin: "0% 50%",
      },
      {
        autoAlpha: 1,
        clipPath: "inset(0 0% 0 0)",
        scaleX: 1,
        x: 0,
        y: 0,
        duration: 1.35,
      },
      0.58,
    )
    .fromTo(
      ".section-heading p",
      { autoAlpha: 0, clipPath: "inset(0 0 100% 0)", y: 26 },
      { autoAlpha: 1, clipPath: "inset(0 0 0% 0)", y: 0, duration: 1 },
      0.86,
    )
    .fromTo(
      ".more-link",
      { autoAlpha: 0, x: 36, clipPath: "inset(0 100% 0 0)" },
      { autoAlpha: 1, x: 0, clipPath: "inset(0 0% 0 0)", duration: 0.92 },
      1.02,
    )
    .fromTo(
      ".works-tabs",
      { autoAlpha: 0, clipPath: "inset(0 0 100% 0)", y: 24 },
      { autoAlpha: 1, clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.88 },
      1.06,
    )
    .fromTo(
      ".works-section .work-card",
      {
        autoAlpha: 0,
        y: (index) => 54 + (index % 3) * 18,
        scale: 0.965,
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1.08,
        stagger: { amount: 0.62, from: "start" },
        ease: "power4.out",
        onComplete: () => gsap.set(".works-section .work-card", { clearProps: "clipPath" }),
      },
      1.18,
    )
    .fromTo(
      ".works-section .work-card__thumbnail",
      {
        autoAlpha: 0,
        clipPath: "inset(22% 0 0 0)",
        filter: "blur(14px) brightness(0.76)",
        yPercent: 14,
        scale: 1.12,
      },
      {
        autoAlpha: 1,
        clipPath: "inset(0% 0 0 0)",
        filter: "blur(0px) brightness(1)",
        yPercent: -2,
        scale: 1.055,
        duration: 1.14,
        stagger: { amount: 0.7, from: "start" },
        ease: "power4.out",
        onComplete: () => gsap.set(".works-section .work-card__thumbnail", { clearProps: "clipPath" }),
      },
      1.28,
    );
}

function prepareHomeWorksReturn() {
  gsap.set(
    [
      ".site-header__inner",
      ".hero__media",
      ".section-heading h1",
      ".section-heading p",
      ".more-link",
      ".works-tabs",
      ".works-section .work-card",
      ".works-section .work-card__media",
      ".works-section .work-card__thumbnail",
    ],
    { clearProps: "all" },
  );

  gsap.set(
    [
      ".site-header__inner",
      ".hero__media",
      ".section-heading h1",
      ".section-heading p",
      ".more-link",
      ".works-tabs",
    ],
    {
      autoAlpha: 1,
      clipPath: "inset(0 0 0 0)",
      filter: "none",
      x: 0,
      y: 0,
      scale: 1,
      scaleX: 1,
      scaleY: 1,
    },
  );

  gsap.set(".works-section .work-card", {
    autoAlpha: 1,
    clearProps: "clipPath,clip-path",
    x: 0,
    y: 0,
    scale: 1,
  });

  gsap.set(".works-section .work-card__media", {
    autoAlpha: 1,
    clearProps: "clipPath,clip-path",
    filter: "none",
    x: 0,
    y: 0,
    scale: 1,
  });

  gsap.set(".works-section .work-card__thumbnail", {
    autoAlpha: 1,
    clearProps: "clipPath,clip-path",
    filter: "none",
    x: 0,
    y: 0,
    yPercent: -2,
    scale: 1.055,
  });
}

function animateContentPages() {
  revealSet(".back-link", { x: -24, y: 0, scaleY: 1, clipPath: "inset(0 100% 0 0)" });
  revealSet(".detail__eyebrow", { y: 18, scaleY: 1 });
  revealSet(".detail h1, .info-page h1, .works-list-page__heading h1", {
    clipPath: "inset(0 100% 0 0)",
    x: -56,
    y: 22,
    scaleX: 0.9,
    scaleY: 1,
    transformOrigin: "0% 50%",
  });
  revealSet(".detail__copy p, .info-page__copy p, .works-list-page__heading p", { y: 28, scaleY: 1 });
  revealSet(".detail__author, .info-page__blocks > div", {
    y: 24,
    scaleY: 1,
  });
  gsap.set(".works-list-page .work-card__thumbnail", {
    autoAlpha: 0,
    clipPath: "inset(26% 0 0 0)",
    filter: "blur(14px) brightness(0.76)",
    yPercent: 16,
    scale: 1.12,
  });
  gsap.set(".detail__visual--primary", {
    autoAlpha: 1,
    y: 48,
    scale: 0.985,
    transformOrigin: "50% 100%",
  });
  gsap.set(".detail__visual--stacked", {
    autoAlpha: 0,
    y: 64,
    scale: 0.982,
    transformOrigin: "50% 100%",
  });
  gsap.set(".info-page__visual", {
    autoAlpha: 0,
    y: 56,
    scale: 0.966,
    transformOrigin: "50% 100%",
  });
  gsap.set(".detail__visual--primary .detail__visual-frame", {
    clipPath: "inset(0 0 0 0)",
    "--detail-frame-mask-y": "0%",
  });
  gsap.set(".detail__visual--stacked .detail__visual-frame", {
    clipPath: "inset(0 0 0 0)",
    "--detail-frame-mask-y": "0%",
  });
  gsap.set(".info-page__visual-frame", {
    clipPath: "inset(100% 0 0 0)",
  });
  gsap.set(".detail__visual--primary .detail__visual-image", {
    autoAlpha: 1,
    clipPath: "inset(0% 0 0 0)",
    filter: "blur(12px) brightness(0.8)",
    scale: 1,
    x: 0,
    yPercent: 0,
    transformOrigin: "50% 0%",
  });
  gsap.set(".detail__visual--stacked .detail__visual-image", {
    autoAlpha: 1,
    clipPath: "inset(0% 0 0 0)",
    filter: "blur(12px) brightness(0.8)",
    scale: 1,
    x: 0,
    yPercent: 0,
    transformOrigin: "50% 0%",
  });
  gsap.set(".info-page__visual img", {
    autoAlpha: 0,
    clipPath: "inset(26% 0 0 0)",
    filter: "blur(14px) brightness(0.76)",
    scale: 1.12,
    x: 0,
    yPercent: 16,
    transformOrigin: "50% 50%",
  });
  gsap.set(".info-page__visual figcaption", {
    autoAlpha: 0,
    y: 18,
  });
  revealSet(".detail__zcool-footer", { y: 30, scaleY: 1, clipPath: "inset(8% 0 0 0)" });

  gsap.timeline({ defaults: { ease: "power4.out" } })
    .to(".back-link", {
      autoAlpha: 1,
      clipPath: "inset(0 0% 0 0)",
      x: 0,
      y: 0,
      duration: 0.86,
    })
    .to(".detail__eyebrow", {
      autoAlpha: 1,
      clipPath: "inset(0 0 0% 0)",
      y: 0,
      duration: 0.78,
    }, 0.12)
    .to(".detail h1, .info-page h1, .works-list-page__heading h1", {
      autoAlpha: 1,
      clipPath: "inset(0 0% 0 0)",
      x: 0,
      y: 0,
      scaleX: 1,
      duration: 1.18,
    }, 0.18)
    .to(".detail__copy p, .info-page__copy p, .works-list-page__heading p", {
      autoAlpha: 1,
      clipPath: "inset(0 0 0% 0)",
      y: 0,
      duration: 0.92,
    }, 0.42)
    .to(".detail__author, .info-page__blocks > div", {
      autoAlpha: 1,
      clipPath: "inset(0 0 0% 0)",
      y: 0,
      stagger: 0.09,
      duration: 0.82,
    }, 0.58)
    .to(".detail__visual--primary", {
      y: 0,
      scale: 1,
      duration: 1.18,
      ease: "power4.out",
    }, 0.34)
    .to(".info-page__visual", {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 1.16,
      ease: "power4.out",
    }, 0.34)
    .to(".detail__visual--primary .detail__visual-frame", {
      "--detail-frame-mask-y": "-102%",
      duration: 1.18,
      ease: "power4.out",
    }, 0.34)
    .to(".info-page__visual-frame", {
      clipPath: "inset(0 0 0% 0)",
      duration: 1.16,
      ease: "power4.out",
    }, 0.34)
    .to(".detail__visual--primary .detail__visual-image", {
      clipPath: "inset(0% 0 0 0)",
      filter: "blur(0px) brightness(1)",
      scale: 1,
      x: 0,
      yPercent: 0,
      duration: 1.18,
      ease: "power4.out",
    }, 0.38)
    .to(".info-page__visual img", {
      autoAlpha: 1,
      clipPath: "inset(0% 0 0 0)",
      filter: "blur(0px) brightness(1)",
      scale: 1.055,
      x: 0,
      yPercent: -2,
      duration: 1.18,
      ease: "power4.out",
    }, 0.38)
    .to(".info-page__visual figcaption", {
      autoAlpha: 1,
      y: 0,
      duration: 0.72,
      ease: "power3.out",
    }, 1.18)
    .to(".detail__zcool-footer", {
      autoAlpha: 1,
      clipPath: "inset(0 0 0% 0)",
      y: 0,
      duration: 0.82,
      ease: "power3.out",
    }, 1.04);
}

function animateWorksListPage() {
  gsap.set(".back-link", {
    autoAlpha: 0,
    clipPath: "inset(0 100% 0 0)",
    x: -24,
  });
  gsap.set(".detail__eyebrow", {
    autoAlpha: 0,
    clipPath: "inset(0 0 100% 0)",
    y: 18,
  });
  gsap.set(".works-list-page__heading h1", {
    autoAlpha: 0,
    clipPath: "inset(0 100% 0 0)",
    x: -56,
    y: 22,
    scaleX: 0.9,
    transformOrigin: "0% 50%",
  });
  gsap.set(".works-list-page__heading p", {
    autoAlpha: 0,
    clipPath: "inset(0 0 100% 0)",
    y: 28,
  });
  gsap.set(".works-list-page .work-card", {
    autoAlpha: 0,
    y: (index) => 46 + Math.floor(index / 3) * 14,
    scale: 0.966,
  });
  gsap.set(".works-list-page .work-card__media", {
    clipPath: "inset(100% 0 0 0)",
  });
  gsap.set(".works-list-page .work-card__thumbnail", {
    autoAlpha: 0,
    clipPath: "inset(18% 0 0 0)",
    filter: "blur(14px) brightness(0.76)",
    yPercent: 16,
    scale: 1.12,
  });
  gsap.set(".works-list-page .work-card__body", {
    autoAlpha: 0,
    y: 18,
  });

  gsap.timeline({ defaults: { ease: "power4.out" } })
    .to(".back-link", {
      autoAlpha: 1,
      clipPath: "inset(0 0% 0 0)",
      x: 0,
      duration: 0.86,
    })
    .to(".detail__eyebrow", {
      autoAlpha: 1,
      clipPath: "inset(0 0 0% 0)",
      y: 0,
      duration: 0.78,
    }, 0.12)
    .to(".works-list-page__heading h1", {
      autoAlpha: 1,
      clipPath: "inset(0 0% 0 0)",
      x: 0,
      y: 0,
      scaleX: 1,
      duration: 1.18,
    }, 0.18)
    .to(".works-list-page__heading p", {
      autoAlpha: 1,
      clipPath: "inset(0 0 0% 0)",
      y: 0,
      duration: 0.92,
      ease: "power3.out",
    }, 0.42)
    .to(".works-list-page .work-card", {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 1.06,
      stagger: (index) => Math.floor(index / 3) * 0.08,
    }, 0.62)
    .to(".works-list-page .work-card__media", {
      clipPath: "inset(0% 0 0 0)",
      duration: 1.08,
      stagger: (index) => Math.floor(index / 3) * 0.08,
    }, 0.62)
    .to(".works-list-page .work-card__thumbnail", {
      autoAlpha: 1,
      clipPath: "inset(0% 0 0 0)",
      filter: "blur(0px) brightness(1)",
      yPercent: -2,
      scale: 1.055,
      duration: 1.1,
      stagger: (index) => Math.floor(index / 3) * 0.08,
    }, 0.66)
    .to(".works-list-page .work-card__body", {
      autoAlpha: 1,
      y: 0,
      duration: 0.76,
      ease: "power3.out",
      stagger: (index) => Math.floor(index / 3) * 0.08,
    }, 0.92);
}

function setupScrollReveals(pathname) {
  gsap.utils.toArray(".works-list-page__heading, .section-heading").forEach((heading) => {
    if (pathname === "/works") {
      return;
    }

    if (pathname === "/" && heading.closest(".works-section")) {
      return;
    }

    const title = heading.querySelector("h1");
    const copy = heading.querySelector("p");

    if (!title) {
      return;
    }

    gsap.fromTo(
      title,
      {
        autoAlpha: 0,
        clipPath: "inset(0 100% 0 0)",
        x: -90,
        scaleX: 0.86,
        transformOrigin: "0% 50%",
      },
      {
        autoAlpha: 1,
        clipPath: "inset(0 0% 0 0)",
        x: 0,
        scaleX: 1,
        duration: 1.16,
        ease: "power4.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 78%",
          once: true,
        },
      },
    );

    if (copy) {
      gsap.fromTo(
        copy,
        { autoAlpha: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.92,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 74%",
            once: true,
          },
        },
      );
    }
  });

  gsap.utils.toArray(".works-grid").forEach((grid) => {
    if (pathname === "/works") {
      return;
    }

    if (pathname === "/" && grid.closest(".works-section")) {
      return;
    }

    const cards = gsap.utils.toArray(grid.querySelectorAll(".work-card"));

    gsap.fromTo(
      cards,
      {
        autoAlpha: 0,
        clipPath: "inset(0 0 100% 0 round 12px)",
        y: (index) => 56 + (index % 3) * 16,
        scale: 0.966,
      },
      {
        autoAlpha: 1,
        clipPath: "inset(0 0 0% 0 round 12px)",
        y: 0,
        scale: 1,
        duration: 1.06,
        ease: "power4.out",
        stagger: { amount: 0.58, grid: "auto", from: "start" },
        onComplete: () => gsap.set(cards, { clearProps: "clipPath" }),
        scrollTrigger: {
          trigger: grid,
          start: "top 82%",
          once: true,
        },
      },
    );

    const cardImages = gsap.utils.toArray(grid.querySelectorAll(".work-card__thumbnail"));

    gsap.fromTo(
      cardImages,
      {
        autoAlpha: 0,
        clipPath: "inset(26% 0 0 0)",
        filter: "blur(14px) brightness(0.76)",
        yPercent: 16,
        scale: 1.12,
      },
      {
        autoAlpha: 1,
        clipPath: "inset(0% 0 0 0)",
        filter: "blur(0px) brightness(1)",
        yPercent: -2,
        scale: 1.055,
        duration: 1.1,
        ease: "power4.out",
        stagger: { amount: 0.6, grid: "auto", from: "start" },
        onComplete: () => gsap.set(cardImages, { clearProps: "clipPath" }),
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          once: true,
        },
      },
    );
  });

  gsap.utils.toArray(".work-card__thumbnail").forEach((image) => {
    if (pathname === "/works") {
      return;
    }

    gsap.fromTo(
      image,
      { yPercent: -2, scale: 1.055 },
      {
        yPercent: 4,
        scale: 1.03,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: image.closest(".work-card"),
          start: "top bottom",
          end: "bottom top",
          scrub: 0.75,
        },
      },
    );
  });

  gsap.utils.toArray(".detail__visual--stacked").forEach((visual) => {
    const frame = visual.querySelector(".detail__visual-frame");
    const image = visual.querySelector(".detail__visual-image");

    if (!frame || !image) {
      return;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: visual,
        start: "top 78%",
        once: true,
      },
      defaults: {
        ease: "power4.out",
      },
    });

    timeline
      .to(visual, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1.08,
      }, 0)
      .to(frame, {
        "--detail-frame-mask-y": "-102%",
        duration: 1.12,
      }, 0)
      .to(image, {
        filter: "blur(0px) brightness(1)",
        duration: 1.12,
      }, 0.04);
  });

}

function updateMotionDebugState(pathname) {
  document.documentElement.dataset.motionPath = pathname;
  document.documentElement.dataset.scrollTriggers = String(ScrollTrigger.getAll().length);
  window.__portfolioMotion = {
    enabled: true,
    pathname,
    scrollTriggers: ScrollTrigger.getAll().length,
  };
}

export function usePortfolioMotion(pathname, options = {}) {
  useLayoutEffect(() => {
    if (!hasMotion()) {
      document.documentElement.dataset.motion = "reduced";
      return undefined;
    }

    document.documentElement.dataset.motion = "enabled";

    const context = gsap.context(() => {
      const motionPrepTargets = gsap.utils.toArray(".motion-prep");

      if (motionPrepTargets.length) {
        gsap.set(motionPrepTargets, { clearProps: "all" });
      }

      if (pathname === "/" && options.isHomeWorksReturn) {
        prepareHomeWorksReturn();
      } else if (pathname === "/") {
        animatePageIntro();
      } else if (pathname === "/works") {
        animateWorksListPage();
      } else {
        animateContentPages();
      }

      setupScrollReveals(pathname);
      updateMotionDebugState(pathname);
      const refreshId = window.setTimeout(() => {
        ScrollTrigger.refresh();
        updateMotionDebugState(pathname);
      }, 120);

      window.__portfolioMotionRefreshId = refreshId;
    });

    return () => {
      window.clearTimeout(window.__portfolioMotionRefreshId);
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname, options.isHomeWorksReturn]);
}
