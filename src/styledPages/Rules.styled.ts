import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const RuleListItem = styled('li')(
  () => css`
    text-align: left;
    font-family: Source Sans Pro;
    font-size: 20px;
    padding-bottom: 20px;
    letter-spacing: 0.5px;
    line-height: 28px;
  `,
)
