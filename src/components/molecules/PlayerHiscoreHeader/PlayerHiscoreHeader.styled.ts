import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const LastLoginLabel = styled('span')(
  ({ theme }) => css`
    color: ${theme.palette.custom.tertiaryText};
    font-size: 14px;
  `,
)

export const LastLoginDate = styled('strong')(
  ({ theme }) => css`
    color: ${theme.palette.text.secondary};
    font-size: 14px;
  `,
)

export const PlayerStatsContainer = styled('div')(
  () => css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 16px 0;
  `,
)
