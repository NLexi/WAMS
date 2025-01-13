"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
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
import React, { useState } from "react"
import { IconBoxOff, IconChevronLeft, IconChevronRight, IconSearch } from "@tabler/icons-react"
import { RequestFilter } from "@/components/custom/RequestFilter"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {

    const [activeFilter, setActiveFilter] = useState<string>('all');

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    if (!data.length) {
        return (
            <div>
                <div className="flex flex-col items-center justify-center w-full h-[20vh] border-2 border-[#E5E8EB] rounded-sm text-[#4A5863] font-semibold text-base gap-4">
                    <IconBoxOff />
                    No PO yet.
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="mx-auto flex py-4 justify-between">
                <div>
                    <div className="flex flex-row gap-4 pb-4 items-center justify-start">
                        <p>Category by:</p>
                        <RequestFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                    </div>
                </div>
                <div className="flex item-center">
                    <IconSearch className="relative left-7 top-4 transform -translate-y-1/2 text-[#4A5863]" />
                    <Input
                        placeholder="Search PO Number"
                        value={(table.getColumn("PO_number")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("PO_number")?.setFilterValue(event.target.value)
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
                            <TableCell colSpan={columns.length} className="h-24 text-center text-[#4A5863] font-semibold text-base">
                                No results
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="mx-auto flex justify-end gap-2 p-2">
                <Button onClick={() => table.previousPage()} variant="ghost" disabled={!table.getCanPreviousPage()}><IconChevronLeft /></Button>
                <Button onClick={() => table.nextPage()} variant="ghost" disabled={!table.getCanNextPage()}><IconChevronRight /></Button>
            </div>
        </div>
    )
}
