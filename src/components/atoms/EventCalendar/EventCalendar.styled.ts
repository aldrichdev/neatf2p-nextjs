import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import { Calendar } from 'react-big-calendar'

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
    }
  `,
)

const StyledEventCalendar = styled(Calendar)(
  () => css`
    &.rbc-calendar {
      font-family: Source Sans Pro;

      .rbc-toolbar {
        .rbc-btn-group > button {
          font-family: Source Sans Pro;
          font-size: 16px;
        }

        .rbc-toolbar-label {
          font-size: 20px;
        }
      }

      .rbc-month-view > .rbc-month-row > .rbc-row-content > .rbc-row {
        .rbc-date-cell > button {
          font-family: Source Sans Pro;
          font-size: 16px;
        }

        .rbc-row-segment > .rbc-event {
          background-color: darkgreen;
        }
      }

      .rbc-time-view {
        .rbc-time-header > .rbc-time-header-content > .rbc-row > .rbc-header > button {
          font-family: Source Sans Pro;
          font-size: 16px;
        }

        .rbc-time-content > .rbc-day-slot > .rbc-events-container > .rbc-event {
          background-color: green;
          border: 1px solid darkgreen;

          &:focus {
            outline: 5px auto #004526;
          }
        }
      }

      .rbc-today {
        background-color: rgba(0, 128, 0, 0.1);
      }
    }
  `,
)

export const DesktopEventCalendar = styled(StyledEventCalendar)(
  ({ theme }) => css`
    width: 100%;
    margin-top: 40px;

    &.rbc-calendar {
      display: none;
    }

    ${theme.breakpoints.up('tablet')} {
      &.rbc-calendar {
        display: block;
      }
    }
  `,
)

export const MobileEventCalendar = styled(StyledEventCalendar)(
  ({ theme }) => css`
    ${theme.breakpoints.up('tablet')} {
      &.rbc-calendar {
        display: none;
      }
    }
  `,
)
