import { ButtonCustom } from "@/components/custom/Button"
import Navbar from "@/components/custom/Navbar"
import { PageTabs } from "@/components/custom/PageTabs"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"
import { IconListSearch } from "@tabler/icons-react"
import { ConfirmationRequest, columns } from "./columns"
import { DataTable } from "./data-table"
import { FormBAST } from "@/components/custom/FormBAST"

async function getData(): Promise<ConfirmationRequest[]> {
  return [
    {
      id: "728ed52f",
      itemName: "item name",
      amount: 5,
      requestor: "Dede Maulana",
      requestDate: "04 May 2024"
    },
    {
      id: "ae7832gf",
      itemName: "item name",
      amount: 3,
      requestor: "Alice Johnson",
      requestDate: "04 May 2024"
    },
    {
      id: "c94be173",
      itemName: "item name",
      amount: 8,
      requestor: "Bob Smith",
      requestDate: "04 May 2024"
    },
    {
      id: "c209ab29",
      itemName: "item name",
      amount: 11,
      requestor: "David Williams",
      requestDate: "04 May 2024"
    },
    {
      id: "c209ab30",
      itemName: "item name",
      amount: 1,
      requestor: "William Johnson",
      requestDate: "04 May 2024"
    },
    {
      id: "c209ab31",
      itemName: "item name",
      amount: 5,
      requestor: "Sean Black",
      requestDate: "04 May 2024"
    }
  ]
}


export default async function ConfirmationRequestFilled() {
    const data = await getData();

    return (
        <div>
            <Navbar username='Eko Widiyanto' />
            <PageTabs initialTab="request" />
            <div className="container mx-auto py-6">
                <div className="flex justify-start items-center pl-[13%] pb-2 text-black">
                    <h1 className="text-[1.75rem] font-bold font-outfit leading-8">Confirmation Request</h1>
                </div>
            </div>
            <div className="container mx-auto px-[10%]">
                <div className="flex flex-col mx-auto p-4">
                    <Label className="flex flex-row items-center gap-1 text-xs font-medium text-[#323C43] leading-5">PO Number</Label>
                    <div className="flex flex-row gap-4 items-center">
                        <Input className="w-[90%] placeholder-[#B3BEC6] text-sm leading-5 py-0 min-h-max" placeholder="Input PO Number"></Input>
                        <ButtonCustom variant="primary" icon={<IconListSearch />} type="link" destination="#">Check</ButtonCustom>
                    </div>
                    <div className="font-semibold text-xl leading-6 font-outfit border-b-2 border-[#CDD4DA] pt-[5%] pb-4">Service Lists on this PO</div>
                    <div className="my-4">
                        <DataTable columns={columns} data={data} />
                    </div>
                    <FormBAST />
                </div>
            </div>
        </div>
    )
}