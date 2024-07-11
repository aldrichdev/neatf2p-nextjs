import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const NpcHiscoreLink = styled(HoverUnderlineLink)(
  () => css`
    color: var(--npc-hiscores-text-color);
  `,
)
