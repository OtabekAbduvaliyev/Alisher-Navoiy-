import { X } from 'lucide-react';
import type { NavoiySlide } from '../data/navoiySlides';

interface ImageLightboxProps {
  slide: NavoiySlide | null;
  onClose: () => void;
}

export function ImageLightbox({ slide, onClose }: ImageLightboxProps) {
  if (!slide) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-caption"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col border border-stone-700 bg-[#FBF9F5] p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-stone-300 pb-3">
          <div className="flex items-center gap-3 text-xs text-stone-600">
            <span className="font-mono font-medium text-[#1E3A8A] tabular-nums">
              {slide.accessionCode}
            </span>
            <span aria-hidden="true">·</span>
            <span>{slide.location}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Ko‘rish oynasini yopish"
            className="inline-flex h-10 w-10 items-center justify-center border border-stone-300 bg-[#FBF9F5] text-stone-800 hover:bg-[#EBE6DF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="mt-4 flex-1 overflow-hidden bg-[#EBE6DF] border border-stone-300/75">
          <img
            src={slide.imageSrc}
            alt={slide.imageAlt}
            referrerPolicy="no-referrer"
            className="max-h-[68vh] w-full object-contain mx-auto"
          />
        </div>

        <p
          id="lightbox-caption"
          className="mt-3 font-serif text-sm italic text-stone-700"
        >
          {slide.imageCaption}
        </p>
      </div>
    </div>
  );
}
