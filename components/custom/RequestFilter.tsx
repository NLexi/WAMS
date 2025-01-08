'use client'

import { Button } from "../ui/button";
import { useState } from "react";

export function RequestFilter() {

    const [activeFilter, setActiveFilter] = useState<string>('all');

    const handleFilterClick = (tab: string) => {
        setActiveFilter(tab);
    };

    return (
        <div className="flex flex-row gap-3 items-center justify-start">
            <Button onClick={() => handleFilterClick('all')} className={`border-transparent hover:bg-[#83C1F1] ${activeFilter === 'all' ? "bg-[#3199E8] text-white" : "bg-[#F3F5F6] text-[#4A5863]"}`}>All</Button>
            <Button onClick={() => handleFilterClick('items')} className={`border-transparent  hover:bg-[#83C1F1] ${activeFilter === 'items' ? "bg-[#3199E8] text-white" : "bg-[#F3F5F6] text-[#4A5863]"}`}>Items</Button>
            <Button onClick={() => handleFilterClick('services')} className={`border-transparent hover:bg-[#83C1F1] ${activeFilter === 'services' ? "bg-[#3199E8] text-white" : "bg-[#F3F5F6] text-[#4A5863]"}`}>Services</Button>
        </div>
    )
}