import Navbar from "@/components/custom/Navbar";
import { PageTabs } from "@/components/custom/PageTabs";
import { PurchaseOrder, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<PurchaseOrder[]> {
    return [
        {
            id: "728ed52f",
            PO_number: "PO20240524-218-MKT",
            vendor: "MDT Total Solution, PT",
            requestor: "Dede Maulana",
            created_at: "23 Oct 2024",
            total_amount: 34000000,
            status: "Approved"
        },
        {
            id: "ae7832gf",
            PO_number: "PO20240524-219-SALES",
            vendor: "AFC Dinamika Indonesia, PT",
            requestor: "Alice Johnson",
            created_at: "23 Oct 2024",
            total_amount: 11200000,
            status: "Approved"
        },
        {
            id: "c94be173",
            PO_number: "PO20240524-220-ENG",
            vendor: "Biro Perjalanan Umum Nusatovel, PT",
            requestor: "Bob Smith",
            created_at: "23 Oct 2024",
            total_amount: 199000000,
            status: "On Vendor"
        },
        {
            id: "f172cd63",
            PO_number: "PO20240524-221-HR",
            vendor: "Execom",
            requestor: "Charlie Brown",
            created_at: "23 Oct 2024",
            total_amount: 8000000,
            status: "Need Approval"
        },
        {
            id: "c209ab30",
            PO_number: "PO20240524-112-MKT",
            vendor: "Maestro Jaya Pratama, PT",
            requestor: "William Johnson",
            created_at: "23 Oct 2024",
            total_amount: 35600000,
            status: "On Vendor"
        },
        {
            id: "c209ab31",
            PO_number: "PO20240524-372-HR",
            vendor: "Elevenia Sinergi Prima Nusantara (ESPN), PT",
            requestor: "Sean Black",
            created_at: "23 Oct 2024",
            total_amount: 28000000,
            status: "Need Approval"
        }
    ]
}

export default async function PurchaseOrderPage() {
    const data = await getData();

    return (
        <div>
            <Navbar username='Eko Widiyanto'/>
            <PageTabs initialTab="purchaseorder" />
            <div className="container mx-auto py-5">
                <div className="flex justify-between items-center pb-2 text-black">
                    <h4 className="text-[1.75rem] font-bold font-outfit leading-8">Purchase Order Lists</h4>
                </div>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}