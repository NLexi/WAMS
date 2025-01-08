"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IconCircleX, IconDotsVertical, IconTrash, IconWallet } from "@tabler/icons-react"
import { DeleteRequest } from "@/components/custom/DeleteRequest"
import { Checkbox } from "@/components/ui/checkbox"
import { RejectRequest } from "@/components/custom/RejectRequest"

export type Requests = {
  id: string
  request_number: string
  itemName: string
  qty: number
  status: "OPEN" | "CLOSE"
  location: string
  targetReceived: string
  requestor: string
}

export const columns: ColumnDef<Requests>[] = [
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
    accessorKey: "request_number",
    header: "Request Number",
  },
  {
    accessorKey: "itemName",
    header: "Item Name",
  },
  {
    accessorKey: "qty",
    header: "Qty",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "targetReceived",
    header: "Target Received",
  },
  {
    accessorKey: "requestor",
    header: "Requested By",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Action",
    cell: ({ row }) => {

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-button-blue hover:opacity-70" onClick={() => console.log('hello')}>
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-sm">
            <DropdownMenuItem>
              <IconWallet />
              Create PO
            </DropdownMenuItem>
            <RejectRequest trigger={
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <IconCircleX />
              Reject Request 
            </DropdownMenuItem>
            } requestNumber={row.original.request_number}/>
            <DeleteRequest trigger={
              <DropdownMenuItem className="text-[#CA2B17]" onSelect={(e) => e.preventDefault()}>
                <IconTrash />
                Delete Request
              </DropdownMenuItem>}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
