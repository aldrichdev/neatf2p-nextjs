import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const NoRank = styled('span')(
  ({ theme }) => css`
    color: ${theme.palette.custom.tertiaryText};
  `,
)

export const RankOne = styled('span')(
  () => css`
    font-size: 16px;
  `,
)

export const StyledRank = styled('span', {
  shouldForwardProp: prop => prop !== 'rank',
})<{ rank?: number }>(
  ({ theme, rank }) => css`
    color: ${rank === 1 ? theme.palette.custom.rankGold.text : theme.palette.secondary.main};
    font-weight: 600;
    font-size: 14px;

    ${theme.breakpoints.up('tablet')} {
      font-size: 16px;
    }
  `,
)

export const RankOneIconContainer = styled('span')(
  () => css`
    min-height: 24px;
    display: flex;
    align-items: center;
  `,
)

export const RankOneIcon = styled('img')(
  () => css`
    width: 20px;
    height: 24px;
  `,
)
