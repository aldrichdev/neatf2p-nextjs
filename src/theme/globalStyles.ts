import { css } from '@emotion/react'

export const getBaseNavItemStyles = (isActive?: boolean) => css`
  color: white;
  border-bottom: ${isActive ? '2px solid green' : '2px solid transparent'};
  padding: 8px;
`
