'use client'

import { FormNormal } from "@/components/custom/FormNormal"
import Navbar from "@/components/custom/Navbar"
import { PageTabs } from "@/components/custom/PageTabs"
import { useSearchParams } from "next/navigation"

export default function CreatePOPage() {

    const searchparams = useSearchParams();

    const podata = {
        poNumber: searchparams.get('poNumber')
    }

    return (
        <div>
            <Navbar username='Eko Widiyanto'/>
            <PageTabs initialTab="purchaseorder"/>
            <div className="container mx-auto py-6">
                <div className="flex justify-start items-center pb-2 text-black">
                    <h1 className="text-[1.75rem] font-bold font-outfit leading-8">Edit: {podata.poNumber}</h1>
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
                    <FormNormal type="Update"/>
                </div>
            </div>
        </div>
    )
}
