import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const Field = styled(TextField, {
  shouldForwardProp: prop => !['labelColor', 'borderColor'].includes(prop.toString()),
})<{ labelColor?: string; borderColor?: string }>(
  ({ labelColor, borderColor }) => css`
    flex-basis: 100%;
    margin-top: 20px;

    label {
      color: ${labelColor || 'rgba(0, 0, 0, 0.6)'};
    }

    fieldset {
      border-color: ${borderColor || 'rgba(0, 0, 0, 0.23)'};
    }
  `,
)
