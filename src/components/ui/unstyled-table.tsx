import { useReactTable, getCoreRowModel, flexRender, ColumnDef, getPaginationRowModel, Row, getExpandedRowModel } from '@tanstack/react-table'
import { Fragment, useState } from 'react'


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    getRowCanExpand: (row: Row<TData>) => boolean
    renderSubComponent: (props: { row: Row<TData> }) => React.ReactElement
}


export const DataTable = <TData, TValue>({
    columns,
    data,
    getRowCanExpand,
    renderSubComponent,
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
            <table className='border'>
                <thead className='border'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th className="border" key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Fragment key={row.id}>
                            <tr>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className='border border-dashed border-slate-400/50'>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>

                            {row.getIsExpanded() && (
                                <tr>
                                    <td colSpan={row.getVisibleCells().length}>
                                        {renderSubComponent({ row })}
                                    </td>
                                </tr>
                            )}

                        </Fragment>
                    ))}

                </tbody>
            </table>
            <div className='flex items-center justify-between gap-5 mt-2'>
                <div className='flex gap-2'>
                    <button
                        className="p-1 border rounded"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'< previous'}
                    </button>
                    <button
                        className="p-1 border rounded"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'next >'}
                    </button>
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

