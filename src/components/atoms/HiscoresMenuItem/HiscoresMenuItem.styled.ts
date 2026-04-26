import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const MenuItem = styled('li', {
  shouldForwardProp: prop => !['isSelected'].includes(prop.toString()),
})<{ isSelected?: boolean }>(
  ({ theme, isSelected }) => css`
    display: flex;
    gap: 5px;
    align-items: center;
    list-style-type: none;
    text-align: center;
    color: ${isSelected ? theme.palette.custom.tableHeaderText : theme.palette.primary.dark};
    font-size: 14px;
    cursor: pointer;
    border: 0.5px solid ${theme.palette.divider};
    border-radius: 20px;
    border-color: ${isSelected ? theme.palette.primary.main : theme.palette.divider};
    padding: 5px 10px;
    background-color: ${isSelected ? theme.palette.primary.main : theme.palette.background.paper};
    height: fit-content;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;

    ${theme.breakpoints.up('mobile')} {
      gap: 8px;
      width: auto;
      border: 0;
      padding: 7px 14px;
      border-radius: 0;
      color: ${theme.palette.primary.dark};
      ${isSelected && `border-left: 3px solid ${theme.palette.primary.main};`}
      ${isSelected && 'padding-left: 11px;'}
      text-align: left;
      background-color: ${isSelected ? theme.palette.primary.light : 'transparent'};

      &:hover {
        background-color: ${isSelected ? theme.palette.primary.light : theme.palette.custom.skillItemHover};
      }
    }
  `,
)

export const SkillName = styled('span')(
  ({ theme }) => css`
    font-size: 12px;
    line-height: 1;

    ${theme.breakpoints.up('tablet')} {
      font-size: 14px;
    }
  `,
)

export const SelectedSkillText = styled(SkillName)(
  () => css`
    font-weight: 500;
  `,
)
