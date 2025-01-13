'use client'

import { ButtonCustom } from "@/components/custom/Button"
import Navbar from "@/components/custom/Navbar"
import { PageTabs } from "@/components/custom/PageTabs"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"
import { IconInfoCircle, IconListSearch } from "@tabler/icons-react"
import { useSearchParams } from "next/navigation"

export default function CreatePOPage() {

    const searchparams = useSearchParams();

    const podata = {
        requestNumber: searchparams.get('requestNumber'),
        requestor: searchparams.get('requestor'),
    }

    return (
        <div>
            <Navbar username='Eko Widiyanto'/>
            <PageTabs initialTab="purchaseorder"/>
            <div className="container mx-auto py-6">
                <div className="flex justify-start items-center pb-2 text-black">
                    <h1 className="text-[1.75rem] font-bold font-outfit leading-8">Create New PO</h1>
                </div>
            </div>
            <div className="container mx-auto flex flex-row py-4">
                <div className="basis-1/4 flex flex-col gap-4 py-4">
                    <div className="flex flex-row justify-start items-center gap-4 text-sm">
                        <div className="w-7 h-7 rounded-full bg-[#3199E8] flex items-center justify-center font-semibold text-white">
                            1
                        </div>  
                        <div>General Information</div>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-4 text-sm">
                        <div className="w-7 h-7 rounded-full bg-[#3199E8] flex items-center justify-center font-semibold text-white">
                            2
                        </div>
                        <div>Items Detail</div>
                    </div>
                </div>
                <div className="basis-3/4">
                    <div className="border-b-2 border-[#CDD4DA] m-auto p-4 text-xl font-semibold font-outfit leading-6">
                        <h5>General Information</h5>
                    </div>
                    <div className="m-auto p-4">
                        <Label className="flex flex-row items-center gap-1 text-xs font-medium text-[#323C43] leading-5">Project ID <IconInfoCircle className="text-[#177CCA] w-[0.875rem]"/></Label>
                        <div className="flex flex-row gap-4 items-center">
                            <Input disabled className="w-[55%] bg-[#F3F5F6] placeholder-[#4A5863] border-[#CDD4DA] text-sm leading-5 py-0 min-h-max" placeholder={podata.requestNumber ? podata.requestNumber : ""}></Input>
                            <Input disabled className="w-[55%] bg-[#F3F5F6] placeholder-[#4A5863] border-[#CDD4DA] text-sm leading-5 py-0 min-h-max" placeholder={podata.requestor ? podata.requestor : ""}></Input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
