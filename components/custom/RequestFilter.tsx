'use client';

import { Button } from "../ui/button";

export function RequestFilter({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}) {
  return (
    <div className="flex flex-row gap-3 items-center justify-start">
      <Button
        onClick={() => onFilterChange('all')}
        className={`border-transparent hover:bg-[#83C1F1] shadow-none ${activeFilter === 'all' ? "bg-[#3199E8] text-white" : "bg-[#F3F5F6] text-[#4A5863]"
          }`}
      >
        All
      </Button>
      <Button
        onClick={() => onFilterChange('items')}
        className={`border-transparent hover:bg-[#83C1F1] shadow-none ${activeFilter === 'items' ? "bg-[#3199E8] text-white" : "bg-[#F3F5F6] text-[#4A5863]"
          }`}
      >
        Items
      </Button>
      <Button
        onClick={() => onFilterChange('services')}
        className={`border-transparent hover:bg-[#83C1F1] shadow-none ${activeFilter === 'services' ? "bg-[#3199E8] text-white" : "bg-[#F3F5F6] text-[#4A5863]"
          }`}
      >
        Services
      </Button>
    </div>
  );
}
