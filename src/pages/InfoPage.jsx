import { Image as ImageIcon } from "lucide-react";
import { BackButton } from "../components/BackButton.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";

export function InfoPage({ page }) {
  return (
    <main className="page page--info">
      <SiteHeader />
      <section className="info-page">
        <BackButton fallbackTo="/">返回学员作品</BackButton>
        <div className="info-page__layout">
          <div className="info-page__copy">
            <span className="detail__eyebrow">{page.eyebrow}</span>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
            <div className="info-page__blocks">
              {page.blocks.map((block) => (
                <div key={block}>
                  <ImageIcon size={18} />
                  <span>{block}</span>
                </div>
              ))}
            </div>
          </div>
          <figure className="info-page__visual">
            <div className="info-page__visual-frame">
              <img src={page.image} alt={`${page.title}图片占位`} />
            </div>
            <figcaption>{page.subtitle}，后续可替换真实图片、视频或长图内容。</figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}
