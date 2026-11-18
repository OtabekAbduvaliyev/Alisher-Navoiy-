import {
  LITERARY_WORKS,
  NAVOIY_SLIDES,
  type LiteraryWork,
  type NavoiySlide,
  type WorkCategory,
} from '../data/navoiySlides';

export type NavGroup = NavoiySlide['navGroup'];

export type KeyAction =
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'first' }
  | { type: 'last' }
  | { type: 'toggle-index' }
  | { type: 'toggle-notes' }
  | { type: 'close-overlays' }
  | { type: 'jump'; index: number }
  | null;

export function clampSlideIndex(index: number, total: number = NAVOIY_SLIDES.length): number {
  if (total <= 0) return 0;
  if (Number.isNaN(index)) return 0;
  return Math.max(0, Math.min(total - 1, Math.trunc(index)));
}

export function nextSlideIndex(current: number, total: number = NAVOIY_SLIDES.length): number {
  return clampSlideIndex(current + 1, total);
}

export function prevSlideIndex(current: number, total: number = NAVOIY_SLIDES.length): number {
  return clampSlideIndex(current - 1, total);
}

export function calculateProgressPercent(
  currentIndex: number,
  total: number = NAVOIY_SLIDES.length
): number {
  if (total <= 1) return 100;
  const clamped = clampSlideIndex(currentIndex, total);
  return Math.round(((clamped + 1) / total) * 100);
}

export function formatSlideCounter(
  currentIndex: number,
  total: number = NAVOIY_SLIDES.length
): string {
  const clamped = clampSlideIndex(currentIndex, total);
  const currentStr = String(clamped + 1).padStart(2, '0');
  const totalStr = String(Math.max(1, total)).padStart(2, '0');
  return `${currentStr} / ${totalStr}`;
}

export function getSlideIndexByGroup(
  group: NavGroup,
  slides: NavoiySlide[] = NAVOIY_SLIDES
): number {
  const found = slides.findIndex((slide) => slide.navGroup === group);
  return found >= 0 ? found : 0;
}

export function getSlideIndexFromQuery(
  search: string,
  slides: NavoiySlide[] = NAVOIY_SLIDES
): number {
  if (!search) return 0;
  const params = new URLSearchParams(search);
  const slideParam = params.get('slide');
  if (!slideParam) return 0;

  const asNumber = Number(slideParam);
  if (Number.isInteger(asNumber) && asNumber >= 1 && asNumber <= slides.length) {
    return asNumber - 1;
  }

  const byId = slides.findIndex((s) => s.id.toLowerCase() === slideParam.toLowerCase());
  return byId >= 0 ? byId : 0;
}

export function filterWorksByCategory(
  category: WorkCategory,
  works: LiteraryWork[] = LITERARY_WORKS
): LiteraryWork[] {
  if (category === 'Barchasi') return works;
  return works.filter((work) => work.category === category);
}

export function resolvePresentationKeyAction(
  key: string,
  options: {
    hasModalOpen: boolean;
    isEditableTarget: boolean;
    totalSlides?: number;
  }
): KeyAction {
  const total = options.totalSlides ?? NAVOIY_SLIDES.length;

  if (key === 'Escape') {
    return { type: 'close-overlays' };
  }

  if (options.isEditableTarget || options.hasModalOpen) {
    return null;
  }

  switch (key) {
    case 'ArrowRight':
    case 'PageDown':
    case ' ':
      return { type: 'next' };
    case 'ArrowLeft':
    case 'PageUp':
      return { type: 'prev' };
    case 'Home':
      return { type: 'first' };
    case 'End':
      return { type: 'last' };
    case 'g':
    case 'G':
      return { type: 'toggle-index' };
    case 'n':
    case 'N':
      return { type: 'toggle-notes' };
    default: {
      const digit = Number(key);
      if (Number.isInteger(digit) && digit >= 1 && digit <= total) {
        return { type: 'jump', index: digit - 1 };
      }
      return null;
    }
  }
}
