import { css, styled } from '@mui/material/styles'

export const FeatureList = styled('ul')(
  ({ theme }) => css`
    list-style: none;
    background-color: ${theme.palette.custom.sidebarBg};
    border-left: 4px solid ${theme.palette.primary.main};
    font-size: 18px;
    line-height: 1.5;
    padding: 16px 20px;
    margin: 20px 0;
    border-radius: 0 8px 8px 0;
  `,
)

export const Feature = styled('li')(
  ({ theme }) => css`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: ${theme.palette.primary.dark};
    text-align: left;

    &::before {
      content: '✓';
      color: ${theme.palette.primary.main};
      font-weight: 700;
      flex-shrink: 0;
      margin-top: 1px;
    }
  `,
)
