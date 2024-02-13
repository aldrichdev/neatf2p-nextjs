import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const PlayButtonsContainer = styled('div')(
  () => css`
    font-family: Saros;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: space-between;
  `,
)

export const WinRuneButton = styled(Button)(
  () => css`
    background-color: var(--faded-blue-bg-color);
    flex-basis: 100%;
    font-weight: 700;
    height: 50px;
    width: 220px;

    &:hover {
      background-color: darkblue;
    }
  `,
)

export const RSCPlusContainer = styled('div')(
  () => css`
    flex-basis: 100%;
    display: flex;
    flex-wrap: wrap;
  `,
)

export const RSCPlusButton = styled(Button)(
  () => css`
    background-color: crimson;
    font-weight: 700;
    flex-basis: 100%;
    height: 50px;

    &:hover {
      background-color: darkred;
    }
  `,
)

export const RSCPlusInfo = styled('div')(
  () => css`
    flex-basis: 100%;
    text-align: left;
  `,
)
