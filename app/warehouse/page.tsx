import Navbar from "@/components/custom/Navbar";
import { PageTabs } from "@/components/custom/PageTabs";
import { Warehouse, columns } from "./columns";
import { DataTable } from "./data-table";
import { ButtonCustom } from "@/components/custom/Button";
import { IconPlus } from "@tabler/icons-react";

async function getData(): Promise<Warehouse[]> {
    return [
        {
            id: "728ed52f",
            PO_number: "PO20240524-218-MKT",
            vendor: "MDT Total Solution, PT",
            requestor: "Dede Maulana",
            max_received_date: "23 Oct 2024",
            modified_date: "10 Oct 2024",
            status: "Approved"
        },
        {
            id: "ae7832gf",
            PO_number: "PO20240524-219-SALES",
            vendor: "AFC Dinamika Indonesia, PT",
            requestor: "Alice Johnson",
            max_received_date: "23 Oct 2024",
            modified_date: "10 Oct 2024",
            status: "Approved"
        },
        {
            id: "c94be173",
            PO_number: "PO20240524-220-ENG",
            vendor: "Biro Perjalanan Umum Nusatovel, PT",
            requestor: "Bob Smith",
            max_received_date: "23 Oct 2024",
            modified_date: "10 Oct 2024",
            status: "Open"
        },
        {
            id: "f172cd63",
            PO_number: "PO20240524-221-HR",
            vendor: "Execom",
            requestor: "Charlie Brown",
            max_received_date: "23 Oct 2024",
            modified_date: "10 Oct 2024",
            status: "Open"
        },
        {
            id: "c209ab30",
            PO_number: "PO20240524-112-MKT",
            vendor: "Maestro Jaya Pratama, PT",
            requestor: "William Johnson",
            max_received_date: "23 Oct 2024",
            modified_date: "10 Oct 2024",
            status: "Open"
        },
        {
            id: "c209ab31",
            PO_number: "PO20240524-372-HR",
            vendor: "Elevenia Sinergi Prima Nusantara (ESPN), PT",
            requestor: "Sean Black",
            max_received_date: "23 Oct 2024",
            modified_date: "10 Oct 2024",
            status: "Open"
        }
    ]
}

export default async function WarehousePage() {
    const data = await getData();

    return (
        <div>
            <Navbar username='Eko Widiyanto'/>
            <PageTabs initialTab="warehouse" />
            <div className="container mx-auto py-5">
                <div className="flex justify-between items-center pb-2 text-black">
                    <h4 className="text-[1.75rem] font-bold font-outfit leading-8">Accept PO List</h4>
                    <ButtonCustom variant="primary" icon={<IconPlus />} type="link" destination="/warehouse/newacceptpo">
                        New Accept PO
                    </ButtonCustom>
                </div>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}