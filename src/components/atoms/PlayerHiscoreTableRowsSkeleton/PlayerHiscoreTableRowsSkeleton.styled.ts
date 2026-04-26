import Skeleton from '@mui/material/Skeleton'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const Tr = styled('tr')(
  () => css`
    display: flex;
    flex-wrap: nowrap;
  `,
)

export const Td = styled('td')(
  ({ theme }) => css`
    display: block;
    padding: 8px;

    ${theme.breakpoints.up('tablet')} {
      padding: 16px;
    }
  `,
)

export const SkillSkeleton = styled(Skeleton)(
  ({ theme }) => css`
    width: 84.5px;

    ${theme.breakpoints.up('tablet')} {
      width: 208px;
    }
  `,
)

export const RankSkeleton = styled(Skeleton)(
  ({ theme }) => css`
    width: 51px;

    ${theme.breakpoints.up('tablet')} {
      width: 128px;
    }
  `,
)

export const LevelSkeleton = styled(Skeleton)(
  ({ theme }) => css`
    width: 51px;

    ${theme.breakpoints.up('tablet')} {
      width: 128px;
    }
  `,
)

export const ExpSkeleton = styled(Skeleton)(
  ({ theme }) => css`
    width: 84.5px;

    ${theme.breakpoints.up('tablet')} {
      width: 208px;
    }
  `,
)
