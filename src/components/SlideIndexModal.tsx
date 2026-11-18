import { X } from 'lucide-react';
import type { NavoiySlide } from '../data/navoiySlides';

interface SlideIndexModalProps {
  isOpen: boolean;
  slides: NavoiySlide[];
  currentIndex: number;
  onClose: () => void;
  onSelectSlide: (index: number) => void;
}

export function SlideIndexModal({
  isOpen,
  slides,
  currentIndex,
  onClose,
  onSelectSlide,
}: SlideIndexModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="slide-index-heading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-5xl overflow-y-auto border border-stone-300 bg-[#FBF9F5] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-stone-300/80 pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#1E3A8A]">
              Ko‘rgazma mundarijasi · 1441–1501
            </p>
            <h2
              id="slide-index-heading"
              className="mt-1 font-serif text-2xl font-semibold text-stone-900 sm:text-3xl"
            >
              To‘liq hayot solnomasi — Slaydlar ro‘yxati
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Slaydlar ro‘yxatini yopish"
            className="inline-flex h-10 w-10 items-center justify-center border border-stone-300 bg-[#FBF9F5] text-stone-700 hover:bg-[#EBE6DF] hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {slides.map((slide, idx) => {
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => {
                  onSelectSlide(idx);
                  onClose();
                }}
                className={`group flex flex-col overflow-hidden border text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
                  isCurrent
                    ? 'border-[#1E3A8A] bg-[#F2EDE4]'
                    : 'border-stone-300/80 bg-[#FBF9F5] hover:border-stone-400 hover:bg-[#F2EDE4]/60'
                }`}
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#EBE6DF] border-b border-stone-300/70">
                  <img
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-2 p-3.5">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-stone-500 tabular-nums">
                      <span className={isCurrent ? 'text-[#1E3A8A] font-medium' : ''}>
                        {slide.folio}
                      </span>
                      <span>{slide.era}</span>
                    </div>
                    <h3 className="mt-1 font-serif text-base font-semibold leading-snug text-stone-900">
                      {slide.shortTitle}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-600">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
