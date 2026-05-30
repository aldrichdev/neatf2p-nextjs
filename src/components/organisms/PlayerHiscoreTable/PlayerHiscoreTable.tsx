import { ReactNode } from 'react'
import clsx from 'clsx'
import { hiscoresTableClass, hiscoresTheadClass } from '../../../consts/styles/hiscores'

type HiscoreTableProps = {
  accountName: string
  /** The columns, or header cells, for the table.
   * Pass a fragment with several `HiscoreTableCell` children. */
  columns: ReactNode
  /** The rows for the table. When setting this prop, map through
   * the hiscores and render a `HiscoreTableRow` containing cells with data values. */
  body: ReactNode
  /** Whether this component is used to render NPC kill hiscores.
   * Needed, since the NPC table has less columns, and thus, different styling.
   */
  isNpcTable?: boolean
}

const PlayerHiscoreTable = (props: HiscoreTableProps) => {
  const { accountName, columns, body, isNpcTable } = props

  return (
    <div className='overflow-hidden rounded-t-lg shadow-none'>
      <table aria-label={`${accountName} Hiscore Table`} className={hiscoresTableClass}>
        <thead className={hiscoresTheadClass}>
          <tr
            className={clsx(
              isNpcTable ? 'grid-cols-[50%_20%_30%]' : 'grid-cols-[30%_20%_20%_30%]',
              'grid h-fit items-center border-b-0 text-[14px] md:text-[16px]',
            )}
          >
            {columns}
          </tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  )
}

export default PlayerHiscoreTable
