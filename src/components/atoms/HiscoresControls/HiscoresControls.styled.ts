import { Pagination } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop'

export const HiscoresControlsContainer = styled('div')(
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
