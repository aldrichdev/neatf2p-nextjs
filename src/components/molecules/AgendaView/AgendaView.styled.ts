import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const AgendaViewBody = styled('div')(
  ({ theme }) => css`
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    ${theme.breakpoints.up('tablet')} {
      grid-template-columns: repeat(2, 1fr);
    }

    ${theme.breakpoints.up('desktop')} {
      grid-template-columns: repeat(3, 1fr);
    }
  `,
)
export const EventCard = styled('div')(
  () => css`
    border: 1px solid black;
    font-family: Source Sans Pro;
    width: 100%;
  `,
)

export const EventCardTitle = styled('p')(
  () => css`
    border-bottom: 1px solid black;
    margin: 0;
  `,
)

export const EventCardBody = styled('div')(
  () => css`
    padding: 8px;
    text-align: left;
  `,
)

export const EventCardBodyLine = styled('p')(
  () => css`
    margin: 12px 0;
  `,
)
