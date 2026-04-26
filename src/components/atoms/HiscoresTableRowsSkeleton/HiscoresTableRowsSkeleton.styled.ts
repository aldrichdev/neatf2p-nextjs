import { Skeleton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const Table = styled('table')(
  () => css`
    width: 100%;
    border-collapse: collapse;
  `,
)

export const Th = styled('th')(
  () => css`
    padding: 9px 14px;
    text-align: left;
  `,
)

export const Cell = styled('td')<{ width?: string }>(
  ({ width }) => css`
    padding: 9px 14px;
    width: ${width ?? 'auto'};
  `,
)

export const ExpCell = styled(Cell)(
  ({ theme }) => css`
    width: 60px;

    ${theme.breakpoints.up('tablet')} {
      width: 120px;
    }
  `,
)

export const MobileExpSkeleton = styled(Skeleton)(
  ({ theme }) => css`
    display: block;

    ${theme.breakpoints.up('tablet')} {
      display: none;
    }
  `,
)

export const DesktopExpSkeleton = styled(Skeleton)(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: block;
    }
  `,
)
