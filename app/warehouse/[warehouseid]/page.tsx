"use client";

import { ButtonCustom } from "@/components/custom/Button";
import Navbar from "@/components/custom/Navbar";
import { IconArrowBack, IconTarget } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { PageTabs } from "../../../components/custom/PageTabs";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";

const AcceptPODetails = () => {
    const searchParams = useSearchParams();
    const acceptPOData = {
        poNumber: searchParams.get("poNumber"),
        requestor: searchParams.get("requestor"),
        vendor: searchParams.get("vendor"),
        maxReceiveDate: searchParams.get("maxReceiveDate"),
        modifiedDate: searchParams.get("modifiedDate"),
        status: searchParams.get("status"),
    };

    return (
        <div>
            <Navbar username='Eko Widiyanto' />
            <PageTabs initialTab="warehouse" />
            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center pb-2 text-black">
                    <h4 className="text-[1.75rem] font-bold font-outfit leading-8">Accept PO: {acceptPOData.poNumber}</h4>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                            <ButtonCustom variant='secondary' icon={<IconArrowBack />} type="link" destination="/warehouse">Back to list</ButtonCustom>
                            <ButtonCustom variant='primary' icon={<IconTarget />}
                            >Accept PO
                            </ButtonCustom>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto flex flex-row py-4">
                    <div className="basis-1/4 flex flex-col gap-6 py-4 pr-2">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">PO Number</p>
                            <p className="text-base text-[#4A5863]">{acceptPOData.poNumber}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">Requestor</p>
                            <p className="text-base text-[#4A5863]">{acceptPOData.requestor}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">Department</p>
                            <p className="text-base text-[#4A5863]">Some Department</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">PO Date</p>
                            <p className="text-base text-[#4A5863]">Some Date</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">Max Receive Date</p>
                            <p className="text-base text-[#4A5863]">{acceptPOData.maxReceiveDate}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">Vendor</p>
                            <p className="text-base text-[#4A5863]">{acceptPOData.vendor}</p>
                        </div>
                    </div>
                    <div className="basis-3/4 border-l-2">
                        <div className="border-b-2 my-auto px-8 py-4">
                            <p className="text-sm text-[#323C43] font-semibold">Status</p>
                            <p className="text-[2rem] font-outfit font-bold py-1 text-[#323C43]">{acceptPOData.status}</p>
                            <p className="text-sm text-[#4A5863]">Modified {acceptPOData.modifiedDate}</p>
                        </div>
                        <div className="mt-6 px-8 space-y-2">
                            <h3 className="text-xl font-bold">Items Detail</h3>
                            <div>
                                <Table>
                                    <TableHeader className="border-b-2 border-[#8092A0] text-[#4A5863] font-semibold text-sm">
                                        <TableRow>
                                            <TableHead className="w-[70%]">Item Name</TableHead>
                                            <TableHead>Qty Order</TableHead>
                                            <TableHead>Oty Pending</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="text-base text-[#4A5863]">
                                            <TableCell className="text-wrap w-[30%]">Patchcord SC/UPC – LC/UPC SM-DX-3.0mm 30 m</TableCell>
                                            <TableCell>60 Pcs</TableCell>
                                            <TableCell>60 Pcs</TableCell>
                                        </TableRow>
                                        <TableRow className="text-base text-[#4A5863]">
                                            <TableCell className="text-wrap w-[30%]">Patchcord SC/UPC – LC/UPC SM-DX-3.0mm 20 m</TableCell>
                                            <TableCell>5 Pcs</TableCell>
                                            <TableCell>5 Pcs</TableCell>
                                        </TableRow>
                                        <TableRow className="text-base text-[#4A5863]">
                                            <TableCell className="text-wrap w-[30%]">Patchcord SC/UPC – LC/UPC SM-DX-3.0mm 10 m</TableCell>
                                            <TableCell>30 Pcs</TableCell>
                                            <TableCell>30 Pcs</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                            <h3 className="text-xl font-bold pt-2">Note</h3>
                            <p className="text-sm text-[#4A5863]">Coming from Req-24-05-047-NOC</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcceptPODetails;
