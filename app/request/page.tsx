import { Requests } from "./columns"
import Navbar from "@/components/custom/Navbar"
import { PageTabs } from "../../components/custom/PageTabs"
import RequestClient from "./requestclient"

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

async function getData2(): Promise<Requests[]> {
  return []
}

export default async function RequestPage() {
  const data = await getData()
  const data2 = await getData2()

  return (
    <div>
      <Navbar username='Eko Widiyanto'/>
      <PageTabs initialTab="request"/>
      <div className="container mx-auto py-5">
        <RequestClient data={data} data2={data2}/>
      </div>
    </div>
  )
}
