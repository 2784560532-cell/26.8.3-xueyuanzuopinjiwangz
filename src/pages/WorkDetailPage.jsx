import { Share2, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BackButton } from "../components/BackButton.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";
import { allWorks, getWorkCategoryId } from "../data/works.js";

function formatCategoryLabel(category) {
  return category.replace(" Design", "设计");
}

function getWorkTags(work) {
  const categoryLabel = formatCategoryLabel(work.category);

  if (work.category.includes("IP")) {
    return ["原创作品", "平面", "IP形象", "小脑府", categoryLabel, "形象设计", "菜心设计铺", "菜心"];
  }

  return ["原创作品", "UI", "界面设计", "APP设计", categoryLabel, "作品集", "菜心设计铺", "菜心"];
}

function getValidCategoryId(value) {
  return value === "ip" || value === "ui" ? value : "";
}

function getDetailImages(work) {
  const images = Array.isArray(work.detailImages) && work.detailImages.length
    ? work.detailImages
    : [work.detailImage];

  return images.filter(Boolean);
}

export function WorkDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const work = allWorks.find((item) => item.slug === slug);
  const sourceCategoryId = getValidCategoryId(new URLSearchParams(location.search).get("from")) || getWorkCategoryId(work);
  const backTarget = typeof location.state?.backTo === "string"
    ? location.state.backTo
    : `/?category=${encodeURIComponent(sourceCategoryId)}#works`;
  const [shareLink, setShareLink] = useState("");
  const [shareStatus, setShareStatus] = useState("");

  useEffect(() => {
    setShareLink("");
    setShareStatus("");
  }, [work]);

  async function handleShare() {
    if (!work) {
      return;
    }

    const url = `${window.location.origin}/works/${work.slug}`;
    setShareLink(url);

    try {
      await window.navigator.clipboard?.writeText(url);
      setShareStatus("分享链接已复制");
    } catch {
      setShareStatus("分享链接已生成");
    }
  }

  if (!work) {
    return (
      <main className="page page--work-detail">
        <SiteHeader />
        <section className="detail detail--empty">
          <BackButton fallbackTo="/?category=ui#works" preferFallback>返回作品列表</BackButton>
          <h1>作品未找到</h1>
        </section>
      </main>
    );
  }

  const detailImages = getDetailImages(work);

  return (
    <main className="page page--work-detail">
      <SiteHeader />
      <article className="detail detail--showcase">
        <BackButton fallbackTo={backTarget} preferFallback>返回作品列表</BackButton>

        <header className="detail__masthead">
          <div className="detail__copy">
            <h1>{work.title}</h1>
            <div className="detail__author">
              <img src="/assets/brand-logo.png" alt="菜心设计铺" />
              <div>
                <strong>{work.author || "菜心设计铺学员"}</strong>
                <p>{formatCategoryLabel(work.category)} / 版权</p>
              </div>
            </div>
          </div>
        </header>

        <section className="detail__content">
          {detailImages.map((image, index) => (
            <figure
              className={`detail__visual${index === 0 ? " detail__visual--primary" : " detail__visual--stacked"}`}
              key={`${work.slug}-${image}`}
            >
              <div className="detail__visual-frame">
                <img
                  className="detail__visual-image"
                  src={image}
                  alt={detailImages.length > 1 ? `${work.title}作品图 ${index + 1}` : `${work.title}详情页图片占位`}
                />
                <span className="detail__visual-watermark" aria-hidden="true" />
              </div>
            </figure>
          ))}

          <section className="detail__zcool-footer" aria-label="作品底部互动">
            <div className="detail__footer-tools">
              <div className="detail__aux-actions" aria-label="作品辅助操作">
                <button className="detail__text-action" type="button">
                  <Volume2 size={15} />
                  声明
                </button>
              </div>
              <div className="detail__collect-actions" aria-label="分享作品">
                <button className="detail__pill-action" type="button" onClick={handleShare}>
                  <Share2 size={17} />
                  分享
                </button>
              </div>
            </div>
            {shareLink ? (
              <p className="detail__share-link" role="status">
                <span>{shareStatus}</span>
                <strong>{shareLink}</strong>
              </p>
            ) : null}

            <div className="detail__tags" aria-label="作品标签">
              {getWorkTags(work).map((tag) => (
                <span className="detail__tag" key={`${work.slug}-${tag}`}>{tag}</span>
              ))}
            </div>
          </section>
        </section>
      </article>
    </main>
  );
}
