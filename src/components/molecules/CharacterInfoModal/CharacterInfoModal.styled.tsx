import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import { Tooltip, TooltipProps, tooltipClasses } from '@mui/material'

export const ViewButton = styled(Button)(
  () => css`
    color: black;
    font-family: Saros;
    font-size: 20px;
    height: 24px;
    padding-bottom: 6px;
    text-decoration: underline;

    :hover {
      color: #eb1514;
      text-decoration: underline;
    }
  `,
)

export const KillsAndDeaths = styled('span')(
  () => css`
    color: gray;
  `,
)

export const KdrTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontFamily: 'Source Sans Pro',
    backgroundColor: 'black',
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))
