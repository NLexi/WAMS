"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react"
import { Checkbox } from "@/components/ui/checkbox"
import { FormDialog } from "@/components/custom/FormDialog"
import { DeleteRequest } from "@/components/custom/RequestDelete"

export type AddRequest = {
  id: string
  itemName: string
  type: string
  amount: number
  receivedTarget: string
  requestor: string
  status: "Pre Order" | "In Stock"
}

export const columns: ColumnDef<AddRequest>[] = [
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
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "receivedTarget",
    header: "Received Target",
  },
  {
    accessorKey: "requestor",
    header: "Requestor",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Action",
    cell: () => {

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-button-blue hover:opacity-70" onClick={() => console.log('hello')}>
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-sm">
            <FormDialog trigger={
              <DropdownMenuItem className="text-[#4A5863]" onSelect={(e) => e.preventDefault()}>
                <IconEdit />
                Edit Item Request
              </DropdownMenuItem>}
            />
            <DeleteRequest trigger={
              <DropdownMenuItem className="text-[#CA2B17]" onSelect={(e) => e.preventDefault()}>
                <IconTrash />
                Delete Item
              </DropdownMenuItem>}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
