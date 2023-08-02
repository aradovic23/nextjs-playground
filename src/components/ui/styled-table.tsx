import { useReactTable, getCoreRowModel, flexRender, ColumnDef, getPaginationRowModel, Row, getExpandedRowModel } from '@tanstack/react-table'
import { Fragment, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from './button'


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  getRowCanExpand: (row: Row<TData>) => boolean
  renderSubComponent: (props: { row: Row<TData> }) => React.ReactElement
}


export const StyledTable = <TData, TValue>({
  columns,
  data,
  getRowCanExpand,
  renderSubComponent
}: DataTableProps<TData, TValue>) => {

  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection
    },
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand,
  })

  return (
    <div className='p-2 border rounded-md'>
      <Table>
        <TableHeader className='border'>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="border" key={header.id}>
                    {header.isPlaceholder ? null : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>

              <TableRow>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className='border'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>

              {row.getIsExpanded() && (
                <TableRow>
                  <TableCell colSpan={row.getVisibleCells().length}>
                    {renderSubComponent({ row })}
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
      <div className='flex items-center justify-between gap-5 mt-2'>
        <div className='flex gap-2'>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </Button>
        </div>
        <span className="flex items-center gap-1">
          <div>page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <div>
          {Object.keys(rowSelection).length} of{' '}
          {table.getPreFilteredRowModel().rows.length} total rows selected
        </div>
      </div>
    </div>
  )
}

