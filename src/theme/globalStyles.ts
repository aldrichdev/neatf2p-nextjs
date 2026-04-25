import { css } from '@emotion/react'

export const getBaseNavItemStyles = (isActive?: boolean) => css`
  color: white;
  border-bottom: ${isActive ? '2px solid var(--color-primary)' : 'none'};
  padding: 8px;
`
