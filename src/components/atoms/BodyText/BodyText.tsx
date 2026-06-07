import clsx from 'clsx'

type TextAlign = 'left' | 'center' | 'right'

type BodyTextProps = {
  children: React.ReactNode
  /** DEPRECATED. Don't use `topMargin`, use e.g. mt-0, mt-5 TW class. (TODO: Remove once nothing is using it.) */
  topMargin?: number
  /** Alignment of text on desktop and tablet.
   *
   * Note: Was not able to use `textAlign` or `textAlignment` as the name because it conflicted
   * with something on MUI's side.
   */
  bodyTextAlign?: TextAlign
  /** Alignment of text on mobile. */
  mobileTextAlign?: TextAlign
  className?: string
}

const textAlignClass: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const mdTextAlignClass: Record<TextAlign, string> = {
  left: 'md:text-left',
  center: 'md:text-center',
  right: 'md:text-right',
}

export const BodyText = ({ children, bodyTextAlign = 'left', mobileTextAlign = 'left', className }: BodyTextProps) => (
  <p className={clsx('block', textAlignClass[mobileTextAlign], mdTextAlignClass[bodyTextAlign], className)}>
    {children}
  </p>
)
