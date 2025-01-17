import { IconCircleCheck } from "@tabler/icons-react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { ButtonCustom } from "./Button"

type ConfirmationDialogProps = {
    trigger: React.ReactNode
}

export function ConfirmationDialog({ trigger }: ConfirmationDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[60%] sm:h-[90vh] overflow-scroll no-scrollbar">
                <DialogHeader>
                    <DialogTitle className="font-semibold text-xl leading-6 font-outfit border-b-2 border-[#CDD4DA] py-4">Confirmation Request Summary</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-[#323C43]">PO Number</p>
                    <p className="text-base text-[#4A5863]">PO20211230-230-NOC</p>
                </div>
                <Table>
                    <TableHeader className="border-b-2 border-[#8092A0] text-[#4A5863] font-semibold text-sm">
                        <TableRow>
                            <TableHead>Item Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Requestor</TableHead>
                            <TableHead>Request Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="border-b border-[#8092A0]">
                        <TableRow className="text-base text-[#4A5863]">
                            <TableCell>Item Name</TableCell>
                            <TableCell>Item</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>Farhan Harish</TableCell>
                            <TableCell>04 May 2024</TableCell>
                        </TableRow>
                        <TableRow className="text-base text-[#4A5863]">
                            <TableCell>Item Name</TableCell>
                            <TableCell>Item</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>Farhan Harish</TableCell>
                            <TableCell>04 May 2024</TableCell>
                        </TableRow>
                        <TableRow className="text-base text-[#4A5863]">
                            <TableCell>Item Name</TableCell>
                            <TableCell>Item</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>Farhan Harish</TableCell>
                            <TableCell>04 May 2024</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className="flex flex-row gap-[35%]">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">BAST Number</p>
                        <p className="text-base text-[#4A5863]">BAST-1234123</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">BAST Date</p>
                        <p className="text-base text-[#4A5863]">15 November 2024</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-[#323C43]">Upload BAST File</p>
                    <p className="text-base text-[#3199E8] underline">BAST_Vendor_123123.pdf</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-[#323C43]">Note</p>
                    <p className="text-base text-[#4A5863]">BAST sudah sesuai dengan PO number PO20211230-230-NOC khusus untuk 3 item tercantum</p>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <ButtonCustom variant="tertiary">Decline</ButtonCustom>
                    </DialogClose>
                    <ButtonCustom variant="primary" type="link" destination="/request" icon={<IconCircleCheck />}>Confirm</ButtonCustom>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}