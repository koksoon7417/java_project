import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    TableOptions,
    ColumnDef
} from '@tanstack/react-table'
import './table.css'

interface TableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
};

export const Table = <T extends unknown>(tableProps: TableProps<T>) => {
    const tableOptions: TableOptions<T> = {
        ...tableProps,
        getCoreRowModel: getCoreRowModel(),
    };
    const table = useReactTable(tableOptions);

    return (
        <div>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};