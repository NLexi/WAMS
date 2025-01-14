import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { ButtonCustom } from "./Button"
import { Textarea } from "../ui/textarea"

type RejectPOProps = {
    trigger: React.ReactNode
    poNumber: string
}

export function POReject({ trigger, poNumber }: RejectPOProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className='flex flex-col m-auto items-center'>
                <DialogHeader className="flex m-auto items-center pt-[5%]">
                    <DialogTitle className="font-semibold font-outfit text-xl leading-6">Reject this PO</DialogTitle>
                    <DialogDescription className="text-xs">
                        Affected PO Number {poNumber}
                    </DialogDescription>
                </DialogHeader>
                <div className="w-[90%] mt-2">
                <p className="font-medium text-xs leading-5 text-[#323C43] p-1">Reason</p>
                <Textarea id='reason' placeholder="Give a reason to reject this PO" className="resize-none text-xs text-[#4A5863] placeholder-[#4A5863] rounded-sm" />
                </div>
                <DialogFooter>
                    <DialogClose type="submit" asChild>
                        <ButtonCustom variant='danger'>                   Submit Reject                   </ButtonCustom>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}