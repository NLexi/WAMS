import { ButtonCustom } from "@/app/components/Buttons/Button"
import Navbar from "@/app/components/Navbars/Navbar"
import { PageTabs } from "@/app/delivery/page-tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"
import { IconInfoCircle, IconListSearch } from "@tabler/icons-react"

const addrequest = () => {
    return (
        <div>
            <Navbar />
            <PageTabs />
            <div className="container mx-auto py-6">
                <div className="flex justify-start items-center pb-2 text-black">
                    <h1 className="text-[1.75rem] font-bold font-outfit leading-8">Add New Request</h1>
                </div>
            </div>
            <div className="container mx-auto flex flex-row py-4">
                <div className="basis-1/4 flex flex-col gap-4 py-4 font-inter">
                    <div className="flex flex-row justify-start items-center gap-4 font-inter text-sm">
                        <div className="w-7 h-7 rounded-full bg-[#3199E8] flex items-center justify-center hover:cursor-pointer font-semibold text-white">
                            1
                        </div>
                        <div className="font-normal">Input Project ID</div>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-4 font-inter text-sm">
                        <div className="w-7 h-7 rounded-full bg-[#F3F5F6] flex items-center justify-center hover:cursor-pointer font-semibold text-[#4A5863]">
                            2
                        </div>
                        <div className="font-normal">Item & Service Request</div>
                    </div>
                </div>
                <div className="basis-3/4">
                    <div className="border-b-2 border-[#CDD4DA] m-auto p-4 text-xl font-semibold font-outfit leading-6">
                        <h5>Input Project ID</h5>
                    </div>
                    <div className="m-auto p-4">
                        <Label className="flex flex-row items-center gap-1 text-xs font-medium font-inter text-[#323C43] leading-5">Project ID <IconInfoCircle className="text-[#177CCA] w-[0.875rem]"/></Label>
                        <div className="flex flex-row gap-4">
                            <Input className="w-[55%] placeholder-[#B3BEC6] font-normal text-sm leading-5 py-0 min-h-max" placeholder="Input Project ID here"></Input>
                            <ButtonCustom variant="primary" icon={<IconListSearch/>}>Check</ButtonCustom>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default addrequest;