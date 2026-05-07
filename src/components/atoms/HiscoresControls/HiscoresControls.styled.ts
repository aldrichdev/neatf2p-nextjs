import { Pagination } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const HiscoresControlsContainer = styled('div')(
  () => css`
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 30px;
    margin-top: 16px;
  `,
)

export const HiscoresPagination = styled(Pagination)(
  ({ theme }) => css`
    width: calc(100% - 10px);

    & .MuiPaginationItem-text {
      font-family: Inter, sans-serif;
      font-size: 14px;
    }

    & .MuiPaginationItem-root.Mui-selected {
      background-color: ${theme.palette.primary.main};
    }

    & .MuiPaginationItem-root.Mui-selected:hover {
      background-color: ${theme.palette.primary.dark};
    }

    & .MuiPaginationItem-root:not(.Mui-selected) {
      color: black;
    }

    & .MuiPagination-ul {
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
    }
  `,
)
