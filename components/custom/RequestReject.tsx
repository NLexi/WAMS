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

type DeleteRequestProps = {
    trigger: React.ReactNode
    requestNumber: string
}

export function RequestReject({ trigger, requestNumber }: DeleteRequestProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className='flex flex-col m-auto items-center'>
                <DialogHeader className="flex m-auto items-center pt-[5%]">
                    <DialogTitle className="font-semibold font-outfit text-xl leading-6">Reject Request Item</DialogTitle>
                    <DialogDescription className="text-xs">
                        Affected Request Number {requestNumber}
                    </DialogDescription>
                </DialogHeader>
                <div className="w-[90%] mt-2">
                    <p className="font-medium text-xs leading-5 text-[#323C43] p-1">Reason</p>
                    <Textarea id='reason' placeholder="Give a Reason to decline this request" className="resize-none text-xs text-[#4A5863] placeholder-[#4A5863] rounded-sm" />
                </div>
                <DialogFooter>
                    <DialogClose type="submit" asChild>
                        <ButtonCustom variant='primary' color="red">                   Submit Reject                   </ButtonCustom>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}