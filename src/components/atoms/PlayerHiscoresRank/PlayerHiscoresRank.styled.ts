import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

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
