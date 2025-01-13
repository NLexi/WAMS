import { ButtonCustom } from "@/components/custom/Button"
import Navbar from "@/components/custom/Navbar"
import { PageTabs } from "@/components/custom/PageTabs"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"
import { IconListSearch } from "@tabler/icons-react"

const newacceptpo = () => {

    return (
        <div>
            <Navbar username='Eko Widiyanto'/>
            <PageTabs initialTab="warehouse" />
            <div className="container mx-auto py-6">
                <div className="flex justify-start items-center pb-2 text-black">
                    <h1 className="text-[1.75rem] font-bold font-outfit leading-8">New Accept PO</h1>
                </div>
            </div>
            <div className="container mx-auto px-[10%] py-[5%]">
                <div className=" border-b-2 border-[#CDD4DA] m-auto p-4 text-xl font-semibold font-outfit leading-6">
                    <h5>Check PO Number</h5>
                </div>
                <div className="m-auto p-4 items-center">
                    <Label className="flex flex-row items-center gap-1 text-xs font-medium text-[#323C43] leading-5">PO Number</Label>
                    <div className="flex flex-row gap-4 items-center">
                        <Input className="w-[90%] placeholder-[#B3BEC6] text-sm leading-5 py-0 min-h-max" placeholder="Input PO Number"></Input>
                        <ButtonCustom variant="primary" icon={<IconListSearch />} type="link" destination="#">Check</ButtonCustom>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default newacceptpo;