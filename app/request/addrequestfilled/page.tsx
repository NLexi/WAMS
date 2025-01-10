import { ButtonCustom } from "@/components/custom/Button"
import Navbar from "@/components/custom/Navbar"
import { PageTabs } from "@/components/custom/PageTabs"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"
import { IconArrowRight, IconInfoCircle, IconListSearch, IconPlus } from "@tabler/icons-react"
import { FormDialog } from "@/components/custom/FormDialog"
import { AddRequest, columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { RequestSuccess } from "@/components/custom/RequestSuccess"

async function getData(): Promise<AddRequest[]> {
  return [
    {
      id: "728ed52f",
      itemName: "item name",
      type: "Item",
      amount: 5,
      receivedTarget: "Received Target",
      requestor: "Dede Maulana",
      status: "Pre Order"
    },
    {
      id: "ae7832gf",
      itemName: "item name",
      type: "Service",
      amount: 3,
      receivedTarget: "Received Target",
      requestor: "Alice Johnson",
      status: "Pre Order"
    },
    {
      id: "c94be173",
      itemName: "item name",
      type: "Item",
      amount: 8,
      receivedTarget: "Received Target",
      requestor: "Bob Smith",
      status: "Pre Order"
    },
    {
      id: "c209ab29",
      itemName: "item name",
      type: "Item",
      amount: 11,
      receivedTarget: "Received Target",
      requestor: "David Williams",
      status: "In Stock"
    },
    {
      id: "c209ab30",
      itemName: "item name",
      type: "Service",
      amount: 1,
      receivedTarget: "Received Target",
      requestor: "William Johnson",
      status: "In Stock"
    },
    {
      id: "c209ab31",
      itemName: "item name",
      type: "Service",
      amount: 5,
      receivedTarget: "Received Target",
      requestor: "Sean Black",
      status: "In Stock"
    }
  ]
}

export default async function AddRequestFilled() {
    const data = await getData();

    return (
        <div>
            <Navbar />
            <PageTabs initialTab="request"/>
            <div className="container mx-auto">
                <div className="py-6">
                    <div className="flex justify-start items-center pb-2 text-black">
                        <h1 className="text-[1.75rem] font-bold font-outfit leading-8">Add New Request</h1>
                    </div>
                </div>
                <div className="flex flex-row py-4">
                    <div className="basis-1/4 flex flex-col gap-4 py-4 ">
                        <div className="flex flex-row justify-start items-center gap-4 text-sm">
                            <div className="w-7 h-7 rounded-full bg-[#3199E8] flex items-center justify-center font-semibold text-white">
                                1
                            </div>
                            <div>Input Project ID</div>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-4   text-sm">
                            <div className="w-7 h-7 rounded-full bg-[#3199E8] flex items-center justify-center font-semibold text-white">
                                2
                            </div>
                            <div>Item & Service Request</div>
                        </div>
                    </div>
                    <div className="basis-3/4">
                        <div className="border-b-2 border-[#CDD4DA] m-auto p-4 text-xl font-semibold font-outfit leading-6">
                            <h5>Input Project ID</h5>
                        </div>
                        <div className="m-auto p-4">
                            <Label className="flex flex-row items-center gap-1 text-xs font-medium  text-[#323C43] leading-5">Project ID <IconInfoCircle className="text-[#177CCA] w-[0.875rem]" /></Label>
                            <div className="flex flex-row gap-4">
                                <Input disabled className="w-[55%] bg-[#F3F5F6] placeholder-[#4A5863] text-sm leading-5 border-[#CDD4DA]" placeholder="HTS09005"></Input>
                                <ButtonCustom variant="primary" icon={<IconListSearch />}>Check</ButtonCustom>
                            </div>
                        </div>
                        <div className="m-auto p-4">
                            <div className="flex flex-row justify-start bg-[#D6EAFA] w-[70%] p-4 gap-10 rounded-sm">
                                <div className="flex flex-col items-start justify-center gap-2 text-sm leading-8">
                                    <div>Project Name</div>
                                    <div>Reference No.</div>
                                    <div>Category</div>
                                    <div>Department</div>
                                    <div>Created Date</div>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-2 text-sm font-semibold  leading-8">
                                    <div>Hotspot Mail Ambasador</div>
                                    <div>005/busdev-mkt/bts-wiring-fo/III/2009</div>
                                    <div>HTS</div>
                                    <div>PRO</div>
                                    <div>19-01-2012, 07:35:00 WIB</div>
                                </div>
                            </div>
                        </div>
                        <div className="my-6">
                            <div className="border-b-2 border-[#CDD4DA] flex flex-row justify-between items-center">
                                <h3 className="text-xl font-semibold font-outift leading-6 p-4 text-nowrap">Item  & Service Request</h3>
                                <FormDialog trigger={<Button variant='secondary' className=" text-sm font-medium leading-5 text-[#3199E8] bg-[#F3F5F6] hover:opacity-70"><IconPlus />Add Item/service</Button>}/>
                            </div>
                            <div className="mt-4">
                                <DataTable columns={columns} data={data} />
                            </div>
                        </div>
                        <div className="flex flex-row justify-end mx-auto py-4 border-[#CDD4DA] border-t-2">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-3">
                                    <ButtonCustom variant='tertiary' type="link" destination="/request">Cancel</ButtonCustom>
                                    <RequestSuccess trigger={<ButtonCustom variant='primary' icon={<IconArrowRight />}>Submit Request</ButtonCustom>}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}