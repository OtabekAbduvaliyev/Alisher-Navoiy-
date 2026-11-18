import type { NavGroup } from '../utils/presentation';

interface TopBarProps {
  activeGroup: NavGroup;
  onSelectGroup: (group: NavGroup) => void;
  onOpenIndex: () => void;
}

const NAV_ITEMS: { id: NavGroup; label: string }[] = [
  { id: 'prologue', label: 'Muqaddima' },
  { id: 'chronicle', label: 'Hayot yo‘li' },
  { id: 'khamsa', label: 'Xamsa' },
  { id: 'legacy', label: 'Meros' },
];

export function TopBar({ activeGroup, onSelectGroup, onOpenIndex }: TopBarProps) {
  return (
    <header className="border-b border-stone-300/75 bg-[#FBF9F5]">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-8 px-5 py-4 sm:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => onSelectGroup('prologue')}
          className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-stone-900 whitespace-nowrap shrink-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
        >
          Alisher Navoiy
        </button>

        {/* Zone 2: 4 single-line typographic nav links */}
        <nav
          aria-label="Ko‘rgazma bo‘limlari"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeGroup === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectGroup(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A] ${
                  isActive
                    ? 'text-[#1E3A8A] font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#1E3A8A]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenIndex}
            className="min-h-[40px] px-4 py-2 text-xs font-medium tracking-wide bg-[#1E3A8A] text-[#FBF9F5] hover:bg-[#172E6E] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            Slaydlar ro‘yxati
          </button>
        </div>
      </div>
    </header>
  );
}
