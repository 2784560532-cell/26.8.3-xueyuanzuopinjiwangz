import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SiteHeader } from "../components/SiteHeader.jsx";
import { WorkCard } from "../components/WorkCard.jsx";
import { assetPaths, ipWorks, works } from "../data/works.js";

const workGroups = [
  {
    id: "ui",
    label: "UI课学员作品",
    works,
  },
  {
    id: "ip",
    label: "IP课学员作品",
    works: ipWorks,
  },
];

export function HomePage() {
  const [searchParams] = useSearchParams();
  const requestedGroupId = searchParams.get("category");
  const initialGroupId = workGroups.some((group) => group.id === requestedGroupId)
    ? requestedGroupId
    : workGroups[0].id;
  const [activeGroupId, setActiveGroupId] = useState(initialGroupId);
  const activeGroupIndex = workGroups.findIndex((group) => group.id === activeGroupId);
  const sliderIndex = Math.max(0, activeGroupIndex);

  useEffect(() => {
    setActiveGroupId(workGroups.some((group) => group.id === requestedGroupId) ? requestedGroupId : workGroups[0].id);
  }, [requestedGroupId]);

  return (
    <main className="page page--home">
      <SiteHeader />
      <section className="hero" aria-label="菜心设计铺作品集首页视觉">
        <video
          aria-hidden="true"
          autoPlay
          className="hero__media"
          loop
          muted
          playsInline
          poster={assetPaths.hero}
        >
          <source src={assetPaths.heroVideo} type="video/mp4" />
        </video>
      </section>
      <section className="works-section" id="works">
        <div className="section-heading">
          <div>
            <h1>Excellent Works</h1>
            <p>
              <span>学员名人堂</span>作品集
            </p>
          </div>
          <Link className="more-link" to={`/works?category=${activeGroupId}`} aria-label="查看更多作品">
            查看更多
            <ArrowRight size={15} strokeWidth={1.8} />
          </Link>
        </div>
        <div className="works-tabs" role="tablist" aria-label="学员作品分类">
          {workGroups.map((group) => (
            <button
              aria-controls={`works-panel-${group.id}`}
              aria-selected={activeGroupId === group.id}
              className={`works-tabs__button${activeGroupId === group.id ? " is-active" : ""}`}
              id={`works-tab-${group.id}`}
              key={group.id}
              onClick={() => setActiveGroupId(group.id)}
              role="tab"
              type="button"
            >
              {group.label}
            </button>
          ))}
        </div>
        <div className="works-slider" style={{ "--active-panel": sliderIndex }}>
          <div className="works-slider__track">
            {workGroups.map((group) => (
              <div
                aria-hidden={activeGroupId !== group.id}
                aria-labelledby={`works-tab-${group.id}`}
                className="works-slider__panel"
                id={`works-panel-${group.id}`}
                key={group.id}
                role="tabpanel"
              >
                {group.works.length ? (
                  <div className="works-grid">
                    {group.works.map((work) => (
                      <WorkCard
                        backTo={`/?category=${group.id}#works`}
                        key={work.slug}
                        sourceCategory={group.id}
                        work={work}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="works-empty">
                    <span>Coming Soon</span>
                    <strong>IP课学员作品待上传</strong>
                    <p>这里已预留作品入口，后续替换真实 IP 课程作品素材即可展示。</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
