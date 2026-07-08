import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { CalendarDays, MapPin } from "lucide-react";

const formatDate = (isoDate) => {
  const [, month, day] = isoDate.split("-");
  return `${month}.${day}`;
};

const formatDateRange = (startDate, endDate) => `${formatDate(startDate)} - ${formatDate(endDate)}`;

export default function BannerCarousel({ banners = [] }) {
  const [autoplay] = useState(() => Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }));

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((api) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleDotClick = (index) => {
    autoplay.reset();
    emblaApi?.scrollTo(index);
  };

  if (banners.length === 0) return null;

  return (
    <div className="banner-carousel">
      <div className="banner-viewport" ref={emblaRef}>
        <div className="banner-container">
          {banners.map((banner) => (
            <div className="banner-slide" key={banner.exhibitionId}>
              <img src={banner.bannerImageUrl} alt={banner.title} />
              <div className="banner-gradient" />

              <div className="banner-info">
                <h2 className="banner-title">{banner.title}</h2>
                <div className="banner-meta-row">
                  <CalendarDays size={16} />
                  <span>{formatDateRange(banner.startDate, banner.endDate)}</span>
                </div>
                <div className="banner-meta-row">
                  <MapPin size={16} />
                  <span>{banner.place}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="banner-dots">
        {banners.map((b, i) => (
          <button
            key={b.exhibitionId}
            className={`banner-dot${i === selectedIndex ? " banner-dot--active" : ""}`}
            onClick={() => handleDotClick(i)}
            aria-label={`${i + 1}번째 배너로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
