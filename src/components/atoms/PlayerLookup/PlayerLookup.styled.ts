import { Field } from '@atoms/Field'
import { FormButton } from '@atoms/FormButton/FormButton'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const PlayerLookupContainer = styled('div')(
  ({ theme }) => css`
    background-color: ${theme.palette.custom.sidebarBg};
    border: 0.5px solid ${theme.palette.divider};
    border-radius: 8px;
    padding: 14px;

    ${theme.breakpoints.between('tablet', 'desktop')} {
      flex-basis: 100%;
    }
  `,
)

export const LookupHeading = styled(Typography)(
  () => css`
    font-family: Cinzel, serif;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
  `,
)

export const LookupForm = styled('form')(
  () => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `,
)

export const PlayerNameField = styled(Field)(
  ({ theme }) => css`
    margin-top: 10px;
    color: ${theme.palette.primary.main};

    & .MuiOutlinedInput-root:hover {
      outline: none;
    }

    & .MuiOutlinedInput-input {
      background-color: ${theme.palette.background.paper};
    }
  `,
)

export const LookupSubmitButton = styled(FormButton)(
  ({ theme }) => css`
    margin-top: 10px;
    font-size: 18px;
    width: 100%;
    color: ${theme.palette.custom.tableHeaderText};
  `,
)
