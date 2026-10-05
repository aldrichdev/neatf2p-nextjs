import { LucideIcon } from 'lucide-react'

export type HoverableIconButtonProps = {
  /** The icon to render within the button.
   * Needs to be title case so it can be rendered as as JSX element.
   */
  Icon: LucideIcon
  handleClick: () => void
}
