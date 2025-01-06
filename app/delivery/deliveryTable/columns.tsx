"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IconDotsVertical, IconEye, IconTruckDelivery } from "@tabler/icons-react"

export type Delivery = {
    id: string
    request_number: string
    PO_number: string
    requestor: string
    department: string
    request_date: string
    status: "Approve" | "On Warehouse" | "On PO" | "Complete PO"
}

export const columns: ColumnDef<Delivery>[] = [
    {
        accessorKey: "request_number",
        header: "Request Number",
    },
    {
        accessorKey: "PO_number",
        header: "PO Number",
    },
    {
        accessorKey: "requestor",
        header: "Requestor",
    },
    {
        accessorKey: "department",
        header: "Department",
    },
    {
        accessorKey: "request_date",
        header: "Request Date",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({}) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 text-button-blue">
                    <IconDotsVertical/>
                    <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    View Detail
                    <DropdownMenuShortcut><IconEye/></DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Create DO
                    <DropdownMenuShortcut><IconTruckDelivery/></DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]
