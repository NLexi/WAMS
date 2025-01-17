"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react"
import { Checkbox } from "@/components/ui/checkbox"
import { FormDialog } from "@/components/custom/FormDialog"
import { DeleteRequest } from "@/components/custom/RequestDelete"

export type ConfirmationRequest = {
  id: string
  itemName: string
  amount: number
  requestor: string
  requestDate: string
}

export const columns: ColumnDef<ConfirmationRequest>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="w-6 h-6 p-0 rounded-none"

      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "itemName",
    header: "Item Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "requestor",
    header: "Requestor",
  },
  {
    accessorKey: "requestDate",
    header: "Request Date",
  },
]