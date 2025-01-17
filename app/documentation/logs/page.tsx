import { ButtonCustom } from "@/components/custom/Button"
import LogHistory from "@/components/custom/LogHistory";
import { IconArrowBack } from "@tabler/icons-react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function LogHistoryDocumentation() {

    const codestring = `
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
        <div>
            <h3 className="text-xl font-bold pb-8">Log History</h3>
            <div className="flex flex-row gap-6">
                <div className="flex flex-col justify-center items-center">
                    {logs.map((log, index) => (
                        <React.Fragment key={index}>
                            {getStatusIcon(log.status)}
                            {index < logs.length - 1 && (<div className={\`h-10 w-px \${log.status === "open" ? "border-dashed border-[#E5E8EB]" : "border-solid border-[#E5E8EB]"} border-2\`}></div>)}
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
                                {log.date ? \`\${log.date} | by \${log.user}\` : \`by \${log.user}\`}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
    `

    return (
        <div className="w-full mx-auto py-12 p-4">
            <div className="flex justify-between items-center pb-2 text-black">
                <h4 className="text-[1.75rem] font-bold font-outfit leading-8">Log History Documentation</h4>
                <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                        <ButtonCustom variant='secondary' icon={<IconArrowBack />} type="link" destination="/documentation">Back to component list</ButtonCustom>
                    </div>
                </div>
            </div>
            <div className="flex py-4">
                <div className="basis-1/4 border-r-2 flex flex-col gap-6 h-[55vh] py-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Description</p>
                        <p className="text-base text-[#4A5863]">request item state</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Date</p>
                        <p className="text-base text-[#4A5863]">date or null value</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Status</p>
                        <p className="text-base text-[#4A5863]">open | accept | reject | pending             </p>
                    </div>
                </div>
                <div className="basis-3/4">
                    <div className="my-auto px-8 py-4">
                        <p className="text-base text-[#323C43] font-semibold font-outfit">Component Code</p>
                        <SyntaxHighlighter
                            language="javascript"
                            style={dracula}
                            wrapLongLines
                            customStyle={{ padding: '8px', borderRadius: '8px', maxWidth: '50rem', maxHeight: '23rem' }}
                        >
                            {codestring}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 py-2 bg-slate-50 rounded-md shadow items-center justify-center">
                <p className="font-bold font-outfit text-2xl text-[#323C43]">Demo: </p>
                <LogHistory/>
            </div>
        </div>
    )
};