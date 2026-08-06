import { Link } from "react-router-dom";
import { assetPaths, getWorkCategoryId } from "../data/works.js";

export function WorkCard({ backTo, sourceCategory, work }) {
  const categoryId = sourceCategory || getWorkCategoryId(work);
  const detailPath = `/works/${work.slug}?from=${encodeURIComponent(categoryId)}`;
  const detailState = {
    backTo: backTo || `/?category=${encodeURIComponent(categoryId)}#works`,
  };

  return (
    <article className="work-card">
      <div className="work-card__surface">
        <Link className="work-card__media" to={detailPath} state={detailState} aria-label={`查看${work.title}`}>
          <img className="work-card__thumbnail" src={work.thumbnail} alt={work.title} loading="lazy" />
          <img className="work-card__watermark" src={assetPaths.watermark} alt="" aria-hidden="true" loading="lazy" />
        </Link>
        <div className="work-card__body">
          <Link className="work-card__title" to={detailPath} state={detailState}>
            {work.title}
          </Link>
          <p>{work.summary}</p>
        </div>
      </div>
    </article>
  );
}
