import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BackButton({ children = "返回上一页", fallbackTo = "/", preferFallback = false }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (!preferFallback && (window.history.state?.idx ?? 0) > 0) {
      navigate(-1);
      return;
    }

    const shouldScrollToWorks = fallbackTo.includes("#works");
    const target = shouldScrollToWorks ? fallbackTo.replace("#works", "") : fallbackTo;

    if (shouldScrollToWorks) {
      window.sessionStorage.setItem("caixin-scroll-to-works-once", "true");
    }

    navigate(target, { state: shouldScrollToWorks ? { scrollToWorks: true } : undefined });
  };

  return (
    <button className="back-link" type="button" onClick={handleBack}>
      <ArrowLeft size={18} />
      {children}
    </button>
  );
}
