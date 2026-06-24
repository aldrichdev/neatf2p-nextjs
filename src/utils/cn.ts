import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merges Tailwind classes, favoring later inputs over former ones.
 * Use this instead of `clsx` when you want to override an input you
 * passed earlier on.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
