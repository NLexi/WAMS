import { ButtonCustom } from "@/components/custom/Button"
import Navbar from "@/components/custom/Navbar"
import { PageTabs } from "@/components/custom/PageTabs"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"
import { IconListSearch } from "@tabler/icons-react"

export default function ConfirmationRequest() {

    return (
        <div>
            <Navbar username='Eko Widiyanto'/>
            <PageTabs initialTab="request" />
            <div className="container mx-auto py-6">
                <div className="flex justify-start items-center pl-[13%] pb-2 text-black">
                    <h1 className="text-[1.75rem] font-bold font-outfit leading-8">Confirmation Request</h1>
                </div>
            </div>
            <div className="container h-[55vh] mx-auto px-[10%] flex flex-col justify-center">
                <div className="m-auto p-4 w-full">
                    <Label className="flex flex-row items-center gap-1 text-xs font-medium text-[#323C43] leading-5">PO Number</Label>
                    <div className="flex flex-row gap-4 items-center">
                        <Input className="w-[90%] placeholder-[#B3BEC6] text-sm leading-5 py-0 min-h-max" placeholder="Input PO Number"></Input>
                        <ButtonCustom variant="primary" icon={<IconListSearch />} type="link" destination="/confirmation/filled">Check</ButtonCustom>
                    </div>
                </div>
            </div>
        </div>
    )
}