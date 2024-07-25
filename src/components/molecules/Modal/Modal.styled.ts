import { BodyText } from '@atoms/BodyText'
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

export const ModalRoot = styled('div')(
  ({ theme }) => css`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    background-color: white;
    padding: 16px 32px 32px 32px;

    ${theme.breakpoints.up('tablet')} {
      left: 25%;
      right: 25%;
      top: 15%;
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

export const ScrollableContainer = styled('div')(
  () => css`
    position: relative;
    height: 400px;
  `,
)

export const ScrollableBody = styled(BodyText)(
  () => css`
    overflow-y: scroll;
    height: 100%;
  `,
)
