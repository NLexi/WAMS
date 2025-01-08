"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IconDotsVertical, IconEye, IconTruckDelivery } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

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
    header: "Action",
    cell: ({ row }) => {
      const router = useRouter();
      const deliveryId = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-button-blue hover:opacity-70">
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-sm">
            <DropdownMenuItem
              onClick={() =>
                router.push(
                  `/delivery/${deliveryId}?requestNumber=${row.original.request_number}&poNumber=${row.original.PO_number}&requestor=${row.original.requestor}&department=${row.original.department}&requestDate=${row.original.request_date}&status=${row.original.status}`
                )
              }
            >
              <IconEye />
              View Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(
                  `/delivery/createdo?requestNumber=${row.original.request_number}&poNumber=${row.original.PO_number}&requestor=${row.original.requestor}&department=${row.original.department}&requestDate=${row.original.request_date}`
                )
              }
            >
              <IconTruckDelivery />
              Create DO
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
