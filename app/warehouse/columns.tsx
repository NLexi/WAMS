"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IconDotsVertical, IconEye, IconTarget } from "@tabler/icons-react"

export type Warehouse = {
  id: string
  PO_number: string
  vendor: string
  requestor: string
  max_received_date: string
  modified_date: string
  status: "Approved" | "Open"
}

export const columns: ColumnDef<Warehouse>[] = [
  {
    accessorKey: "PO_number",
    header: "PO Number",
  },
  {
    accessorKey: "vendor",
    header: "Vendor",
  },
  {
    accessorKey: "requestor",
    header: "Requestor",
  },
  {
    accessorKey: "max_received_date",
    header: "Max Received Date",
  },
  {
    accessorKey: "modified_date",
    header: "Modified Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Action",
    cell: ({ row }) => {

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-button-blue hover:opacity-70">
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-sm">
            <DropdownMenuItem>
              <IconEye />
              View Detail
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconTarget />
              Accept PO
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
