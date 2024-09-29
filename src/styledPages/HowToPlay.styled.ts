import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const CalloutLink = styled(Link)(
  () => css`
    color: var(--faded-blue-bg-color);
  `,
)

export const ThreeColumnLayout = styled('div')(
  ({ theme }) => css`
    font-family: Saros;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-gap: 30px;

    ${theme.breakpoints.up('tablet')} {
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 0;
    }
  `,
)

export const ClientButton = styled(Link)(
  ({ theme }) => css`
    width: 266px;
    font-weight: 700;
    justify-self: center;
    display: flex;
    border: 3px solid transparent;

    &:hover,
    focus {
      border-color: goldenrod;
    }

    ${theme.breakpoints.up('tablet')} {
      width: 206px;
    }

    ${theme.breakpoints.up('desktop')} {
      width: 266px;
    }
  `,
)

export const ClientButtonImage = styled('img')(
  ({ theme }) => css`
    width: 266px;

    ${theme.breakpoints.up('tablet')} {
      width: 206px;
    }

    ${theme.breakpoints.up('desktop')} {
      width: 266px;
    }
  `,
)

export const ClientRemarks = styled('p')(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: block;
      width: 206px;
      justify-self: center;
    }

    ${theme.breakpoints.up('desktop')} {
      width: 266px;
    }
  `,
)

export const RSCPlusInfo = styled('div')(
  ({ theme }) => css`
    margin: 0 auto;
    text-align: left;

    ${theme.breakpoints.up('tablet')} {
      width: 600px;
    }
  `,
)
