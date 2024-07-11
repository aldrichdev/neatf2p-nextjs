import { Field } from '@atoms/Field'
import { FormButton } from '@atoms/FormButton/FormButton'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const PlayerLookupContainer = styled('div', {
  shouldForwardProp: prop => prop !== 'isNpcHiscores',
})<{ isNpcHiscores?: boolean }>(
  ({ theme, isNpcHiscores }) => css`
    max-width: 200px;
    background-color: ${isNpcHiscores ? 'var(--npc-hiscores-bg-color)' : 'var(--gold-bg-color)'};
    border: 2px solid ${isNpcHiscores ? 'var(--npc-hiscores-border-color)' : 'var(--gold-border-color)'};
    padding: 10px 16px;

    ${theme.breakpoints.between('tablet', 'desktop')} {
      flex-basis: 100%;
    }
  `,
)

export const LookupHeading = styled(Typography, {
  shouldForwardProp: prop => prop !== 'isNpcHiscores',
})<{ isNpcHiscores?: boolean }>(
  ({ isNpcHiscores }) => css`
    font-family: Source Sans Pro;
    font-size: 24px;
    font-weight: 700;
    color: ${isNpcHiscores ? 'var(--npc-hiscores-text-color)' : 'black'};
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

export const LookupSubmitButton = styled(FormButton, {
  shouldForwardProp: prop => prop !== 'isNpcHiscores',
})<{ isNpcHiscores?: boolean }>(
  ({ theme, isNpcHiscores }) => css`
    background-color: ${isNpcHiscores ? 'var(--npc-hiscores-button-bg-color)' : 'var(--faded-blue-bg-color)'};
    margin: 20px 0 12px;

    :hover {
      background-color: ${isNpcHiscores ? 'var(--npc-hiscores-button-bg-hover-color)' : 'darkblue'};
    }

    ${theme.breakpoints.up('tablet')} {
      margin: 40px 0 35px;
    }
  `,
)
