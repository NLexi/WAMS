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



type DeleteRequestProps = {
    trigger: React.ReactNode
    requestNumber?: string
}

export function DeleteRequest({ trigger, requestNumber }: DeleteRequestProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className='flex flex-col m-auto items-center'>
                <DialogHeader className="flex m-auto items-center py-[5%]">
                    <DialogTitle className="font-semibold font-outfit text-xl leading-6">Delete Request Item</DialogTitle>
                    <DialogDescription className="text-xs text-center">
                        {!requestNumber ? <>Are you sure you want to delete this request?</> : <>Are you sure you want delete these requests?<br />{requestNumber}</>}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <ButtonCustom variant='primary' color="red">                   Confirm Delete                   </ButtonCustom>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}