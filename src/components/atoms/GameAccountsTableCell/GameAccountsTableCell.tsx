import clsx from 'clsx'

type GameAccountsTableCellProps = {
  children?: React.ReactNode
  bold?: boolean
  className?: string
}

const GameAccountsTableCell = ({ children, bold, className }: GameAccountsTableCellProps) => (
  <td
    className={clsx('border-divider border-b text-left md:text-center', bold ? 'font-bold' : 'font-normal', className)}
  >
    {children}
  </td>
)

export { GameAccountsTableCell }
