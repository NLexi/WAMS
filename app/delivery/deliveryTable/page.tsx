import { Delivery, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Delivery[]> {
  return [
    {
        id: "728ed52f",
        request_number: "RQ2405000270-I",
        PO_number: "PO20240524-218-MKT",
        requestor: "Dede Maulana",
        department: "General Affair & Asset Management",
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
      }
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
