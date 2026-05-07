import { css } from '@emotion/react'

export const getBaseNavItemStyles = (isActive?: boolean) => css`
  color: ${isActive ? 'var(--color-secondary)' : 'white'};
  font-size: 18px;
  padding: 8px;
`
