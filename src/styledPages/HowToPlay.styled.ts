import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const CalloutLink = styled(Link)(
  ({ theme }) => css`
    color: ${theme.palette.custom.calloutWarningText};

    &:hover {
      color: #5c2a00;
    }
  `,
)

export const PlayOptionsGrid = styled('div')(
  ({ theme }) => css`
    display: grid;
    grid-template-rows: 1fr 0.5fr;
    grid-gap: 30px;
    align-items: flex-start;

    ${theme.breakpoints.up('tablet')} {
      grid-template-columns: 1fr 1fr;
      grid-gap: 0;
    }
  `,
)

export const ClientButtonAndRemarks = styled('div')(
  () => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  `,
)

export const ClientButton = styled(Link)(
  ({ theme }) => css`
    display: flex;
    width: 266px;
    font-weight: 700;
    justify-content: center;
    align-items: center;
    justify-self: center;
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
    width: 206px;
    justify-self: center;

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
