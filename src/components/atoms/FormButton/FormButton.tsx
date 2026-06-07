import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { css } from '@mui/system'

/** A button that is part of a form usually needs some space above it.
 *
 * DEPRECATED. Use @ui/button and put a gap-5 on the form that contains it.
 * This gives the "space above it" it needs.
 *
 * TODO: Remove later once not used anywhere.
 */
export const FormButton = styled(Button)(
  () => css`
    margin-top: 40px;
  `,
)
