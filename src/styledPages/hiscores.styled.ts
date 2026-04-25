import { PageHeading } from '@atoms/PageHeading'
import { PageTabs } from '@atoms/PageTabs'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const HiscoresPageContainer = styled('div')(
  ({ theme }) => css`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: space-between;

    ${theme.breakpoints.up('tablet')} {
      display: grid;
      grid-template-columns: 160px 1fr 200px;
      margin-top: 16px;
    }

    ${theme.breakpoints.up('desktop')} {
      flex-wrap: nowrap;
    }
  `,
)

export const HiscoresPageHeading = styled(Typography)(
  ({ theme }) => css`
    text-align: left;
    font-size: 22px;
    line-height: 28px;
    font-weight: 700;

    color: ${theme.palette.text.primary};
    margin-bottom: 12px;

    ${theme.breakpoints.up('tablet')} {
      font-size: 28px;
      line-height: 36px;
    }
  `,
)

export const PlayerHiscoreTabsContainer = styled('div')(
  () => css`
    margin-bottom: 16px;
  `,
)

export const LastLoginLabel = styled('span')(
  ({ theme }) => css`
    color: ${theme.palette.text.disabled};
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

export const LevelProgressBar = styled('div')(
  ({ theme }) => css`
    flex: 1;
    height: 4px;
    background-color: ${theme.palette.custom.levelProgressBg};
    border-radius: 2px;
    overflow: hidden;
    max-width: 80px;
  `,
)

export const LevelProgressBarFill = styled('div', {
  shouldForwardProp: prop => prop !== 'completed',
})<{ completed?: number }>(
  ({ theme, completed }) => css`
    background-color: ${theme.palette.primary.main};
    height: 100%;
    border-radius: 2px;
    width: ${!!completed ? completed * 100 : 0}%;
  `,
)

export const ClickableHiscoreTableRow = styled(Link)(
  ({ theme }) => css`
    text-decoration: none;
  `,
)
