"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IconDotsVertical, IconEye, IconTarget } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

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
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-button-blue hover:opacity-70">
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-sm">
            <DropdownMenuItem onClick={() => router.push(`/warehouse/${row.original.id}?poNumber=${row.original.PO_number}&requestor=${row.original.requestor}&vendor=${row.original.vendor}&maxReceiveDate=${row.original.max_received_date}&modifiedDate=${row.original.modified_date}&status=${row.original.status}`)}>
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
