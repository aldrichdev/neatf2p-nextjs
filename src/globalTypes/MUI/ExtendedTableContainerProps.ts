import { PaperTypeMap, TableContainerProps } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export type ExtendedTableContainerProps = TableContainerProps & {
  component: OverridableComponent<PaperTypeMap<NonNullable<unknown>, 'div'>>
}
