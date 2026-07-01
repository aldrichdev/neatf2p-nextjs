export type DatePickerProps = {
  id?: string
  label: string
  value?: Date
  onChange?: (value: Date | undefined) => void
  className?: string
}
