import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const LevelMenuContainer = styled('div')(
  () => css`
    margin-bottom: 16px;
  `,
)

// TODO: Tear down
// export const ContextLabel = styled('div')(
//   () => css`
//     text-align: left;
//     display: flex;
//     gap: 6px;
//     align-items: center;
//     margin-bottom: 16px;
//     font-size: 14px;
//   `,
// )

// export const ContextNpcName = styled('span')(
//   ({ theme }) => css`
//     color: ${theme.palette.primary.main};
//     font-weight: 600;
//   `,
// )

// export const ContextSeparator = styled('span')(
//   ({ theme }) => css`
//     color: ${theme.palette.divider};
//   `,
// )

// export const ContextLevel = styled('span')(
//   ({ theme }) => css`
//     color: ${theme.palette.text.disabled};
//   `,
// )
