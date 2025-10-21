import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Faction } from '../data/types';

interface FactionSelectionProps {
  factions: Faction[];
  onSelectFaction: (factionId: string) => void;
}

export const FactionSelection = ({ factions, onSelectFaction }: FactionSelectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<(HTMLElement | null)[]>([]);

  const safeActiveIndex = useMemo(() => {
    if (activeIndex < 0) {
      return 0;
    }
    if (activeIndex >= factions.length) {
      return factions.length - 1;
    }
    return activeIndex;
  }, [activeIndex, factions.length]);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const slide = slidesRef.current[index];
      if (slide) {
        slide.scrollIntoView({ behavior, block: 'nearest', inline: 'center' });
      }
    },
    []
  );

  const handleSetActive = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      if (index < 0) {
        index = factions.length - 1;
      }
      if (index >= factions.length) {
        index = 0;
      }
      setActiveIndex(index);
      scrollToIndex(index, behavior);
    },
    [factions.length, scrollToIndex]
  );

  useEffect(() => {
    slidesRef.current = slidesRef.current.slice(0, factions.length);
    handleSetActive(0, 'auto');
  }, [factions.length, handleSetActive]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) {
      return;
    }

    let animationFrame: number | null = null;

    const updateActiveIndex = () => {
      animationFrame = null;
      const containerRect = container.getBoundingClientRect();
      const center = containerRect.left + containerRect.width / 2;

      let closestIndex = safeActiveIndex;
      let smallestDistance = Number.POSITIVE_INFINITY;

      slidesRef.current.forEach((slide, index) => {
        if (!slide) {
          return;
        }
        const rect = slide.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;
        const distance = Math.abs(slideCenter - center);
        if (distance < smallestDistance - 1) {
          smallestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== safeActiveIndex) {
        setActiveIndex(closestIndex);
      }
    };

    const handleScroll = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateActiveIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [safeActiveIndex]);

  const handlePrev = () => handleSetActive(safeActiveIndex - 1);
  const handleNext = () => handleSetActive(safeActiveIndex + 1);

  return (
    <section className="faction-selection" aria-label="Выбор нации">
      <header className="faction-selection__header">
        <h2>Выбор нации</h2>
        <p className="section-description">
          Каждая нация имеет своё наследие, список имён и внешний облик. Пролистайте галерею и
          выберите тех, чья история ближе вашему сердцу.
        </p>
      </header>

      <div className="faction-carousel-wrapper">
        <button
          type="button"
          className="carousel-control"
          aria-label="Предыдущая нация"
          onClick={handlePrev}
        >
          ‹
        </button>

        <div className="faction-carousel" ref={carouselRef}>
          {factions.map((faction, index) => (
            <article
              key={faction.id}
              className={
                index === safeActiveIndex ? 'faction-slide is-active' : 'faction-slide'
              }
              ref={(node) => {
                slidesRef.current[index] = node;
              }}
            >
              <div className="faction-slide-media">
                <img src={faction.portraitSrc} alt={`Изображение нации ${faction.name}`} />
                <span className="faction-slide-emoji" aria-hidden>
                  {faction.avatarEmoji}
                </span>
              </div>

              <div className="faction-slide-body">
                <div className="faction-slide-title">
                  <h3>{faction.name}</h3>
                  <p className="faction-slide-modern">Современность: {faction.modernEquivalent}</p>
                </div>
                <p className="faction-slide-description">{faction.description}</p>

                <ul className="faction-traits" aria-label="Особенности">
                  {faction.traits.map((trait) => (
                    <li key={trait}>{trait}</li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="button button-primary faction-slide-action"
                  onClick={() => onSelectFaction(faction.id)}
                >
                  Выбрать
                </button>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="carousel-control"
          aria-label="Следующая нация"
          onClick={handleNext}
        >
          ›
        </button>
      </div>

      <div className="faction-carousel-indicators" role="tablist" aria-label="Список наций">
        {factions.map((faction, index) => (
          <button
            key={faction.id}
            type="button"
            className={
              index === safeActiveIndex ? 'carousel-indicator is-active' : 'carousel-indicator'
            }
            aria-label={`Показать ${faction.name}`}
            aria-pressed={index === safeActiveIndex}
            onClick={() => handleSetActive(index)}
          >
            <span aria-hidden>{faction.avatarEmoji}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
