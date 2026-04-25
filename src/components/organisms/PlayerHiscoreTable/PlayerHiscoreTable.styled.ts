import { HiscoreTableCell } from '@molecules/HiscoresTable/HiscoresTable.styled'
import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'
import { TableCell, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const HiscoreTableRow = styled(TableRow, {
  shouldForwardProp: prop => !['isHeaderRow', 'isRankOneRow', 'isNpcTable'].includes(prop.toString()),
})<{ isHeaderRow?: boolean; isRankOneRow?: boolean; isNpcTable?: boolean }>(
  ({ theme, isHeaderRow, isRankOneRow, isNpcTable }) => css`
    display: grid;
    grid-template-columns: ${isNpcTable ? '50% 20% 30%' : 'repeat(4, 1fr)'};
    font-size: 14px;
    border-bottom: 0.5px solid ${theme.palette.divider};
    height: fit-content;
    align-items: center;

    ${!isHeaderRow &&
    `    
        &:hover {
          background-color: ${theme.palette.divider};

          #rank-one {
            color: ${theme.palette.custom.rankGold.altText};
          }
        }
    `}

    ${theme.breakpoints.up('tablet')} {
      font-size: 16px;
    }
  `,
)

export const HiscoreSkillTableCell = styled(TableCell)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    border: 0;
    padding: 8px;

    ${theme.breakpoints.up('tablet')} {
      padding: 16px;
    }
  `,
)

export const HiscoreSkillIcon = styled('img')(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: block;
      width: 20px;
      margin-right: 8px;
      background-color: transparent;
    }
  `,
)

export const PlayerHiscoreTableCell = styled(HiscoreTableCell)(
  () => css`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
)

export const SkillLink = styled(HoverUnderlineLink)(
  () => css`
    color: black;
  `,
)

export const ExperienceCell = styled(HiscoreTableCell)(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: table-cell;
      min-width: 100px;
    }
  `,
)

export const MobileExperienceCell = styled(HiscoreTableCell)(
  ({ theme }) => css`
    ${theme.breakpoints.up('tablet')} {
      display: none;
    }
  `,
)
