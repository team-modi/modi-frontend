import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";

// components
import Footer from "@components/common/Footer";
import BottomSheet from "@components/common/BottomSheet";
import PhotoLightbox from "@components/record/PhotoLightbox";

// api
import { getDetailRecord, deleteRecord } from "@api/record";

// styles
import "@styles/record/DetailRecordPage.css";

// util
import { formatDateDot } from "@utils/common.js";

// icons
import chevronLeftIcon from "@images/icons/Action/Chevron Left.svg";

const DetailRecordPage = () => {
  const { recordId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const menuRef = useRef(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const response = await getDetailRecord(recordId);
        if (!ignore) setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [recordId]);

  const onSelect = useCallback((api) => setSlideIndex(api.selectedScrollSnap()), []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // 메뉴 바깥 클릭 시 닫기
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteRecord(recordId);
      navigate("/archive", { replace: true });
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  if (!data) {
    return (
      <div className="app-shell">
        <div className="app-content">
          <p className="detail-record-loading text-body-1-regular">로딩중...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const title = data.exhibitionTitle;
  const posterUrl = data.exhibitionPosterUrl;
  const artistLine = data.exhibitionArtist ?? data.artistLine;
  const emotionCodes = data.emotionCodes ?? [];
  const media = data.media ?? [];
  // 사진/영상이 있으면 상단 캐러셀에 쓰고, 없으면 포스터 한 장으로 대신 채운다.
  const slides = media.length > 0 ? media : posterUrl ? [{ type: "PHOTO", url: posterUrl }] : [];

  return (
    <div className="app-shell">
      <div className="app-content detail-record-content-area">
        <div className="detail-record-hero">
          {slides.length > 0 ? (
            <div className="detail-record-hero-viewport" ref={emblaRef}>
              <div className="detail-record-hero-container">
                {slides.map((item, index) => (
                  <button
                    type="button"
                    className="detail-record-hero-slide"
                    key={item.url ?? index}
                    onClick={() => media.length > 0 && setLightboxIndex(index)}
                  >
                    {item.type === "VIDEO" ? (
                      <video src={item.url} className="detail-record-hero-media" muted playsInline />
                    ) : (
                      <img src={item.url} alt="" className="detail-record-hero-media" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="detail-record-hero-empty" />
          )}

          <button
            type="button"
            className="detail-record-hero-btn detail-record-hero-back"
            onClick={() => navigate(-1)}
            aria-label="뒤로가기"
          >
            <img src={chevronLeftIcon} alt="" width={22} height={22} />
          </button>

          <div className="detail-record-menu" ref={menuRef}>
            <button
              type="button"
              className="detail-record-hero-btn detail-record-hero-more"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="더보기"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                <circle cx="5" cy="11" r="1.6" fill="currentColor" />
                <circle cx="11" cy="11" r="1.6" fill="currentColor" />
                <circle cx="17" cy="11" r="1.6" fill="currentColor" />
              </svg>
            </button>
            {isMenuOpen && (
              <ul className="detail-record-menu-list">
                <li>
                  <button
                    type="button"
                    className="detail-record-menu-item detail-record-menu-item--danger text-body-2-regular"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDeleteOpen(true);
                    }}
                  >
                    삭제하기
                  </button>
                </li>
              </ul>
            )}
          </div>

          {slides.length > 1 && (
            <span className="detail-record-hero-counter text-caption-1">
              {slideIndex + 1}/{slides.length}
            </span>
          )}
        </div>

        <div className="app-content-pad detail-record">
          {posterUrl && (
            <div
              className="detail-record-poster"
              style={{ backgroundImage: `url(${posterUrl})` }}
            />
          )}

          <div className="detail-record-head">
            <h1 className="detail-record-title text-title-3">{title}</h1>
            {artistLine && <p className="detail-record-artist text-body-2-regular">{artistLine}</p>}
            <p className="detail-record-date text-body-2-regular">{formatDateDot(data.viewedAt)}</p>
          </div>

          <div className="detail-record-divider" />

          {emotionCodes.length > 0 && (
            <section className="detail-record-section">
              <h2 className="detail-record-section-title text-heading-2">감정 키워드</h2>
              <div className="detail-record-emotion-chips">
                {emotionCodes.map((keyword) => (
                  <span key={keyword} className="detail-record-emotion-chip text-label-2">
                    {keyword}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section className="detail-record-section">
            <h2 className="detail-record-section-title text-heading-2">그날의 감상</h2>
            <p className="detail-record-content text-body-2-regular">{data.content}</p>
          </section>
        </div>
      </div>
      <Footer />

      <BottomSheet isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <h2 className="detail-record-delete-title text-title-3">기록을 삭제할까요?</h2>
        <p className="detail-record-delete-desc text-body-2-regular">
          삭제한 기록은 다시 볼 수 없어요.
        </p>
        <button
          type="button"
          className="detail-record-delete-confirm text-body-1-medium"
          disabled={isDeleting}
          onClick={handleDelete}
        >
          {isDeleting ? "삭제 중..." : "삭제할게요"}
        </button>
        <button
          type="button"
          className="detail-record-delete-cancel text-body-1-medium"
          onClick={() => setIsDeleteOpen(false)}
        >
          취소
        </button>
      </BottomSheet>

      {lightboxIndex !== null && (
        <PhotoLightbox media={media} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </div>
  );
};

export default DetailRecordPage;
