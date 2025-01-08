'use client'

import { Tab } from "@/components/custom/Tab"
import { IconCircleCheck, IconWallet, IconBuildingWarehouse } from "@tabler/icons-react"
import { useState } from "react";

export function PageTabs() {

    const [activeTab, setActiveTab] = useState<string>('requests');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="border-b border-gray-200 w-full">
            <div className="mx-auto flex flex-row px-2">
                <Tab icon={<IconCircleCheck />} isActive={activeTab === 'requests'} onClick={() => handleTabClick('requests')}>Requests</Tab>
                <Tab icon={<IconWallet />} isActive={activeTab === 'purchase order'} onClick={() => handleTabClick('purchase order')}>Purchase Order</Tab>
                <Tab icon={<IconBuildingWarehouse />} isActive={activeTab === 'warehouse'} onClick={() => handleTabClick('warehouse')}>Warehouse</Tab>          
            </div>
        </div>
    )
}