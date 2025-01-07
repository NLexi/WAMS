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
import React from "react"
import { IconChevronLeft, IconChevronRight, IconSearch } from "@tabler/icons-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return (
        <div>
            <div className="mx-auto flex py-4 justify-end">
                <div className="flex item-center">
                    <IconSearch className="relative left-7 top-4 transform -translate-y-1/2 text-[#4A5863]" />
                    <Input
                        placeholder="Search PO Number"
                        value={(table.getColumn("PO_number")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("PO_number")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm pl-9 border-[#CDD4DA] placeholder-[#B3BEC6] font-inter font-normal text-sm"
                    />
                </div>
            </div>
            <Table>
                <TableHeader className="border-b-2 border-[#8092A0] font-inter text-xs text-[#B3BEC6]">
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
                                className="font-inter text-sm font-normal"
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
