import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const EventCalendarContainer = styled('div')(
  () => css`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
  `,
)

export const DesktopEventView = styled('div')(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: block;
      width: 100%;
      margin-bottom: 60px;
    }
  `,
)
