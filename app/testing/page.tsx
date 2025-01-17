import { ButtonRevamp } from "@/components/custom/ButtonRevamp";
import { ConfirmationDialog } from "@/components/custom/ConfirmationModal";
import LogHistory from "@/components/custom/LogHistory";
import Navbar from "@/components/custom/Navbar";
import { PageTabs } from "@/components/custom/PageTabs";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Page() {

    return (
        <div>
            <Navbar username="Eko Widiyanto" />
            <PageTabs initialTab="request" />
            <div className="container flex flex-col m-auto p-4 justify-center items-center gap-4">
                <ConfirmationDialog trigger={<ButtonRevamp variant="secondary" color="green">modal</ButtonRevamp>} />
                <LogHistory />
                <div className="border-2 border-[#CA2B17] bg-[#FADAD6] container flex flex-col m-auto p-5 w-[50%] h-[20%] gap-1">
                    <p className="text-[#CA2B17] font-semibold font-outfit text-xl">Reason</p>
                    <p className="text-[#323C43] text-base">Belum dibutuhkan dalam tahun ini dikarenakan ada prioritas lain</p>
                </div>
                <div className="border-[1px] border-[#8092A0] container flex flex-col m-auto p-5 w-[50%] h-[20%] gap-1">
                    <div className="border-[1px] border-[#8092A0] text-xs rounded-md w-fit px-1 py-0.5">SERVICE</div>
                    <p className="text-[#4A5863] font-semibold font-outfit text-xl">New drop cable FTTH network installation [OTC]</p>
                    <div className="pt-7 flex flex-row gap-[22.5%]">
                        <div className="flex flex-col">
                            <p className="text-[#323C43] font-semibold text-sm">Quantity</p>
                            <p className="text-[#4A5863] text-base">1Pcs</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[#323C43] font-semibold text-sm">Location</p>
                            <p className="text-[#4A5863] text-base">CBN Head Office</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[#323C43] font-semibold text-sm">Target</p>
                            <p className="text-[#4A5863] text-base">29 Nov 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}