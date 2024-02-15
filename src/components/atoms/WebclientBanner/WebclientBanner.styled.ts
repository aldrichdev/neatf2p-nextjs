import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const BannerLink = styled(Link, {
  shouldForwardProp: prop => prop !== 'bannerPlacement',
})<{ bannerPlacement?: 'top' | 'bottom' }>(
  ({ bannerPlacement }) => css`
    display: block;
    ${bannerPlacement === 'top' && `margin-bottom: 40px;`}
    ${bannerPlacement === 'bottom' && `margin-top: 40px;`}
  `,
)

export const BannerImage = styled('img')(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: inline;
      width: 513px;
    }
  `,
)
