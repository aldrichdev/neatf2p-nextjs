import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const NoRank = styled('span')(
  ({ theme }) => css`
    color: ${theme.palette.text.disabled};
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

    ${rank === 1 &&
    `
        font-family: Impact;
        font-style: italic;
        font-weight: 700;
        text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.2);
        transition: color 0.2s ease;
      `}

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
