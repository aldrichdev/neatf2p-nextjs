import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const WebclientContent = styled('div')(
  () => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  `,
)

export const GoBackLink = styled(HoverUnderlineLink)(
  () => css`
    font-family: Source Sans Pro;
    color: white;
    font-size: 18px;
    font-weight: 600;
    padding: 10px 0;
  `,
)
