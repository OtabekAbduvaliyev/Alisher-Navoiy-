import { ChevronLeft, ChevronRight, FileText, Maximize, Minimize } from 'lucide-react';
import type { NavoiySlide } from '../data/navoiySlides';
import { calculateProgressPercent, formatSlideCounter } from '../utils/presentation';

interface TimelineRailProps {
  slides: NavoiySlide[];
  currentIndex: number;
  showNotes: boolean;
  isFullscreen: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
  onToggleNotes: () => void;
  onToggleFullscreen: () => void;
}

export function TimelineRail({
  slides,
  currentIndex,
  showNotes,
  isFullscreen,
  onPrev,
  onNext,
  onSelectSlide,
  onToggleNotes,
  onToggleFullscreen,
}: TimelineRailProps) {
  const progress = calculateProgressPercent(currentIndex, slides.length);
  const counterLabel = formatSlideCounter(currentIndex, slides.length);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === slides.length - 1;

  return (
    <footer className="sticky bottom-0 z-20 border-t border-stone-300/80 bg-[#FBF9F5]/95 backdrop-blur-sm">
      {/* Hairline progress bar */}
      <div className="h-[2px] w-full bg-stone-200" aria-hidden="true">
        <div
          className="h-full bg-[#1E3A8A] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-3 px-4 py-2 sm:px-8 sm:py-3">
        {/* Left: Prev / Counter / Next */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onPrev}
            disabled={isFirst}
            aria-label="Oldingi slayd"
            className="inline-flex h-10 w-10 items-center justify-center border border-stone-300 bg-[#FBF9F5] text-stone-800 transition-colors duration-150 hover:bg-[#EBE6DF] disabled:opacity-35 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>

          <span
            data-testid="slide-counter"
            className="px-2 font-mono text-xs font-medium text-stone-700 tabular-nums whitespace-nowrap shrink-0"
          >
            {counterLabel}
          </span>

          <button
            type="button"
            onClick={onNext}
            disabled={isLast}
            aria-label="Keyingi slayd"
            className="inline-flex h-10 items-center gap-1.5 border border-stone-300 bg-[#FBF9F5] px-3 text-xs font-medium text-stone-900 transition-colors duration-150 hover:bg-[#EBE6DF] disabled:opacity-35 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            <span className="whitespace-nowrap shrink-0">Keyingi</span>
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Center: Interactive 8-chapter timeline rail (desktop) */}
        <nav
          aria-label="Boblar xronologiyasi"
          className="hidden lg:flex items-center gap-0.5"
        >
          {slides.map((slide, idx) => {
            const active = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => onSelectSlide(idx)}
                aria-label={`${idx + 1}-slayd: ${slide.shortTitle}`}
                aria-current={active ? 'step' : undefined}
                className={`px-2 py-2 text-xs transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
                  active
                    ? 'bg-[#EBE6DF] text-[#1E3A8A] font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-[#F2EDE4]'
                }`}
              >
                <span className="font-mono text-[11px] mr-1 tabular-nums opacity-70">
                  {String(idx + 1).padStart(2, '0')}{' '}
                </span>
                <span>{slide.shortTitle}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Speaker Notes & Fullscreen */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleNotes}
            aria-expanded={showNotes}
            className={`inline-flex h-10 items-center gap-1.5 border px-3 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
              showNotes
                ? 'border-[#1E3A8A] bg-[#1E3A8A] text-[#FBF9F5]'
                : 'border-stone-300 bg-[#FBF9F5] text-stone-800 hover:bg-[#EBE6DF]'
            }`}
          >
            <FileText className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span className="hidden sm:inline">Ma’ruzachi qaydlari</span>
            <span className="sm:hidden">Qaydlar</span>
          </button>

          <button
            type="button"
            onClick={onToggleFullscreen}
            aria-label={isFullscreen ? 'To‘liq ekrandan chiqish' : 'To‘liq ekran'}
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center border border-stone-300 bg-[#FBF9F5] text-stone-700 transition-colors duration-150 hover:bg-[#EBE6DF] hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <Maximize className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>
    </footer>
  );
}
