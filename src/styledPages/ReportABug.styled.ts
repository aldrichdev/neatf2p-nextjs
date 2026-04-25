import { FormControl, MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import Link from 'next/link'

export const BugTypeDropdown = styled(FormControl)(
  () => css`
    font-family: Source Sans Pro;
    flex-basis: 100%;
    margin-top: 20px;

    & .MuiSelect-select {
      text-align: left;
    }
  `,
)

export const BugTypeMenuItem = styled(MenuItem)(
  () => css`
    font-family: Source Sans Pro;

    &:hover {
      background-color: var(--color-primary-dark);
    }

    &&.Mui-selected {
      background-color: lightgray;

      &:hover {
        background-color: var(--color-primary-dark);
      }
    }

    &:focus {
      background-color: lightgray;
    }
  `,
)

export const IssuesLink = styled(Link)(
  ({ theme }) => css`
    color: ${theme.palette.primary.main};
  `,
)
