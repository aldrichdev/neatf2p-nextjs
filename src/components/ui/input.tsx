import { cn } from '@utils/cn'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'border-input file:text-foreground placeholder:text-muted-foreground',
        'focus-visible:border-primary-main focus-visible:ring-primary-main focus-visible:ring-3',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-3',
        'dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        'h-10 w-full min-w-0 rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs',
        'transition-[color,box-shadow] outline-none',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'md:text-base',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
