import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const StyledForm = styled('form')(
  () => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `,
)

export const Field = styled('div')(
  () => css`
    margin-top: 10px;
    flex-basis: 100%;
    display: grid;
  `,
)

export const SubmitArea = styled('div')(
  () => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  `,
)

export const SubmitButton = styled('button')(
  () => css`
    margin-top: 10px;
    flex-basis: 100%;
  `,
)

export const SubmitMessage = styled('label')<{ color?: string }>(
  ({ color }) => css`
    flex-basis: 100%;
    color: ${color || 'black'};
    text-align: center;
  `,
)
