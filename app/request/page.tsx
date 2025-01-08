import { Requests, columns } from "./columns"
import { DataTable } from "./data-table"
import Navbar from "@/components/custom/Navbar"
import { PageTabs } from "../../components/custom/PageTabs"
import { ButtonCustom } from "@/components/custom/Button"
import { IconPlus } from "@tabler/icons-react"
import { RequestFilter } from "@/components/custom/RequestFilter"

async function getData(): Promise<Requests[]> {
  return [
    {
      id: "728ed52f",
      request_number: "RQ2405000270-I",
      itemName: "Dell PowerEdge M600",
      qty: 1,
      requestor: "Testing Acc",
      location: "ESS Lt 4 Hall CBN Surabaya",
      targetReceived: "23 Oct 2024",
      status: "OPEN"
    },
    {
      id: "ae7832gf",
      request_number: "RQ2405000271-II",
      itemName: "Dell PowerEdge M600",
      qty: 1,
      requestor: "Testing Acc2",
      location: "ESS Lt 4 Hall CBN Surabaya",
      targetReceived: "23 Oct 2024",
      status: "OPEN"
    },
    {
      id: "c94be173",
      request_number: "RQ2405000272-III",
      itemName: "Dell PowerEdge M600",
      qty: 1,
      requestor: "Testing Acc",
      location: "ESS Lt 4 Hall CBN Surabaya",
      targetReceived: "23 Oct 2024",
      status: "OPEN"
    },
    {
      id: "f172cd63",
      request_number: "RQ2405000273-IV",
      itemName: "Dell PowerEdge M600",
      qty: 1,
      requestor: "Testing Acc2",
      location: "ESS Lt 4 Hall CBN Surabaya",
      targetReceived: "23 Oct 2024",
      status: "OPEN"
    },
    {
      id: "c209ab29",
      request_number: "RQ2405000274-V",
      itemName: "Dell PowerEdge M600",
      qty: 1,
      requestor: "Testing Acc",
      location: "ESS Lt 4 Hall CBN Surabaya",
      targetReceived: "23 Oct 2024",
      status: "OPEN"
    },
    {
      id: "c209ab30",
      request_number: "RQ2405000275-VI",
      itemName: "Dell PowerEdge M600",
      qty: 1,
      requestor: "Testing Acc2",
      location: "ESS Lt 4 Hall CBN Surabaya",
      targetReceived: "23 Oct 2024",
      status: "OPEN"
    },
    {
      id: "c209ab31",
      request_number: "RQ2405000276-VII",
      itemName: "Dell PowerEdge M600",
      qty: 1,
      requestor: "Testing Acc",
      location: "ESS Lt 4 Hall CBN Surabaya",
      targetReceived: "23 Oct 2024",
      status: "OPEN"
    },
    {
      id: "a2039c12",
      request_number: "RQ2405000277-VIII",
      itemName: "Dell PowerEdge M600",
      qty: 1,
      requestor: "Testing Acc2",
      location: "ESS Lt 4 Hall CBN Surabaya",
      targetReceived: "23 Oct 2024",
      status: "OPEN"
    },
    {
      id: "ae783i9a",
      request_number: "RQ2405000278-IX",
      itemName: "Dell PowerEdge M600",
      qty: 1,
      requestor: "Testing Acc",
      location: "ESS Lt 4 Hall CBN Surabaya",
      targetReceived: "23 Oct 2024",
      status: "OPEN"
    },
    {
      id: "ae783x4g",
      request_number: "RQ2405000279-X",
      itemName: "Dell PowerEdge M600",
      qty: 1,
      requestor: "Testing Acc2",
      location: "ESS Lt 4 Hall CBN Surabaya",
      targetReceived: "23 Oct 2024",
      status: "OPEN"
    },
    {
      id: "akasuwd9",
      request_number: "RQ2405000280-XI",
      itemName: "Dell PowerEdge M600",
      qty: 1,
      requestor: "Testing Acc",
      location: "ESS Lt 4 Hall CBN Surabaya",
      targetReceived: "23 Oct 2024",
      status: "OPEN"
    }
  ]
}

export default async function RequestPage() {
  const data = await getData()

  return (
    <div>
      <Navbar />
      <PageTabs />
      <div className="container mx-auto py-5">
        <div className="flex justify-between items-center pb-2 text-black">
          <h4 className="text-[1.75rem] font-bold font-outfit leading-8">Request List</h4>
          <ButtonCustom variant='primary' icon={<IconPlus />} type="link" destination='/request/addrequest'>Add New Request</ButtonCustom>
        </div>
        <div className="flex flex-row gap-4 pb-4 items-center justify-start">
          <p>Category by:</p>
          <RequestFilter />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
