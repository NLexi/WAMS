"use client";

import { ButtonCustom } from "@/components/custom/Button";
import Navbar from "@/components/custom/Navbar";
import { IconArrowBack, IconTruckDelivery, IconX } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { PageTabs } from "../../../components/custom/PageTabs";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const DeliveryDetails = () => {
    const searchParams = useSearchParams();
    const deliveryData = {
        requestNumber: searchParams.get("requestNumber"),
        poNumber: searchParams.get("poNumber"),
        requestor: searchParams.get("requestor"),
        department: searchParams.get("department"),
        requestDate: searchParams.get("requestDate"),
        status: searchParams.get("status"),
    };

    return (
        <div>
            <Navbar username='Eko Widiyanto'/>
            <PageTabs initialTab="request"/>
            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center pb-2 text-black">
                    <h4 className="text-[1.75rem] font-bold font-outfit leading-8">{deliveryData.requestNumber}</h4>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                            <ButtonCustom variant='secondary' icon={<IconArrowBack />} type="link" destination="/delivery">Back to list</ButtonCustom>
                            <ButtonCustom variant='primary' icon={<IconTruckDelivery />} type="link" 
                            destination={`/delivery/createdo?requestNumber=${deliveryData.requestNumber}&poNumber=${deliveryData.poNumber}&requestor=${deliveryData.requestor}&department=${deliveryData.department}&requestDate=${deliveryData.requestDate}`}
                            >Create DO
                            </ButtonCustom>
                        </div>
                    </div>
                </div>

                {/* Information Section */}
                <div className="container mx-auto flex flex-row py-4">
                    <div className="basis-1/4 border-r-2 flex flex-col gap-6 h-[55vh] py-4">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">PO Number</p>
                            <p className="text-base text-[#4A5863]">{deliveryData.poNumber}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">Requestor</p>
                            <p className="text-base text-[#4A5863]">{deliveryData.requestor}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">Department</p>
                            <p className="text-base text-[#4A5863]">{deliveryData.department}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">Request Date</p>
                            <p className="text-base text-[#4A5863]">{deliveryData.requestDate}</p>
                        </div>
                    </div>
                    <div className="basis-3/4">
                        <div className="border-b-2 my-auto p-8">
                            <p className="text-sm text-[#323C43] font-semibold">Status</p>
                            <p className="text-[2rem] font-outfit font-bold py-1 text-[#323C43]">{deliveryData.status}</p>
                            <p className="text-sm text-[#4A5863]">Updated 18 Mei 2024</p>
                        </div>
                        <div className="mt-6 px-8">
                            <h3 className="text-xl font-bold">Items Detail</h3>
                            <div className="mt-4">
                                <Table>
                                    <TableHeader className="border-b-2 border-[#8092A0] text-[#4A5863] font-semibold text-sm">
                                        <TableRow>
                                            <TableHead>Item Name</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Target Warehouse</TableHead>
                                            <TableHead>Target Received</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="border-b-2 border-[#8092A0]">
                                        <TableRow className="text-base text-[#4A5863]">
                                            <TableCell className="text-wrap w-[30%]">3Coptics Juniper OEM QSFP+ LR4 40G DFB CWDM 10km</TableCell>
                                            <TableCell>4 Piece</TableCell>
                                            <TableCell className="text-wrap">JKT Distribution Customer</TableCell>
                                            <TableCell>24 May 2024</TableCell>
                                            <TableCell className="text-right"><Button variant='ghost' className="h-8 w-8 p-0 text-red-600 border-2 border-red-600"><IconX /></Button></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryDetails;
