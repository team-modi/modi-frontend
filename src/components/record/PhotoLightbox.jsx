// 사진 라이트박스 — 기록 상세의 사진/영상을 전체화면으로 넘겨 본다.
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

// styles
import "@styles/record/PhotoLightbox.css";

// icons
import closeIcon from "@images/icons/Action/Close.svg";

export default function PhotoLightbox({ media = [], startIndex = 0, onClose }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex, loop: media.length > 1 });
  const [selectedIndex, setSelectedIndex] = useState(startIndex);

  const onSelect = useCallback((api) => setSelectedIndex(api.selectedScrollSnap()), []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  // 열려 있는 동안 배경 스크롤 잠그고 ESC 로 닫는다.
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (media.length === 0) return null;

  return (
    <div className="photo-lightbox" role="dialog" aria-modal="true">
      <div className="photo-lightbox-topbar">
        <span className="photo-lightbox-counter text-body-2-medium">
          {selectedIndex + 1}/{media.length}
        </span>
        <button type="button" className="photo-lightbox-close" onClick={onClose} aria-label="닫기">
          <img src={closeIcon} alt="" width={24} height={24} />
        </button>
      </div>

      <div className="photo-lightbox-viewport" ref={emblaRef}>
        <div className="photo-lightbox-container">
          {media.map((item, index) => (
            <div className="photo-lightbox-slide" key={item.url ?? index}>
              {item.type === "VIDEO" ? (
                <video src={item.url} className="photo-lightbox-media" controls playsInline />
              ) : (
                <img src={item.url} alt="" className="photo-lightbox-media" />
              )}
            </div>
          ))}
        </div>
      </div>

      {media.length > 1 && (
        <div className="photo-lightbox-dots">
          {media.map((item, index) => (
            <button
              key={item.url ?? index}
              type="button"
              className={`photo-lightbox-dot${index === selectedIndex ? " is-active" : ""}`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`${index + 1}번째 사진`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
