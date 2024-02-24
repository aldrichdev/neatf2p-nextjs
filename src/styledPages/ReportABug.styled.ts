import { FormControl, MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

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
      background-color: var(--faded-green-bg-color);
    }

    &&.Mui-selected {
      background-color: lightgray;

      &:hover {
        background-color: var(--faded-green-bg-color);
      }
    }

    &:focus {
      background-color: lightgray;
    }
  `,
)
