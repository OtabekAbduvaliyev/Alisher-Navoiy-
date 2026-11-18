import { useState } from 'react';
import { BookOpen, Maximize2 } from 'lucide-react';

interface ArchivalImageProps {
  src: string;
  alt: string;
  caption: string;
  accessionCode: string;
  aspectClass?: string;
  className?: string;
  onInspect?: () => void;
}

export function ArchivalImage({
  src,
  alt,
  caption,
  accessionCode,
  aspectClass = 'aspect-[4/3]',
  className = '',
  onInspect,
}: ArchivalImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`flex flex-col ${className}`}>
      <div
        className={`relative overflow-hidden bg-[#EBE6DF] border border-stone-300/80 ${aspectClass} group`}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#EBE6DF] to-[#DFD7C8] p-6 text-center">
            <BookOpen className="mb-3 h-8 w-8 text-[#1E3A8A]/70" strokeWidth={1.5} />
            <p className="font-serif text-lg font-medium text-stone-800">{caption}</p>
            <p className="mt-1 font-mono text-xs text-stone-500 tabular-nums">{accessionCode}</p>
          </div>
        )}

        {onInspect && !hasError && (
          <button
            type="button"
            onClick={onInspect}
            aria-label={`Lavhani kattalashtirish ${accessionCode}`}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-[#FBF9F5]/95 px-3 py-1.5 text-xs font-medium text-stone-900 border border-stone-300/90 transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            <Maximize2 className="h-3.5 w-3.5 text-[#1E3A8A]" strokeWidth={1.75} />
            <span className="whitespace-nowrap shrink-0">Kattalashtirish</span>
          </button>
        )}
      </div>

      <figcaption className="mt-2.5 flex items-baseline justify-between gap-4 text-xs text-stone-600">
        <span className="font-serif italic leading-snug">{caption}</span>
        <span className="font-mono text-[11px] text-stone-500 tabular-nums whitespace-nowrap shrink-0">
          {accessionCode}
        </span>
      </figcaption>
    </figure>
  );
}
