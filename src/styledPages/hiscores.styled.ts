import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const HiscoresPageContainer = styled('div')(
  ({ theme }) => css`
    margin-top: 20px;
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: center;

    ${theme.breakpoints.up('tablet')} {
      margin-top: 40px;
    }

    ${theme.breakpoints.up('desktop')} {
      gap: 60px;
      flex-wrap: nowrap;
    }
  `,
)

export const PlayerHiscoreTableContainer = styled('div')(
  ({ theme }) => css`
    margin-top: 20px;

    ${theme.breakpoints.up('mobile')} {
      margin-top: 40px;
    }
  `,
)

export const HiscoresMenuItemList = styled('ul')(
  ({ theme }) => css`
    background-color: var(--gold-bg-color);
    border: 2px solid var(--gold-border-color);
    padding: 10px 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0 auto;
    column-gap: 5px;

    ${theme.breakpoints.up('tablet')} {
      display: block;
      grid-template-columns: unset;
      margin: 0;
      column-gap: 0;
      flex-basis: calc(30% - 30px);
    }

    ${theme.breakpoints.up('desktop')} {
      flex-basis: auto;
    }
  `,
)

export const BackToHiscoresLink = styled(Link)(
  () => css`
    font-family: Source Sans Pro;
    display: block;
    margin-top: 20px;
    font-size: 20px;
    color: purple;
    text-decoration: none;

    :hover {
      color: darkpurple;
      text-decoration: underline;
    }
  `,
)
