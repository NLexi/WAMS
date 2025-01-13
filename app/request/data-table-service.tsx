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
import { IconBoxOff, IconChevronLeft, IconChevronRight, IconCircleX, IconSearch, IconTrash, IconWallet } from "@tabler/icons-react"
import { ButtonCustom } from "@/components/custom/Button"
import { RequestReject } from "@/components/custom/RequestReject"
import { DeleteRequest } from "@/components/custom/RequestDelete"


interface DataTableServiceProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTableService<TData, TValue>({
    columns,
    data,
}: DataTableServiceProps<TData, TValue>) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const getSelectedRequestNumbers = () => {
        const selectedRows = table.getFilteredSelectedRowModel().rows
        const requestNumbers = selectedRows.map((row) => row._valuesCache.request_number)
        return requestNumbers.join(", ")
      }

    if (!data.length) {
        return (
            <div>
                <div className="mx-auto flex py-4 pt-6 justify-between items-center">
                    <div className="font-semibold text-xl font-outfit">
                        Requests by Service
                    </div>

                </div>
                <div>
                    <div className="flex flex-col items-center justify-center w-full h-[20vh] border-2 border-[#E5E8EB] rounded-sm text-[#4A5863] font-semibold text-base gap-4">
                        <IconBoxOff />
                        No Requests by Services yet.
                    </div>
                </div>
            </div>

        )
    }

    return (
        <div>
            <div className="mx-auto flex py-4 pt-6 justify-between items-center">
                <div className="font-semibold text-xl font-outfit">
                    Requests by Service
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
            {table.getFilteredSelectedRowModel().rows.length > 1 ?
                <div className="flex flex-row w-full bg-[#D6EAFA] m-auto justify-start items-center rounded-sm py-3 px-6 gap-4">
                    <div>{table.getFilteredSelectedRowModel().rows.length} items selected: </div>
                    <ButtonCustom variant="tertiary" icon={<IconWallet />}> Create PO</ButtonCustom>
                    <RequestReject trigger={<ButtonCustom variant="tertiary" icon={<IconCircleX />}> Decline Requests</ButtonCustom>} requestNumber={getSelectedRequestNumbers()}/>
                    <DeleteRequest trigger={<Button className="flex h-10 items-center rounded-md text-sm focus-visible:outline aria-disabled:cursor-not-allowed aria-disabled:opacity-50 justify-center text-[#CA2B17] bg-white px-4 font-medium transition-colors hover:bg-[#CA2B17] hover:text-white hover:opacity-70 shadow-none"><IconTrash /> Delete Requests</Button>} requestNumber={getSelectedRequestNumbers()}/>
                </div>
                : <></>
            }
            <Table>
                <TableHeader className="border-b-2 border-[#8092A0] text-xs text-[#B3BEC6]">
                    {table.getRowModel().rows?.length ? (
                        table.getHeaderGroups().map((headerGroup) => (
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
                        ))
                    ) : (
                        <></>
                    )}
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
                                Service Not Found
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