import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'
import { InlineLink } from '@atoms/InlineLink'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const AccountArea = styled('div')(
  ({ theme }) => css`
    display: flex;
    color: black;
    align-items: center;
    gap: 10px;
    font-family: Inter, sans-serif;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: white;
    border-radius: 10px;
    padding: 10px;

    ${theme.breakpoints.up('tablet')} {
      top: 20px;
      right: 20px;
    }

    ${theme.breakpoints.up('desktop')} {
      font-size: 20px;
    }
  `,
)

export const Username = styled(InlineLink, {
  shouldForwardProp: prop => prop !== 'useHoverUnderline',
})<{ useHoverUnderline?: boolean }>(
  ({ theme }) => css`
    font-weight: 600;
    color: ${theme.palette.primary.main};
  `,
)

export const AccountAreaLink = styled(HoverUnderlineLink)(
  () => css`
    color: unset;
    font-size: 20px;
  `,
)
