import { css, styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

export const Paragraph = styled(Typography)`
  margin-top: 20px;
`
export const FeatureList = styled('ul')(
  () => css`
    font-family: Saros;
    font-size: 20px;
    background-color: var(--gold-bg-color);
    border: 2px dashed var(--gold-border-color);
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 56px; /* 40px for bullet + 8px */
    padding-right: 16px;
  `,
)

export const Feature = styled('li')(
  () => css`
    text-align: left;
  `,
)
