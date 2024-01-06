import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const ModalOverlay = styled('div')(
  () => css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1;
  `,
)

export const ModalRoot = styled('div', {
  shouldForwardProp: prop => prop !== 'open',
})<{ open: boolean }>(
  ({ theme, open }) => css`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    background-color: white;
    padding: 16px 32px 32px 32px;

    ${
      /** TODO: Do we still need this? Is it doing anything? seems to do nothing on mac? */
      open &&
      `
      overflow-y: hidden;
      max-height: 100vh;
      `
    }

    ${theme.breakpoints.up('tablet')} {
      left: 25%;
      right: 25%;
      top: 25%;
    }
  `,
)

export const CloseBar = styled('div')(
  () => css`
    display: flex;
    justify-content: flex-end;
  `,
)

export const CloseButton = styled('button')(
  () => css`
    cursor: pointer;
  `,
)

export const CloseIcon = styled('img')(
  () => css`
    width: 32px;
  `,
)

export const ModalHeader = styled(Typography)(
  ({ theme }) => css`
    ${theme.breakpoints.down('tablet')} {
      font-size: 32px;
    }
  `,
)
