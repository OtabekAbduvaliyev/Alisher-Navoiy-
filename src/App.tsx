import { useCallback, useEffect, useState } from 'react';
import { ImageLightbox } from './components/ImageLightbox';
import { SlideIndexModal } from './components/SlideIndexModal';
import { SlideStage } from './components/SlideStage';
import { TimelineRail } from './components/TimelineRail';
import { TopBar } from './components/TopBar';
import { NAVOIY_SLIDES, type NavoiySlide } from './data/navoiySlides';
import {
  clampSlideIndex,
  getSlideIndexByGroup,
  getSlideIndexFromQuery,
  nextSlideIndex,
  prevSlideIndex,
  resolvePresentationKeyAction,
  type NavGroup,
} from './utils/presentation';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return getSlideIndexFromQuery(window.location.search, NAVOIY_SLIDES);
  });
  const [showNotes, setShowNotes] = useState(false);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [inspectedSlide, setInspectedSlide] = useState<NavoiySlide | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentSlide = NAVOIY_SLIDES[currentIndex] ?? NAVOIY_SLIDES[0];

  const handleSelectSlide = useCallback((index: number) => {
    setCurrentIndex(clampSlideIndex(index, NAVOIY_SLIDES.length));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => prevSlideIndex(prev, NAVOIY_SLIDES.length));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => nextSlideIndex(prev, NAVOIY_SLIDES.length));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectGroup = useCallback(
    (group: NavGroup) => {
      const targetIndex = getSlideIndexByGroup(group, NAVOIY_SLIDES);
      handleSelectSlide(targetIndex);
    },
    [handleSelectSlide]
  );

  const handleToggleFullscreen = useCallback(() => {
    if (typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditableTarget = Boolean(
        target &&
          (target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.tagName === 'SELECT' ||
            target.isContentEditable)
      );

      const action = resolvePresentationKeyAction(event.key, {
        hasModalOpen: isIndexOpen || inspectedSlide !== null,
        isEditableTarget,
        totalSlides: NAVOIY_SLIDES.length,
      });

      if (!action) return;

      if (action.type === 'next' && event.key === ' ') {
        const isButton = target?.tagName === 'BUTTON' || target?.tagName === 'A';
        if (isButton) return;
        event.preventDefault();
      }

      switch (action.type) {
        case 'next':
          handleNext();
          break;
        case 'prev':
          handlePrev();
          break;
        case 'first':
          handleSelectSlide(0);
          break;
        case 'last':
          handleSelectSlide(NAVOIY_SLIDES.length - 1);
          break;
        case 'jump':
          handleSelectSlide(action.index);
          break;
        case 'toggle-index':
          setIsIndexOpen((open) => !open);
          break;
        case 'toggle-notes':
          setShowNotes((open) => !open);
          break;
        case 'close-overlays':
          setIsIndexOpen(false);
          setInspectedSlide(null);
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev, handleSelectSlide, inspectedSlide, isIndexOpen]);

  return (
    <div
      data-state={`slide-${currentIndex + 1}`}
      className="flex min-h-screen flex-col overflow-x-clip bg-[#FBF9F5] text-[#1C1917]"
    >
      <TopBar
        activeGroup={currentSlide.navGroup}
        onSelectGroup={handleSelectGroup}
        onOpenIndex={() => setIsIndexOpen(true)}
      />

      <SlideStage
        slide={currentSlide}
        showNotes={showNotes}
        onStartChronicle={() => handleSelectSlide(1)}
        onInspectImage={(slide) => setInspectedSlide(slide)}
      />

      <TimelineRail
        slides={NAVOIY_SLIDES}
        currentIndex={currentIndex}
        showNotes={showNotes}
        isFullscreen={isFullscreen}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelectSlide={handleSelectSlide}
        onToggleNotes={() => setShowNotes((prev) => !prev)}
        onToggleFullscreen={handleToggleFullscreen}
      />

      <SlideIndexModal
        isOpen={isIndexOpen}
        slides={NAVOIY_SLIDES}
        currentIndex={currentIndex}
        onClose={() => setIsIndexOpen(false)}
        onSelectSlide={handleSelectSlide}
      />

      <ImageLightbox
        slide={inspectedSlide}
        onClose={() => setInspectedSlide(null)}
      />
    </div>
  );
}
