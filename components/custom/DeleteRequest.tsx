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
}

export function DeleteRequest({ trigger }: DeleteRequestProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className='flex flex-col m-auto items-center'>
                <DialogHeader className="flex m-auto items-center py-[5%]">
                    <DialogTitle className="font-semibold font-outfit text-xl leading-6">Delete Request Item</DialogTitle>
                    <DialogDescription className="text-xs">
                        Are you sure you want delete this request?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <ButtonCustom variant='danger'>                   Confirm Delete                   </ButtonCustom>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}