'use client'

import {
    IconBuildingWarehouse,
    IconCircleCheck,
    IconWallet,
    IconSearch,
} from "@tabler/icons-react";
import Navbar from "../components/Navbars/Navbar";
import { Tab } from "../components/Tabs/Tab";
import { useState } from "react";
import { Table } from "../components/Tables/Table";
import { Field } from "../components/Fields/Field";

export default function Page() {

    const [activeTab, setActiveTab] = useState<string>('requests');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const dummyData = [
        {
            'Request Number': 'REQ001',
            'PO Number': 'PO1001',
            'Requestor': 'Alice Johnson',
            'Department': 'Engineering',
            'Request Date': '2025-01-01',
            'Status': 'Pending',
            'Action': null,
        },
        {
            'Request Number': 'REQ002',
            'PO Number': 'PO1002',
            'Requestor': 'Bob Smith',
            'Department': 'Marketing',
            'Request Date': '2025-01-02',
            'Status': 'Approved',
            'Action': null,
        },
        {
            'Request Number': 'REQ003',
            'PO Number': 'PO1003',
            'Requestor': 'Charlie Brown',
            'Department': 'Finance',
            'Request Date': '2025-01-03',
            'Status': 'Denied',
            'Action': null,
        },
        {
            'Request Number': 'REQ004',
            'PO Number': 'PO1004',
            'Requestor': 'David Williams',
            'Department': 'Sales',
            'Request Date': '2025-01-04',
            'Status': 'Pending',
            'Action': null,
        },
        {
            'Request Number': 'REQ005',
            'PO Number': 'PO1005',
            'Requestor': 'Eva Green',
            'Department': 'HR',
            'Request Date': '2025-01-05',
            'Status': 'Approved',
            'Action': null,
        },
    ];

    return (
        <div>
            <Navbar />
            <div className="border-b border-gray-200 w-full">
                <div className="container mx-auto flex flex-row">
                    <Tab icon={<IconCircleCheck />} isActive={activeTab === 'requests'} onClick={() => handleTabClick('requests')}>Requests</Tab>
                    <Tab icon={<IconWallet />} isActive={activeTab === 'purchase order'} onClick={() => handleTabClick('purchase order')}>Purchase Order</Tab>
                    <Tab icon={<IconBuildingWarehouse />} isActive={activeTab === 'warehouse'} onClick={() => handleTabClick('warehouse')}>Warehouse</Tab>
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <div className="w-[85vw]">
                    <div className="font-outfit font-bold text-3xl m-auto p-2">
                        Delivery Order List
                    </div>
                    <div className="m-auto flex justify-end p-3">
                        <Field icon={<IconSearch />} placeholder='Search PO Number' color='stone-400' />
                    </div>
                    <Table headerItems={['Request Number', 'PO Number', 'Requestor', 'Department', 'Request Date', 'Status', 'Action']} contentData={dummyData}></Table>
                </div>
            </div>
        </div>
    )
}