import { css, styled } from '@mui/material/styles'

export const FeatureList = styled('ul')(
  () => css`
    font-family: Saros;
    font-size: 20px;
    background-color: var(--gold-bg-color);
    border: 2px dashed var(--gold-border-color);
    padding: 16px 16px 16px 56px; /* Right: 40px for bullet points + 16px */
    margin: 20px 0;
    list-style-type: disc;
  `,
)

export const Feature = styled('li')(
  () => css`
    text-align: left;
  `,
)
