import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const MobileAgendaViewContainer = styled('div')(
  ({ theme }) => css`
    ${theme.breakpoints.up('tablet')} {
      display: none;
    }
  `,
)

export const MobileAgendaViewBody = styled('div')(
  () => css`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
)
export const MobileEventCard = styled('div')(
  () => css`
    border: 1px solid black;
    font-family: Source Sans Pro;
  `,
)

export const MobileEventCardTitle = styled('p')(
  () => css`
    border-bottom: 1px solid black;
    margin: 0;
  `,
)

export const MobileEventCardBody = styled('div')(
  () => css`
    padding: 8px;
    text-align: left;
  `,
)

export const MobileEventCardBodyLine = styled('p')(
  () => css`
    margin: 12px 0;
  `,
)
