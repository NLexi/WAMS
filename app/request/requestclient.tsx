'use client';

import { useState } from "react";
import { DataTable } from "./data-table";
import { DataTableService } from "./data-table-service";
import { Requests, columns } from "./columns";
import { ButtonCustom } from "@/components/custom/Button";
import { IconPlus } from "@tabler/icons-react";
import { RequestFilter } from "@/components/custom/RequestFilter";

export default function RequestClient({ data, data2 }: { data: Requests[], data2: Requests[] }) {
    const [activeFilter, setActiveFilter] = useState<string>('all');

    return (
        <div>
            <div className="flex justify-between items-center pb-2 text-black">
                <h4 className="text-[1.75rem] font-bold font-outfit leading-8">Request List</h4>
                <ButtonCustom variant="primary" icon={<IconPlus />} type="link" destination="/request/addrequest">
                    Add New Request
                </ButtonCustom>
            </div>
            <div className="flex flex-row gap-4 pb-4 items-center justify-start">
                <p>Category by:</p>
                <RequestFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            </div>
            {(activeFilter === 'all' || activeFilter === 'items') && (
                <DataTable columns={columns} data={data} />
            )}
            {(activeFilter === 'all' || activeFilter === 'services') && (
                <DataTableService columns={columns} data={data2} />
            )}
        </div>
    );
}
