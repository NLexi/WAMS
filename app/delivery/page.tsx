import { Delivery, columns } from "./columns"
import { DataTable } from "./data-table"
import Navbar from "@/components/custom/Navbar"
import { PageTabs } from "../../components/custom/PageTabs"

async function getData(): Promise<Delivery[]> {
  return [
    {
      id: "728ed52f",
      request_number: "RQ2405000270-I",
      PO_number: "PO20240524-218-MKT",
      requestor: "Dede Maulana",
      department: "Marketing",
      request_date: "24 - May - 2024",
      status: "Approve"
    },
    {
      id: "ae7832gf",
      request_number: "RQ2405000271-II",
      PO_number: "PO20240524-219-SALES",
      requestor: "Alice Johnson",
      department: "Sales",
      request_date: "25 - May - 2024",
      status: "On PO"
    },
    {
      id: "c94be173",
      request_number: "RQ2405000272-III",
      PO_number: "PO20240524-220-ENG",
      requestor: "Bob Smith",
      department: "Engineering",
      request_date: "26 - May - 2024",
      status: "Complete PO"
    },
    {
      id: "f172cd63",
      request_number: "RQ2405000273-IV",
      PO_number: "PO20240524-221-HR",
      requestor: "Charlie Brown",
      department: "Human Resources",
      request_date: "27 - May - 2024",
      status: "On Warehouse"
    },
    {
      id: "c209ab29",
      request_number: "RQ2405000274-V",
      PO_number: "PO20240524-222-MKT",
      requestor: "David Williams",
      department: "Marketing",
      request_date: "28 - May - 2024",
      status: "Approve"
    },
    {
      id: "c209ab30",
      request_number: "RQ2405000275-VI",
      PO_number: "PO20240524-112-MKT",
      requestor: "William Johnson",
      department: "Marketing",
      request_date: "28 - May - 2024",
      status: "Approve"
    },
    {
      id: "c209ab31",
      request_number: "RQ2405000276-VII",
      PO_number: "PO20240524-372-HR",
      requestor: "Sean Black",
      department: "Human Resources",
      request_date: "29 - May - 2024",
      status: "On PO"
    },
    {
      id: "a2039c12",
      request_number: "RQ2405000277-VIII",
      PO_number: "PO20240524-242-HR",
      requestor: "Chris Lee",
      department: "Human Resources",
      request_date: "29 - May - 2024",
      status: "On Warehouse"
    },
    {
      id: "ae783i9a",
      request_number: "RQ2405000278-IX",
      PO_number: "PO20240524-271-SALES",
      requestor: "Alice Jones",
      department: "Sales",
      request_date: "30 - May - 2024",
      status: "Approve"
    },
    {
      id: "ae783x4g",
      request_number: "RQ2405000279-X",
      PO_number: "PO20240524-900-MKT",
      requestor: "Jonathan Setiawan",
      department: "Marketing",
      request_date: "30 - May - 2024",
      status: "Approve"
    },
    {
      id: "akasuwd9",
      request_number: "RQ2405000280-XI",
      PO_number: "PO20240524-764-MKT",
      requestor: "Amin Sharif",
      department: "Marketing",
      request_date: "30 - May - 2024",
      status: "On PO"
    }
  ]
}

export default async function DeliveryPage() {
  const data = await getData()

  return (
    <div>
      <Navbar username='Eko Widiyanto'/>
      <PageTabs initialTab="request" />
      <div className="container mx-auto py-5">
        <h4 className="font-outfit font-bold text-[1.75rem] mx-auto px-2">
          Delivery Order List
        </h4>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
