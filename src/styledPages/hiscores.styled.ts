import { HiscoreTableValueCell } from '@molecules/HiscoresTable/HiscoresTable.styled'
import { Badge, Typography } from '@mui/material'
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
      height: 1000px;
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

    ${theme.breakpoints.up('tablet')} {
      font-size: 28px;
      line-height: 36px;
      margin-bottom: 12px;
    }
  `,
)

export const HiscoreTabsContainer = styled('div')(
  () => css`
    margin-bottom: 16px;
  `,
)

export const LevelProgressBar = styled('div')(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: block;
      flex: 1;
      height: 4px;
      background-color: ${theme.palette.custom.levelProgressBg};
      border-radius: 2px;
      overflow: hidden;
      max-width: 80px;
    }
  `,
)

export const LevelProgressBarFill = styled('div', {
  shouldForwardProp: prop => prop !== 'completed',
})<{ completed?: number }>(
  ({ theme, completed }) => css`
    background-color: ${theme.palette.primary.main};
    height: 100%;
    border-radius: 2px;
    width: ${completed ? completed * 100 : 0}%;
  `,
)

/** TODO: Tear down */
export const ClickableHiscoreTableRow = styled(Link)(
  () => css`
    text-decoration: none;
  `,
)

export const DesktopHiscoreTableCell = styled(HiscoreTableValueCell)(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: table-cell;
    }
  `,
)

export const MobileHiscoreTableCell = styled(HiscoreTableValueCell)(
  ({ theme }) => css`
    ${theme.breakpoints.up('tablet')} {
      display: none;
    }
  `,
)

export const RankBadge = styled(Badge)(
  ({ theme }) => css`
    width: 22px;
    height: 22px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${theme.palette.text.secondary};
  `,
)

export const GoldBadge = styled(RankBadge)(
  ({ theme }) => css`
    background-color: ${theme.palette.custom.rankGold.bg};
    color: ${theme.palette.custom.rankGold.text};
  `,
)

export const SilverBadge = styled(RankBadge)(
  ({ theme }) => css`
    background-color: ${theme.palette.custom.rankSilver.bg};
    color: ${theme.palette.custom.rankSilver.text};
  `,
)

export const BronzeBadge = styled(RankBadge)(
  ({ theme }) => css`
    background-color: ${theme.palette.custom.rankBronze.bg};
    color: ${theme.palette.custom.rankBronze.text};
  `,
)

/** TODO: Tear down */
export const NormalRankBadge = styled(RankBadge)(
  () => css`
    background-color: lightgray;
    color: gray;
  `,
)

export const TopBadge = styled(Badge)(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: block;
      background-color: ${theme.palette.secondary.light};
      color: ${theme.palette.secondary.dark};
      font-size: 11px;
      font-weight: 500;
      padding: 2px 8px;
      border-radius: 10px;
    }
  `,
)

export const HiscoresColumnTwo = styled('div')(
  () => css`
    width: 100%;
  `,
)
