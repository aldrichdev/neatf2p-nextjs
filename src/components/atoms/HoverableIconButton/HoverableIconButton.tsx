import { HoverableIconButtonProps } from './HoverableIconButton.types'
import clsx from 'clsx'

/** A basic button (non-ShadCN) that wraps a Lucide icon and provides a circular hover effect. */
const HoverableIconButton = (props: HoverableIconButtonProps) => {
  const { Icon, handleClick } = props

  return (
    <button
      onClick={handleClick}
      className={clsx(
        'cursor-pointer rounded-full border-none bg-transparent p-0 transition-colors',
        'hover:bg-foreground/10 md:p-2',
      )}
    >
      <Icon />
    </button>
  )
}

export default HoverableIconButton
