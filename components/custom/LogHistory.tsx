import { IconCircle, IconCircleCheck, IconCircleX, IconClock } from "@tabler/icons-react";
import React from "react";

export default function LogHistory() {

    const logs = [
        {
            description: "Request Item Approval",
            date: null,
            user: "Approver 02",
            status: "open",
        },
        {
            description: "Request Item Approved",
            date: "01 October 2024",
            user: "Approver 01",
            status: "accept",
        },
        {
            description: "Request Item Rejected",
            date: "01 October 2024",
            user: "Approver 00",
            status: "reject",
        },
        {
            description: "Request Item Pending",
            date: "01 October 2024",
            user: "Testing ACC",
            status: "pending",
        },
        {
            description: "Request Item Created",
            date: "01 October 2024",
            user: "Testing ACC",
            status: "accept",
        },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "accept":
                return (
                    <div className="bg-[#115D97] rounded-full w-10 h-10 flex items-center justify-center">
                        <IconCircleCheck className="text-white" />
                    </div>
                );
            case "reject":
                return (
                    <div className="bg-[#CA2B17] rounded-full w-10 h-10 flex items-center justify-center">
                        <IconCircleX className="text-white" />
                    </div>
                );
            case "pending":
                return (
                    <div className="bg-[#F29339] rounded-full w-10 h-10 flex items-center justify-center">
                        <IconClock className="text-white" />
                    </div>
                );
            case "open":
            default:
                return (
                    <div className="bg-[#E5E8EB] rounded-full w-10 h-10 flex items-center justify-center">
                        <IconCircle className="text-[#354052]" />
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <h3 className="text-xl font-bold">Log History</h3>
            <div className="flex flex-row gap-6">
                <div className="flex flex-col justify-center items-center">
                    {logs.map((log, index) => (
                        <React.Fragment key={index}>
                            {getStatusIcon(log.status)}
                            {index < logs.length - 1 && (<div className={`h-10 w-px ${log.status === "open" ? "border-dashed border-[#E5E8EB]" : "border-solid border-[#E5E8EB]"} border-2`}></div>)}
                        </React.Fragment>
                    ))}
                </div>
                <div className="flex flex-col justify-center gap-[26px]">
                    {logs.map((log, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <p className="text-xl font-semibold text-black font-outfit">
                                {log.description}
                            </p>
                            <p className="text-sm text-[#4A5863]">
                                {log.date ? `${log.date} | by ${log.user}` : `by ${log.user}`}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}