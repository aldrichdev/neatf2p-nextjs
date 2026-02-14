import { InputBaseComponentProps } from '@mui/material'

/** The default NPC ID to use when loading NPC hiscores.
 * 29 is the ID of the Level 2 Rat NPC.
 */
export const DEFAULT_NPC_ID = 29

/** Input props that can be applied to an MUI `TextField` to force numeric data entry. */
export const NUMERIC_INPUT_PROPS: InputBaseComponentProps = {
  inputMode: 'numeric', // Suggests a numeric keyboard on mobile devices
  pattern: '[0-9]*', // Provides client-side validation pattern
}
