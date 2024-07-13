import { css } from '@emotion/react'

export const getBaseNavItemStyles = (isActive?: boolean) => css`
  color: white;
  border-bottom: ${isActive ? '2px solid green' : 'none'};
  padding: 8px;
`
