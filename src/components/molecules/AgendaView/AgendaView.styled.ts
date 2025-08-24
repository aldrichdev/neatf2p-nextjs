import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const AgendaViewBody = styled('div')(
  ({ theme }) => css`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    ${theme.breakpoints.up('desktop')} {
      flex-direction: row;
    }
  `,
)
export const EventCard = styled('div')(
  ({ theme }) => css`
    border: 1px solid black;
    font-family: Source Sans Pro;

    ${theme.breakpoints.up('tablet')} {
      width: 400px;
    }
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
