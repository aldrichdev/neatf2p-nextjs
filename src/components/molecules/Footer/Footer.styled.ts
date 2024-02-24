import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'
import { Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const FooterElement = styled('footer')(
  ({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #0f0f0f;
    color: #fffafa;
    padding: 40px 80px;
    overflow: hidden;

    @keyframes PopUp {
      0 {
        top: 400px;
      }
      25% {
        top: 100px;
      }
      50% {
        top: 100px;
      }
      75% {
        top: 100px;
      }
      100% {
        top: 400px;
      }
    }

    ${theme.breakpoints.up('tablet')} {
      flex-direction: row;
    }
  `,
)

export const Logo = styled('img')(
  () => css`
    width: 180px;
    height: 144px;
  `,
)

export const VerticalDivider = styled(Divider)(
  ({ theme }) => css`
    background-color: #fffafa;
    margin: 40px 0 20px;
    transform: rotate(180deg);
    height: 1px;
    width: 100%;

    ${theme.breakpoints.up('tablet')} {
      transform: none;
      width: auto;
      height: auto;
      margin: 0 80px;
    }
  `,
)

export const FooterNavigation = styled('ul')(
  () => css`
    list-style-type: none;
    margin: 0;
    padding: 0;
  `,
)

export const FooterNavigationItem = styled('li')(
  ({ theme }) => css`
    margin: 20px 0;
    text-align: center;

    ${theme.breakpoints.up('tablet')} {
      text-align: left;
    }
  `,
)

export const FooterLink = styled(HoverUnderlineLink)(
  () => css`
    color: #fffafa;
    font-size: 20px;
    font-family: Source Sans Pro;
  `,
)

export const EasterEgg = styled('img')<{ position: 'left' | 'right'; animationDurationSeconds: number }>(
  ({ theme, position, animationDurationSeconds }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: block;
      position: absolute;
      ${position === 'left' && 'left: 200px;'}
      ${position === 'right' && 'right: 200px;'}
      top: 400px;
      animation-name: PopUp;
      animation-duration: ${animationDurationSeconds}s;
    }
  `,
)
