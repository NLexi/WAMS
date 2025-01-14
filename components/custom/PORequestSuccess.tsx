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

type SuccessPORequestProps = {
    trigger: React.ReactNode
}

export function PORequestSuccess({ trigger }: SuccessPORequestProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className='flex flex-col m-auto items-center'>
                <DialogHeader className="flex m-auto items-center pt-[5%] pb-[2%]">
                    <DialogTitle className="font-semibold font-outfit text-xl leading-6">Request Approval Success</DialogTitle>
                    <DialogDescription className="text-xs text-wrap w-[60%] text-center">
                        This Purchase Order has successfully moved to PO Approval List. We will notify approver for this update.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose type="submit" asChild>
                        <ButtonCustom variant="primary">Close</ButtonCustom>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}