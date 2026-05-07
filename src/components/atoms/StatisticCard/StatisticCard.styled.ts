import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const StatCard = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    padding: 10px 14px;
    text-align: left;
    border-radius: 8px;
    color: ${theme.palette.custom.tertiaryText};
    background-color: ${theme.palette.custom.sidebarBg};
  `,
)

export const StatCardLabel = styled('div')(
  () => css`
    flex-basis: 100%;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
  `,
)

export const StatCardValue = styled('div', {
  shouldForwardProp: prop => prop !== 'isRank',
})<{ isRank?: boolean }>(
  ({ theme, isRank }) => css`
    flex-basis: 100%;
    font-size: 20px;
    font-weight: 600;
    color: ${isRank ? theme.palette.secondary.main : theme.palette.text.primary};
  `,
)

export const StatCardFootnote = styled('div')(
  () => css`
    flex-basis: 100%;
    font-size: 11px;
    margin-top: 2px;
  `,
)
