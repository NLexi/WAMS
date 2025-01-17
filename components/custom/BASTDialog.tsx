import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { DialogClose } from "@radix-ui/react-dialog"
import { ButtonCustom } from "./Button"
import { IconCircleCheck } from "@tabler/icons-react"

type BASTDialogProps = {
    trigger: React.ReactNode
}

export function BASTDialog({ trigger }: BASTDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className='px-6 py-4 max-w-[52%]'>
                <DialogHeader className="flex items-start pt-4 pb-[2%] border-b-2">
                    <DialogTitle className="font-semibold font-outfit text-xl leading-6">Confirmation Request Summary</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-1 pt-2">
                    <p className="text-xs text-[#323C43]">PO Number</p>
                    <p className="text-base text-[#4A5863] font-semibold">PO20211230-230-NOC</p>
                </div>
                <Table>
                    <TableHeader className="border-b-2 border-[#8092A0] text-[#4A5863] font-semibold text-sm">
                        <TableRow>
                            <TableHead>Item Name</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Requestor</TableHead>
                            <TableHead>Request Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="border-b border-[#8092A0]">
                        <TableRow className="text-base text-[#4A5863]">
                            <TableCell>Item Name</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>Farhan Harish</TableCell>
                            <TableCell>04 May 2024</TableCell>
                        </TableRow>
                        <TableRow className="text-base text-[#4A5863]">
                            <TableCell>Item Name</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>Farhan Harish</TableCell>
                            <TableCell>04 May 2024</TableCell>
                        </TableRow>
                        <TableRow className="text-base text-[#4A5863]">
                            <TableCell>Item Name</TableCell>
                            <TableCell>10</TableCell>
                            <TableCell>Farhan Harish</TableCell>
                            <TableCell>04 May 2024</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className="flex flex-row gap-[25%]">
                    <div className="flex flex-col gap-1 pt-2">
                        <p className="text-xs text-[#323C43]">BAST Number</p>
                        <p className="text-base text-[#4A5863] font-semibold">BAST-1234123</p>
                    </div>
                    <div className="flex flex-col gap-1 pt-2">
                        <p className="text-xs text-[#323C43]">BAST Date</p>
                        <p className="font-semibold text-[#4A5863] text-base">15 November 2024</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1 pt-2">
                    <p className="text-xs text-[#323C43]">Upload BAST File</p>
                    <p className="text-[#3199E8] underline">BAST_Vendor_123123.pdf</p>
                </div>
                <div className="flex flex-col gap-1 pt-2">
                    <p className="text-xs text-[#323C43]">Note</p>
                    <p className="font-semibold text-[#4A5863] text-base">BAST sudah sesuai dengan PO number PO20211230-230-NOC khusus untuk 3 item tercantum</p>
                </div>
                <DialogFooter className="flex flex-row justify-end border-t-2 pt-4">
                    <DialogClose type="submit" asChild>
                        <ButtonCustom variant="tertiary">Close</ButtonCustom>
                    </DialogClose>
                    <ButtonCustom variant="primary" type="link" destination="/purchaseorder" icon={<IconCircleCheck />}>Confirm</ButtonCustom>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}