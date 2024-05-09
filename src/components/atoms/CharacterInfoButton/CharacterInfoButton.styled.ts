import { IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const InfoButton = styled(IconButton)(
  ({ theme }) => css`
    padding: 0;

    &:hover,
    &.Mui-focusVisible {
      background-color: rgba(32, 85, 218, 0.2);
    }

    & .MuiSvgIcon-root {
      fill: var(--faded-blue-bg-color);
    }

    ${theme.breakpoints.up('tablet')} {
      padding: 8px;
    }
  `,
)
