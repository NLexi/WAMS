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

type SuccessRequestProps = {
    trigger: React.ReactNode
}

export function RequestSuccess({ trigger }: SuccessRequestProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className='flex flex-col m-auto items-center'>
                <DialogHeader className="flex m-auto items-center pt-[5%] pb-[2%]">
                    <DialogTitle className="font-semibold font-outfit text-xl leading-6">Success</DialogTitle>
                    <DialogDescription className="text-xs text-wrap w-[60%] text-center">
                        Request item successfully created and sent to your approver to be processed.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose type="submit" asChild>
                        <ButtonCustom variant="primary" type="link" destination="/request">Close</ButtonCustom>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}