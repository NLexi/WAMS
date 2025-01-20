import Navbar from "@/components/custom/Navbar"
import { IconCircleX } from "@tabler/icons-react"

export default function ApprovalReject() {

    return (
        <div>
            <Navbar />
            <div className="flex flex-col py-[5%] px-[25%] items-center">
                <p className="font-bold text-[32px] text-[#323C43] font-outfit">Thankyou for your Action</p>
                <div className="flex flex-row gap-2 justify-center items-center">
                    <div className="flex bg-[#FADAD6] rounded-full w-10 h-10 justify-center items-center"><IconCircleX className="text-[#CA2B17]" /></div>
                    <p className="text-base">RQ2305000082-I have been approved</p>
                </div>
                <div className="border-2 border-[#CA2B17] bg-[#FADAD6] container flex flex-col m-auto p-5 w-[80%] h-[20%] gap-1 mt-14">
                    <p className="text-[#CA2B17] font-semibold font-outfit text-xl">Reason</p>
                    <p className="text-[#323C43] text-base">Belum dibutuhkan dalam tahun ini dikarenakan ada prioritas lain</p>
                </div>
                <div className="border-[1px] border-[#8092A0] container flex flex-col m-auto p-5 w-[80%] h-[20%] gap-1 mt-3">
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