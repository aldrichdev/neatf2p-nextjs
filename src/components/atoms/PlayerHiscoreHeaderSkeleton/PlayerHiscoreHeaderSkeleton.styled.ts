import Skeleton from '@mui/material/Skeleton'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const PlayerName = styled(Skeleton)(
  () => css`
    margin: 0 auto 4px;
  `,
)

export const LastLogin = styled(Skeleton)(
  () => css`
    margin: 0 auto 16px;
  `,
)

export const SummaryGrid = styled('div')(
  () => css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 16px;
  `,
)

export const StatTile = styled('div')(
  ({ theme }) => css`
    background: ${theme.palette.custom.sidebarBg};
    border-radius: 8px;
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,
)
