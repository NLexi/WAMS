"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    SortingState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"
import { IconChevronLeft, IconChevronRight, IconSearch, IconPlus } from "@tabler/icons-react"
import { ButtonCustom } from "@/components/custom/Button"
import { useRouter } from "next/navigation"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
          },
    })

    return (
        <div>
            <div className="mx-auto flex py-4 pt-6 justify-between items-center">
                <div className="font-semibold text-xl font-outfit">
                    Requests by Item
                </div>
                <div className="flex item-center">
                    <IconSearch className="relative left-7 top-4 transform -translate-y-1/2 text-[#4A5863]" />
                    <Input
                        placeholder="Search Request Number"
                        value={(table.getColumn("request_number")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("request_number")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm pl-9 border-[#CDD4DA] placeholder-[#B3BEC6] text-sm"
                    />
                </div>
            </div>
            <Table>
                <TableHeader className="border-b-2 border-[#8092A0] text-xs text-[#B3BEC6]">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
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
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="text-sm"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="mx-auto flex justify-end gap-2 p-2">
                <Button onClick={() => table.previousPage()} variant="ghost"><IconChevronLeft /></Button>
                <Button onClick={() => table.nextPage()} variant="ghost"><IconChevronRight /></Button>
            </div>
        </div>
    )
}