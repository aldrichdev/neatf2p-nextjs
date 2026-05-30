import clsx from 'clsx'

type TextAlign = 'left' | 'center' | 'right'

type BodyTextProps = {
  children: React.ReactNode
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

export const BodyText = ({
  children,
  topMargin,
  bodyTextAlign = 'left',
  mobileTextAlign = 'center',
  className,
}: BodyTextProps) => (
  <p
    style={{ marginTop: topMargin !== undefined ? `${topMargin}px` : '20px' }}
    className={clsx('block', textAlignClass[mobileTextAlign], `md:${textAlignClass[bodyTextAlign]}`, className)}
  >
    {children}
  </p>
)
