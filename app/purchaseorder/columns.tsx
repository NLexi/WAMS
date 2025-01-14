"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IconBallpen, IconDotsVertical, IconEye, IconFileDownload, IconTarget } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useSnackbar } from "@/components/custom/Snackbar"
import { PORequestSuccess } from "@/components/custom/PORequestSuccess"

export type PurchaseOrder = {
  id: string
  PO_number: string
  vendor: string
  requestor: string
  created_at: string
  total_amount: number
  status: "Approved" | "On Vendor" | "Need Approval"
}

export const columns: ColumnDef<PurchaseOrder>[] = [
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
    accessorKey: "created_at",
    header: "Created at",
  },
  {
    accessorKey: "total_amount",
    header: "Total Amount",
    cell: ({ row }) => {
      return (
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(row.original.total_amount)
      )
    }
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
      const showSnackbar = useSnackbar();

      const handleClick = (variant: 'success' | 'error' | 'default' | 'info', message: string, subMessage: string) => {
        showSnackbar(message, variant, subMessage);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-button-blue hover:opacity-70">
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-sm">
            <DropdownMenuItem onClick={() => router.push(`/purchaseorder/${row.original.id}?poNumber=${row.original.PO_number}&vendor=${row.original.vendor}&requestor=${row.original.requestor}&createdAt=${row.original.created_at}&totalAmount=${row.original.total_amount}&status=${row.original.status}`)}>
              <IconEye />
              View Detail
            </DropdownMenuItem>
            {row.original.status != "Approved" ?
              <DropdownMenuItem>
                <IconTarget />
                Accept PO
              </DropdownMenuItem> : <></>}
            {row.original.status == "On Vendor" ?
              <PORequestSuccess trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <IconBallpen />
                  Request for Approval
                </DropdownMenuItem>
              } /> : <></>}
            <DropdownMenuItem onClick={() => handleClick('success', row.original.PO_number, 'Successfully downloaded')}>
              <IconFileDownload />
              Download
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
