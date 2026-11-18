import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import {
  KHAMSA_EPICS,
  LITERARY_WORKS,
  POETIC_WISDOM,
  type NavoiySlide,
  type WorkCategory,
} from '../data/navoiySlides';
import { filterWorksByCategory } from '../utils/presentation';
import { ArchivalImage } from './ArchivalImage';

interface SlideStageProps {
  slide: NavoiySlide;
  showNotes: boolean;
  onStartChronicle: () => void;
  onInspectImage: (slide: NavoiySlide) => void;
}

const WORK_CATEGORIES: WorkCategory[] = [
  'Barchasi',
  'Nazm',
  'Tilshunoslik',
  'Tarix va axloq',
];

export function SlideStage({
  slide,
  showNotes,
  onStartChronicle,
  onInspectImage,
}: SlideStageProps) {
  const [selectedEpicId, setSelectedEpicId] = useState<string>(KHAMSA_EPICS[0].id);
  const [selectedWorkCategory, setSelectedWorkCategory] = useState<WorkCategory>('Barchasi');
  const [selectedWisdomId, setSelectedWisdomId] = useState<string>(POETIC_WISDOM[0].id);
  const notesRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (showNotes && notesRef.current) {
      notesRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [showNotes]);

  const activeEpic =
    KHAMSA_EPICS.find((epic) => epic.id === selectedEpicId) ?? KHAMSA_EPICS[0];
  const filteredWorks = filterWorksByCategory(selectedWorkCategory, LITERARY_WORKS);
  const activeWisdom =
    POETIC_WISDOM.find((item) => item.id === selectedWisdomId) ?? POETIC_WISDOM[0];

  return (
    <main className="mx-auto w-full max-w-[1360px] flex-1 px-5 py-5 sm:px-8 sm:py-6">
      <article
        key={slide.id}
        data-testid={`slide-${slide.id}`}
        className="flex flex-col gap-5 sm:gap-6"
      >
        {/* Slide Metadata Kicker (Unboxed, zero pills) */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-300/75 pb-3">
          <div className="flex flex-wrap items-center gap-2.5 text-xs uppercase tracking-[0.14em] text-stone-500">
            <span className="font-mono font-medium text-[#1E3A8A] tabular-nums">
              {slide.folio}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-stone-700">{slide.era}</span>
            <span aria-hidden="true">·</span>
            <span>{slide.location}</span>
          </div>

          <span className="font-mono text-xs text-stone-500 tabular-nums">
            {slide.accessionCode}
          </span>
        </div>

        {/* Variant 1: Hero Portrait Title Slide */}
        {slide.variant === 'hero-portrait' && (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="min-w-0 flex flex-col justify-between gap-4 lg:col-span-7">
                <div className="flex flex-col gap-3.5">
                  <h1 className="font-serif text-4xl font-semibold leading-[1.06] tracking-tight text-stone-900 text-balance sm:text-5xl lg:text-[3.35rem]">
                    {slide.title}
                  </h1>
                  <p className="font-serif text-xl italic text-stone-700 sm:text-2xl">
                    {slide.subtitle}
                  </p>

                  <div className="h-px w-20 bg-stone-300" aria-hidden="true" />

                  <p className="max-w-prose text-[15.5px] leading-relaxed text-stone-700">
                    {slide.leadParagraph}
                  </p>
                  {slide.bodyParagraphs.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="max-w-prose text-[15px] leading-relaxed text-stone-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="button"
                    onClick={onStartChronicle}
                    className="inline-flex min-h-[42px] items-center gap-2.5 bg-[#1E3A8A] px-5 py-2 text-sm font-medium text-[#FBF9F5] transition-colors duration-150 hover:bg-[#172E6E] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                  >
                    <span>Hayot solnomasini boshlash</span>
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                  <span className="text-xs text-stone-500">
                    8 bob bo‘ylab harakatlanish uchun strelka tugmalari yoki pastdagi yo‘lakchadan foydalaning
                  </span>
                </div>

                <blockquote className="border-y border-stone-300/75 py-3.5">
                  <p className="font-serif text-lg italic leading-snug text-stone-900 sm:text-xl">
                    “{slide.quote.text}”
                  </p>
                  <footer className="mt-1.5 text-xs uppercase tracking-widest text-stone-500">
                    {slide.quote.attribution}
                  </footer>
                </blockquote>
              </div>

              <div className="min-w-0 lg:col-span-5 flex flex-col">
                <ArchivalImage
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  caption={slide.imageCaption}
                  accessionCode={slide.accessionCode}
                  aspectClass="aspect-[3/4] lg:aspect-auto lg:h-[465px]"
                  onInspect={() => onInspectImage(slide)}
                />
              </div>
            </div>

            {/* Full-width 4-column summary strip below hero split */}
            <dl className="grid grid-cols-2 border-y border-stone-300/80 bg-[#F2EDE4]/60 sm:grid-cols-4">
              {slide.highlights.map((item, idx) => (
                <div
                  key={item.label}
                  className={`min-w-0 px-4 py-3.5 ${
                    idx > 0 ? 'sm:border-l sm:border-stone-300/75' : ''
                  } ${idx >= 2 ? 'border-t border-stone-300/75 sm:border-t-0' : ''} ${
                    idx % 2 === 1 ? 'border-l border-stone-300/75 sm:border-l' : ''
                  }`}
                >
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-stone-500">
                    {item.label}
                  </dt>
                  <dd className="mt-0.5 font-serif text-xl font-semibold text-stone-900 tabular-nums sm:text-2xl">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Variant 2: Editorial Biographical Split */}
        {slide.variant === 'editorial-split' && (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 flex flex-col gap-5 lg:col-span-7">
              <div>
                <h1 className="font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-stone-900 text-balance sm:text-4xl lg:text-[2.65rem]">
                  {slide.title}
                </h1>
                <p className="mt-2 font-serif text-xl italic text-stone-600">
                  {slide.subtitle}
                </p>
              </div>

              <div className="h-px w-full bg-stone-300/75" aria-hidden="true" />

              <div className="flex flex-col gap-4 max-w-prose">
                <p className="text-[16px] leading-[1.7] text-stone-800 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-[#1E3A8A]">
                  {slide.leadParagraph}
                </p>
                {slide.bodyParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-[15.5px] leading-[1.7] text-stone-700">
                    {paragraph}
                  </p>
                ))}
              </div>

              <blockquote className="mt-1 border-y border-stone-300/75 py-4">
                <p className="font-serif text-xl italic leading-relaxed text-stone-900 sm:text-2xl">
                  “{slide.quote.text}”
                </p>
                <footer className="mt-1.5 text-xs uppercase tracking-widest text-stone-500">
                  {slide.quote.attribution}
                </footer>
              </blockquote>
            </div>

            <div className="min-w-0 flex flex-col gap-5 lg:col-span-5">
              <ArchivalImage
                src={slide.imageSrc}
                alt={slide.imageAlt}
                caption={slide.imageCaption}
                accessionCode={slide.accessionCode}
                aspectClass="aspect-[4/3]"
                onInspect={() => onInspectImage(slide)}
              />

              <dl className="border border-stone-300/80 bg-[#F2EDE4]/55 divide-y divide-stone-300/75">
                {slide.highlights.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-4 px-4 py-3"
                  >
                    <dt className="text-xs uppercase tracking-wider text-stone-500">
                      {item.label}
                    </dt>
                    <dd className="font-serif text-lg font-medium text-stone-900 tabular-nums text-right">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}

        {/* Variant 3: Architectural Monograph Plate */}
        {slide.variant === 'architectural-plate' && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 items-end gap-4 lg:grid-cols-12">
              <div className="min-w-0 lg:col-span-8">
                <h1 className="font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-stone-900 text-balance sm:text-4xl lg:text-[2.65rem]">
                  {slide.title}
                </h1>
                <p className="mt-1.5 font-serif text-xl italic text-stone-600">
                  {slide.subtitle}
                </p>
              </div>
              <div className="min-w-0 lg:col-span-4 lg:text-right">
                <p className="text-xs uppercase tracking-[0.14em] text-stone-500">
                  Vaqf hujjati · Vaqfiya
                </p>
                <p className="mt-1 font-mono text-sm font-medium text-[#78350F] tabular-nums">
                  Hirot obodonchiligi, 1476–1498
                </p>
              </div>
            </div>

            <ArchivalImage
              src={slide.imageSrc}
              alt={slide.imageAlt}
              caption={slide.imageCaption}
              accessionCode={slide.accessionCode}
              aspectClass="aspect-[16/7] lg:aspect-[16/5.5]"
              onInspect={() => onInspectImage(slide)}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="min-w-0 flex flex-col gap-3.5 lg:col-span-7 max-w-prose">
                <p className="text-[15.5px] leading-[1.7] text-stone-800">
                  {slide.leadParagraph}
                </p>
                {slide.bodyParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-[15px] leading-[1.7] text-stone-700">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="min-w-0 flex flex-col justify-between gap-4 lg:col-span-5">
                <dl className="grid grid-cols-2 border border-stone-300/80 bg-[#F2EDE4]/60">
                  {slide.highlights.map((item, idx) => (
                    <div
                      key={item.label}
                      className={`min-w-0 p-3.5 ${
                        idx % 2 === 1 ? 'border-l border-stone-300/75' : ''
                      } ${idx >= 2 ? 'border-t border-stone-300/75' : ''}`}
                    >
                      <dt className="text-[11px] uppercase tracking-wider text-stone-500">
                        {item.label}
                      </dt>
                      <dd className="mt-0.5 font-serif text-lg font-semibold text-stone-900 tabular-nums">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <blockquote className="border-y border-stone-300/75 py-3.5">
                  <p className="font-serif text-lg italic leading-relaxed text-stone-900">
                    “{slide.quote.text}”
                  </p>
                  <footer className="mt-1 text-xs uppercase tracking-widest text-stone-500">
                    {slide.quote.attribution}
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        )}

        {/* Variant 4: Interactive Khamsa 5-Epic Explorer */}
        {slide.variant === 'khamsa-explorer' && (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 flex flex-col gap-4 lg:col-span-5">
              <div>
                <h1 className="font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-stone-900 text-balance sm:text-4xl">
                  {slide.title}
                </h1>
                <p className="mt-1.5 font-serif text-lg italic text-stone-600">
                  {slide.subtitle}
                </p>
              </div>

              <p className="text-[15px] leading-relaxed text-stone-700">
                {slide.leadParagraph}
              </p>

              <ArchivalImage
                src={slide.imageSrc}
                alt={slide.imageAlt}
                caption={slide.imageCaption}
                accessionCode={slide.accessionCode}
                aspectClass="aspect-[4/3] lg:max-h-[320px]"
                onInspect={() => onInspectImage(slide)}
              />
            </div>

            <div className="min-w-0 flex flex-col gap-4 lg:col-span-7">
              {/* 5-Epic Selector Tabs */}
              <div
                role="tablist"
                aria-label="Xamsaning besh dostoni"
                className="grid grid-cols-1 gap-1.5 bg-[#EBE6DF] p-1.5 sm:grid-cols-5"
              >
                {KHAMSA_EPICS.map((epic) => {
                  const isActive = epic.id === activeEpic.id;
                  return (
                    <button
                      key={epic.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedEpicId(epic.id)}
                      className={`flex flex-col items-start px-3 py-2 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
                        isActive
                          ? 'bg-[#FBF9F5] text-[#1E3A8A] border border-stone-300/90'
                          : 'text-stone-700 hover:bg-[#FBF9F5]/60 hover:text-stone-900 border border-transparent'
                      }`}
                    >
                      <span className="font-mono text-[11px] tabular-nums opacity-75">
                        {epic.order} · {epic.year}
                      </span>
                      <span className="mt-0.5 font-serif text-sm font-semibold leading-tight truncate w-full">
                        {epic.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Epic Inspection Folio */}
              <div
                role="tabpanel"
                aria-label={activeEpic.title}
                className="flex flex-col gap-5 border border-stone-300/80 bg-[#F2EDE4]/50 p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-stone-300/75 pb-3.5">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-[#1E3A8A] tabular-nums">
                      Doston {activeEpic.order} / 05 · {activeEpic.year}-yil
                    </p>
                    <h2 className="mt-1 font-serif text-2xl font-semibold text-stone-900 sm:text-3xl">
                      {activeEpic.title}
                    </h2>
                    <p className="font-serif text-base italic text-stone-600 sm:text-lg">
                      {activeEpic.subtitle}
                    </p>
                  </div>

                  <dl className="flex items-center gap-6 text-right">
                    <div>
                      <dt className="text-[11px] uppercase tracking-wider text-stone-500">
                        Hajmi
                      </dt>
                      <dd className="font-mono text-sm font-medium text-stone-900 tabular-nums">
                        {activeEpic.couplets.toLocaleString('uz-UZ')} bayt
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-wider text-stone-500">
                        Vazni
                      </dt>
                      <dd className="font-serif text-base font-medium text-stone-900">
                        {activeEpic.meter}
                      </dd>
                    </div>
                  </dl>
                </div>

                <p className="text-[15px] leading-[1.7] text-stone-700">
                  {activeEpic.synopsis}
                </p>

                <div className="border-y border-stone-300/80 py-4">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-stone-500">
                    Tanlangan bayt va mazmuni
                  </p>
                  <p className="mt-1.5 font-serif text-xl font-medium text-stone-900">
                    {activeEpic.coupletOriginal}
                  </p>
                  <p className="mt-1.5 font-serif text-lg italic text-[#1E3A8A]">
                    «{activeEpic.coupletMeaning}»
                  </p>
                </div>

                <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {slide.highlights.map((item) => (
                    <div key={item.label}>
                      <dt className="text-[11px] uppercase tracking-wider text-stone-500">
                        {item.label}
                      </dt>
                      <dd className="mt-0.5 font-mono text-xs font-medium text-stone-800 tabular-nums">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        )}

        {/* Variant 5: Filterable Works & Linguistics Catalog */}
        {slide.variant === 'works-catalog' && (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 flex flex-col gap-4 lg:col-span-5">
              <div>
                <h1 className="font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-stone-900 text-balance sm:text-4xl">
                  {slide.title}
                </h1>
                <p className="mt-1.5 font-serif text-lg italic text-stone-600">
                  {slide.subtitle}
                </p>
              </div>

              <p className="text-[15px] leading-relaxed text-stone-700">
                {slide.leadParagraph}
              </p>
              {slide.bodyParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-[14.5px] leading-relaxed text-stone-600">
                  {paragraph}
                </p>
              ))}

              <ArchivalImage
                src={slide.imageSrc}
                alt={slide.imageAlt}
                caption={slide.imageCaption}
                accessionCode={slide.accessionCode}
                aspectClass="aspect-[4/3] lg:max-h-[290px]"
                onInspect={() => onInspectImage(slide)}
              />
            </div>

            <div className="min-w-0 flex flex-col gap-4 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-300/80 pb-3.5">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#1E3A8A]" strokeWidth={1.75} />
                  <h2 className="font-serif text-xl font-semibold text-stone-900">
                    Asarlar xazinasi
                  </h2>
                </div>

                {/* Interactive Category Filter Buttons */}
                <div
                  role="group"
                  aria-label="Asarlarni yo‘nalish bo‘yicha saralash"
                  className="flex flex-wrap items-center gap-1 bg-[#EBE6DF] p-1"
                >
                  {WORK_CATEGORIES.map((category) => {
                    const isActive = selectedWorkCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedWorkCategory(category)}
                        aria-pressed={isActive}
                        className={`px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
                          isActive
                            ? 'bg-[#FBF9F5] text-[#1E3A8A]'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="divide-y divide-stone-300/75 border-b border-stone-300/75">
                {filteredWorks.map((work) => (
                  <div
                    key={work.id}
                    data-testid={`work-item-${work.id}`}
                    className="py-3.5 first:pt-1"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-serif text-lg font-semibold text-stone-900 sm:text-xl">
                        {work.title}
                      </h3>
                      <span className="font-mono text-xs text-stone-500 tabular-nums whitespace-nowrap shrink-0">
                        {work.year}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-stone-500">
                      <span className="text-[#1E3A8A] font-medium">{work.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{work.language}</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone-700">
                      {work.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Variant 6: Legacy & Interactive Verse Explorer */}
        {slide.variant === 'legacy-verses' && (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 flex flex-col gap-5 lg:col-span-6">
              <div>
                <h1 className="font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-stone-900 text-balance sm:text-4xl">
                  {slide.title}
                </h1>
                <p className="mt-1.5 font-serif text-lg italic text-stone-600">
                  {slide.subtitle}
                </p>
              </div>

              <p className="text-[15.5px] leading-[1.7] text-stone-800">
                {slide.leadParagraph}
              </p>
              {slide.bodyParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-[15px] leading-[1.7] text-stone-700">
                  {paragraph}
                </p>
              ))}

              <dl className="grid grid-cols-2 border border-stone-300/80 bg-[#F2EDE4]/60">
                {slide.highlights.map((item, idx) => (
                  <div
                    key={item.label}
                    className={`min-w-0 p-3.5 ${
                      idx % 2 === 1 ? 'border-l border-stone-300/75' : ''
                    } ${idx >= 2 ? 'border-t border-stone-300/75' : ''}`}
                  >
                    <dt className="text-[11px] uppercase tracking-wider text-stone-500">
                      {item.label}
                    </dt>
                    <dd className="mt-0.5 font-serif text-lg font-semibold text-stone-900 tabular-nums">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="min-w-0 flex flex-col gap-5 lg:col-span-6">
              <ArchivalImage
                src={slide.imageSrc}
                alt={slide.imageAlt}
                caption={slide.imageCaption}
                accessionCode={slide.accessionCode}
                aspectClass="aspect-[16/9] lg:max-h-[280px]"
                onInspect={() => onInspectImage(slide)}
              />

              {/* Interactive Couplet & Wisdom Explorer */}
              <div className="border border-stone-300/80 bg-[#F2EDE4]/55 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-300/75 pb-3.5">
                  <h2 className="font-serif text-xl font-semibold text-stone-900">
                    Boqiy baytlar va hikmatlar
                  </h2>
                  <div
                    role="tablist"
                    aria-label="Hikmatli baytni tanlash"
                    className="flex flex-wrap items-center gap-1 bg-[#EBE6DF] p-1"
                  >
                    {POETIC_WISDOM.map((item) => {
                      const active = item.id === activeWisdom.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setSelectedWisdomId(item.id)}
                          className={`px-2.5 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
                            active
                              ? 'bg-[#FBF9F5] text-[#1E3A8A]'
                              : 'text-stone-600 hover:text-stone-900'
                          }`}
                        >
                          {item.theme}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-stone-500">
                    {activeWisdom.source}
                  </p>
                  <p className="mt-2 font-serif text-xl font-medium text-stone-900">
                    {activeWisdom.original}
                  </p>
                  <p className="mt-1.5 font-serif text-lg italic text-[#1E3A8A]">
                    «{activeWisdom.meaning}»
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">
                    {activeWisdom.context}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toggleable Curatorial Speaker Notes Drawer */}
        {showNotes && (
          <aside
            ref={notesRef}
            data-testid="speaker-notes-panel"
            aria-label="Ma’ruzachi qaydlari"
            className="border-t border-stone-300/90 bg-[#F2EDE4] px-6 py-4"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1E3A8A]">
                Ma’ruzachi qaydlari · {slide.folio}
              </h2>
              <p className="font-mono text-[11px] text-stone-500">
                Tezkor tugmalar: ← / → Slayd · G Mundarija · N Qaydlar
              </p>
            </div>
            <p className="mt-2 max-w-4xl text-sm leading-relaxed text-stone-700">
              {slide.speakerNotes}
            </p>
          </aside>
        )}
      </article>
    </main>
  );
}
