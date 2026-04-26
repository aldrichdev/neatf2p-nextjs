import Skeleton from '@mui/material/Skeleton'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const FilterBarWrapper = styled('div')(
  () => css`
    display: flex;
    gap: 6px;
    margin-bottom: 10px;
  `,
)

export const FilterInputSkeleton = styled(Skeleton)(
  () => css`
    flex: 1;
    border-radius: 6px;
  `,
)

export const ToggleGroup = styled('div')(
  () => css`
    display: flex;
    gap: 3px;
    flex-shrink: 0;
  `,
)

export const ToggleSkeleton = styled(Skeleton)(
  ({ theme }) => css`
    border-radius: 6px;
    width: 36px;

    ${theme.breakpoints.up('tablet')} {
      width: 52px;
    }
  `,
)
