import { Field } from '@atoms/Field'
import { FormButton } from '@atoms/FormButton/FormButton'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const PlayerLookupContainer = styled('div')(
  ({ theme }) => css`
    max-width: 200px;
    background-color: rgba(218, 165, 32, 0.8);
    border: 2px solid rgb(160, 82, 45);
    padding: 10px 16px;

    ${theme.breakpoints.between('tablet', 'desktop')} {
      flex-basis: 100%;
    }
  `,
)

export const LookupHeading = styled(Typography)(
  () => css`
    font-family: Source Sans Pro;
    font-size: 24px;
    font-weight: 700;
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
    font-family: Source Sans Pro;
    margin-top: 23px;

    ${theme.breakpoints.up('tablet')} {
      margin-top: 43px;
    }
  `,
)

export const LookupSubmitButton = styled(FormButton)(
  ({ theme }) => css`
    background-color: #2055da;
    margin-top: 20px;

    :hover {
      background-color: darkblue;
    }

    ${theme.breakpoints.up('tablet')} {
      margin-top: 40px;
    }
  `,
)
