import { ExtendedTableContainerProps } from '@globalTypes/MUI/ExtendedTableContainerProps'
import { Pagination, Table, TableCell, TableContainer, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop'
import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'

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
  shouldForwardProp: prop => !['aria-label'].includes(prop.toString()),
})(
  () => css`
    font-family: Verdana;
    background-color: var(--gold-bg-color);
    border: 2px solid var(--gold-border-color);
  `,
)

export const HiscoresTableRow = styled(TableRow)(
  ({ theme }) => css`
    border-bottom: 1px solid black;
    font-size: 14px;

    ${theme.breakpoints.up('tablet')} {
      font-size: 16px;
    }
  `,
)

export const HiscoreTableCell = styled(TableCell)(
  ({ theme }) => css`
    font-weight: 400;
    padding: 8px;
    border: 0;

    &:not(:last-child) {
      border-right: 1px solid black;
    }

    ${theme.breakpoints.up('tablet')} {
      padding: 16px;
    }
  `,
)

export const HiscoreUsername = styled(HoverUnderlineLink)(
  () => css`
    color: black;

    :hover {
      cursor: pointer;
    }
  `,
)

export const HiscoresControls = styled('div')(
  () => css`
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 30px;
    margin-top: 40px;
  `,
)

export const HiscoresPagination = styled(Pagination)(
  () => css`
    & .MuiPaginationItem-text {
      font-family: Verdana;
      font-size: 14px;
    }

    & .MuiPaginationItem-root.Mui-selected {
      background-color: var(--faded-blue-bg-color);
    }

    & .MuiPaginationItem-root:not(.Mui-selected) {
      color: black;
    }
  `,
)

export const ScrollToTopButton = styled(VerticalAlignTopIcon)(
  () => css`
    cursor: pointer;
    width: 24px;
    height: 24px;

    &:hover {
      color: var(--faded-blue-bg-color);
    }
  `,
)
