import { ButtonCustom } from "@/app/components/Buttons/Button"
import Navbar from "@/app/components/Navbars/Navbar"
import { PageTabs } from "@/app/delivery/page-tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"
import { IconInfoCircle, IconListSearch, IconPlus } from "@tabler/icons-react"
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const addrequestfilled = () => {
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
                        <div className="w-7 h-7 rounded-full bg-[#3199E8] flex items-center justify-center hover:cursor-pointer font-semibold text-white">
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
                        <Label className="flex flex-row items-center gap-1 text-xs font-medium font-inter text-[#323C43] leading-5">Project ID <IconInfoCircle className="text-[#177CCA] w-[0.875rem]" /></Label>
                        <div className="flex flex-row gap-4">
                            <Input disabled className="w-[55%] bg-[#F3F5F6] placeholder-[#4A5863] font-normal text-sm leading-5 border-[#CDD4DA]" placeholder="HTS09005"></Input>
                            <ButtonCustom variant="primary" icon={<IconListSearch />}>Check</ButtonCustom>
                        </div>
                    </div>
                    <div className="m-auto p-4">
                        <div className="flex flex-row justify-start bg-[#D6EAFA] w-[70%] p-4 gap-10 rounded-sm">
                            <div className="flex flex-col items-start justify-center gap-2 text-sm font-normal font-inter leading-8">
                                <div>Project Name</div>
                                <div>Reference No.</div>
                                <div>Category</div>
                                <div>Department</div>
                                <div>Created Date</div>
                            </div>
                            <div className="flex flex-col items-start justify-start gap-2 text-sm font-semibold font-inter leading-8">
                                <div>Hotspot Mail Ambasador</div>
                                <div>005/busdev-mkt/bts-wiring-fo/III/2009</div>
                                <div>HTS</div>
                                <div>PRO</div>
                                <div>19-01-2012, 07:35:00 WIB</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="border-b-2 border-[#CDD4DA] flex flex-row justify-between items-center">
                            <h3 className="text-xl font-semibold font-outift leading-6 p-4">Item  & Service Request</h3>
                            <Button variant='secondary' className="font-inter text-sm font-medium leading-5 text-[#3199E8] bg-[#F3F5F6] hover:opacity-70"><IconPlus/>Add Item/service</Button>
                        </div>
                        <div className="mt-4">
                            <Table>
                                <TableHeader className="border-b-2 border-[#8092A0] text-[#4A5863] font-inter font-semibold text-sm">
                                    <TableRow>
                                        <TableHead>Item Name</TableHead>
                                        <TableHead>Item Piece Number</TableHead>
                                        <TableHead>Serial Number</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead className="text-right">Verification</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="border-b-2 border-[#8092A0]">
                                    <TableRow className="font-normal text-base text-[#4A5863] font-inter">
                                        <TableCell className="text-wrap w-[30%]">3Coptics Juniper OEM QSFP+ LR4 40G DFB CWDM 10km</TableCell>
                                        <TableCell className="w-[25%]">
                                            -
                                        </TableCell>
                                        <TableCell className="text-wrap w-[25%]">
                                            -
                                        </TableCell>
                                        <TableCell>4 Pcs</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default addrequestfilled;