import { BackButton } from "../components/BackButton.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";
import { WorkCard } from "../components/WorkCard.jsx";
import { allWorks, getWorkCategoryId } from "../data/works.js";
import { useSearchParams } from "react-router-dom";

function getValidCategoryId(value) {
  return value === "ip" || value === "ui" ? value : "";
}

export function WorksPage() {
  const [searchParams] = useSearchParams();
  const categoryId = getValidCategoryId(searchParams.get("category"));

  return (
    <main className="page">
      <SiteHeader />
      <section className="works-list-page">
        <BackButton fallbackTo="/">返回首页</BackButton>
        <div className="works-list-page__heading">
          <span className="detail__eyebrow">Excellent Works</span>
          <h1>全部学员作品</h1>
          <p>这里集中展示学员完整作品长图，后续可以继续扩展分类筛选、视频作品和更多案例。</p>
        </div>
        <div className="works-grid works-grid--list">
          {allWorks.map((work) => {
            const sourceCategory = categoryId || getWorkCategoryId(work);

            return (
              <WorkCard
                backTo={`/?category=${sourceCategory}#works`}
                key={work.slug}
                sourceCategory={sourceCategory}
                work={work}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
