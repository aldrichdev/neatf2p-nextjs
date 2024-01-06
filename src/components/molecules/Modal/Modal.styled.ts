import { css } from '@emotion/react'
import styled from '@emotion/styled'

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
  ({ open }) => css`
    position: absolute;
    left: 25%;
    right: 25%;
    top: 25%;
    background-color: white;
    padding: 16px 32px 32px 32px;

    ${open &&
    `
      overflow-y: hidden;
      max-height: 100vh;
      `}
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
