import { ExtendedTableContainerProps } from '@globalTypes/MUI/ExtendedTableContainerProps'
import { Badge, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const RootContainer = styled('div')(
  () => css`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `,
)

export const HiscoreTableContainer = styled(TableContainer)<ExtendedTableContainerProps>(
  ({ theme }) => css`
    box-shadow: none;

    ${theme.breakpoints.up('tablet')} {
      flex-basis: 100%;
    }

    ${theme.breakpoints.up('desktop')} {
      min-height: 1000px;
      width: 100%;
    }
  `,
)

export const HiscoreTable = styled(Table, {
  shouldForwardProp: prop => prop !== 'aria-label',
})(
  ({ theme }) => css`
    font-family: Inter, sans-serif;
    background-color: ${theme.palette.background.paper};
    border-radius: 8px;
  `,
)

export const HiscoresTableHead = styled(TableHead)(
  ({ theme }) => css`
    background-color: ${theme.palette.primary.main};
    border-radius: 8px 8px 0 0;
    color: ${theme.palette.custom.tableHeaderText};
    height: fit-content;

    tr {
      border-bottom: none;
    }
  `,
)

export const HiscoresTableRow = styled(TableRow)(
  ({ theme }) => css`
    border-bottom: 0.5px solid ${theme.palette.divider};
    font-size: 14px;
    border-radius: 8px 8px 0 0;

    ${theme.breakpoints.up('tablet')} {
      font-size: 16px;
    }
  `,
)

export const HiscoreTableCell = styled(TableCell)(
  () => css`
    font-weight: 500;
    font-size: 14px;
    padding: 9px 14px;
    border: 0;
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

export const NormalRankBadge = styled(RankBadge)(
  () => css`
    background-color: lightgray;
    color: gray;
  `,
)

export const TopBadge = styled(Badge)(
  ({ theme }) => css`
    background-color: ${theme.palette.secondary.light};
    color: ${theme.palette.secondary.dark};
    font-size: 11px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 10px;
  `,
)

export const HiscoreTableHeaderCell = styled(HiscoreTableCell)(
  ({ theme }) => css`
    color: ${theme.palette.custom.tableHeaderText};
    font-weight: 700;
    text-transform: uppercase;
  `,
)
