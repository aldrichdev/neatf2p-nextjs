import { cn } from '@utils/cn'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'border-input placeholder:text-muted-foreground',
        'focus-visible:border-primary-main focus-visible:ring-primary-main focus-visible:ring-3',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-3',
        'dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        'flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-2.5 py-2',
        'text-base shadow-xs transition-[color,box-shadow] outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
