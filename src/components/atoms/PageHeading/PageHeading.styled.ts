import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const Heading = styled(Typography, {
  shouldForwardProp: prop => prop !== 'noTopPadding',
})<{ noTopPadding?: boolean }>(
  ({ theme, noTopPadding }) => css`
    margin-bottom: 40px;
    padding-top: ${noTopPadding ? 0 : '20px'};
    text-align: center;

    ${theme.breakpoints.up('tablet')} {
      padding: 0;
    }
  `,
)
