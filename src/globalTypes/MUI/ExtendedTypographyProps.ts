import { TypographyProps } from '@mui/system'

/** This is needed if you ever style an MUI `Typography` using styled components
 * and are passing the `component` prop to it. The`component` needs to be optional
 * because we don't want to pass that to every `BodyText`, but we do need the ability
 * for _some_ `BodyText` renders to use a different HTML element, so we can't use
 * `TypographyProps` instead.
 */
export type ExtendedTypographyProps = TypographyProps & {
  component?: string
}
