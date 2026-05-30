import clsx from 'clsx'

const rankBadgeClass = clsx(
  'w-[22px] h-[22px] text-[14px] font-semibold',
  'rounded-full inline-flex items-center justify-center',
)

export const RankBadge = ({ children }: { children: React.ReactNode }) => (
  <span className={clsx(rankBadgeClass, 'text-text-secondary')}>{children}</span>
)

export const GoldBadge = ({ children }: { children: React.ReactNode }) => (
  <span className={clsx(rankBadgeClass, 'bg-rank-gold-bg text-rank-gold-text')}>{children}</span>
)

export const SilverBadge = ({ children }: { children: React.ReactNode }) => (
  <span className={clsx(rankBadgeClass, 'bg-rank-silver-bg text-rank-silver-text')}>{children}</span>
)

export const BronzeBadge = ({ children }: { children: React.ReactNode }) => (
  <span className={clsx(rankBadgeClass, 'bg-rank-bronze-bg text-rank-bronze-text')}>{children}</span>
)

export const TopBadge = ({ children }: { children: React.ReactNode }) => (
  <span
    className={clsx(
      'hidden',
      'md:bg-secondary-light md:text-secondary-dark md:inline-block',
      'md:rounded-[10px] md:px-2 md:py-0.5 md:text-[11px] md:font-medium',
    )}
  >
    {children}
  </span>
)
