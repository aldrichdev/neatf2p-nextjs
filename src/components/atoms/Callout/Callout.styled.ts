import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const CalloutContainer = styled('blockquote')<{ variant: string }>(
  ({ theme, variant }) => css`
    margin: 20px 0 0;
    border-radius: 0px 8px 8px 0px;
    max-width: 100%;
    background-color: ${variant === 'warning' ? theme.palette.custom.calloutWarningBg : 'rgba(32, 85, 218, 0.5)'};
    border-left: 5px solid ${variant === 'warning' ? theme.palette.custom.calloutWarningBorder : '#2055da'};
  `,
)

export const CalloutContent = styled('div')(
  () => css`
    padding: 16px;
    text-align: left;
    font-size: 18px;
    line-height: 1.5;
  `,
)
