'use client'

import { Tab } from "@/components/custom/Tab"
import { IconCircleCheck, IconWallet, IconBuildingWarehouse } from "@tabler/icons-react"
import { useState } from "react";
import { useRouter } from "next/navigation";

type PageTabsProps = {
    initialTab: "request" | "purchaseorder" | "warehouse"
}

export function PageTabs({ initialTab }: PageTabsProps) {

    const [activeTab, setActiveTab] = useState<string>(`${initialTab}`);
    const router = useRouter();

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        router.push(`/${tab}`);
    };

    return (
        <div className="border-b border-[#CDD4DA] w-full">
            <div className="mx-auto flex flex-row px-2">
                <Tab icon={<IconCircleCheck />} isActive={activeTab === 'request'} onClick={() => handleTabClick('request')}>Requests</Tab>
                <Tab icon={<IconWallet />} isActive={activeTab === 'purchaseorder'} onClick={() => handleTabClick('purchaseorder')}>Purchase Order</Tab>
                <Tab icon={<IconBuildingWarehouse />} isActive={activeTab === 'warehouse'} onClick={() => handleTabClick('warehouse')}>Warehouse</Tab>
            </div>
        </div>
    )
}