import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const CalloutContainer = styled('blockquote')<{ variant: string }>(
  ({ variant }) => css`
    margin: 20px 0 0;
    max-width: 100%;
    background-color: ${variant === 'warning' ? 'rgba(236, 148, 44, 0.5)' : 'rgba(32, 85, 218, 0.5)'};
    border-left: 5px solid ${variant === 'warning' ? 'rgb(160, 82, 45)' : '#2055da'};
  `,
)

export const CalloutContent = styled('div')(
  () => css`
    padding: 16px;
    text-align: left;
    font-family: Source Sans Pro;
    font-size: 20px;
    line-height: 28px;
  `,
)
