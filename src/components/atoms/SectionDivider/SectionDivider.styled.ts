import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const SectionDividerContainer = styled('div')(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 0;
    margin: 10px 0 8px;
    font-size: 12px;
    color: ${theme.palette.custom.tertiaryText};
    white-space: nowrap;

    ${theme.breakpoints.up('tablet')} {
      gap: 8px;
      padding: 6px 0;
    }
  `,
)

export const SectionLeftText = styled('span')(
  () => css`
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  `,
)

export const SectionLine = styled('div')(
  ({ theme }) => css`
    flex: 1;
    height: 0.5px;
    background-color: ${theme.palette.divider};
  `,
)
