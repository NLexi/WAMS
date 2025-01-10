"use client";

import { ButtonCustom } from "@/components/custom/Button";
import Navbar from "@/components/custom/Navbar";
import { IconArrowBack } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { PageTabs } from "../../../components/custom/PageTabs";
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";


const createdo = () => {
    const searchParams = useSearchParams();

    const [method, setMethod] = useState("fifo");

    const deliveryData = {
        requestNumber: searchParams.get("requestNumber"),
        poNumber: searchParams.get("poNumber"),
        requestor: searchParams.get("requestor"),
        department: searchParams.get("department"),
        requestDate: searchParams.get("requestDate")
    };

    return (
        <div>
            <Navbar />
            <PageTabs initialTab="request"/>
            <div className="container mx-auto py-6">
                <div className="flex justify-start items-center pb-2 text-black">
                    <h1 className="text-[1.75rem] font-bold font-outfit leading-8">Create New DO</h1>
                </div>

                {/* Information Section */}
                <div className="container mx-auto flex flex-row py-4">
                    <div className="basis-1/4 border-r-2 flex flex-col gap-6 h-[55vh] py-4 ">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">Request Number</p>
                            <p className="text-base text-[#4A5863]">{deliveryData.requestNumber}</p>
                        </div>
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
                        <div className="border-b-2 my-auto px-8 pb-6">
                            <div className="m-auto p-2">
                                <Label className="p-1  font-medium text-xs text-[#323C43] leading-5">Select DO Method</Label>
                                <Select onValueChange={(value) => setMethod(value)}>
                                    <SelectTrigger className="w-[70%] text-gray-500 ">
                                        <SelectValue placeholder="--Select--" />
                                    </SelectTrigger>
                                    <SelectContent className=" text-sm text-[#4A5863]">
                                        <SelectGroup>
                                            <SelectItem value="fifo">Set FIFO</SelectItem>
                                            <SelectItem value="manual">Set Manual</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="m-auto p-2">
                                <Label className="p-1  font-medium text-xs text-[#323C43] leading-5">Select Target Location</Label>
                                <Select>
                                    <SelectTrigger className="w-[70%] text-gray-500 ">
                                        <SelectValue placeholder="--Select--" />
                                    </SelectTrigger>
                                    <SelectContent className=" ">
                                        <SelectGroup>
                                            <SelectItem value="A">Location A</SelectItem>
                                            <SelectItem value="B">Location B</SelectItem>
                                            <SelectItem value="C">Location C</SelectItem>
                                            <SelectItem value="D">Location D</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="mt-6 px-8">
                            <h3 className="text-xl font-bold ">Items Detail</h3>
                            <div className="mt-4">
                                <Table>
                                    <TableHeader className="border-b-2 border-[#8092A0] text-[#4A5863]  font-semibold text-sm">
                                        <TableRow>
                                            <TableHead>Item Name</TableHead>
                                            <TableHead>Item Piece Number</TableHead>
                                            <TableHead>Serial Number</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead className="text-right">Verification</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="border-b-2 border-[#8092A0]">
                                        <TableRow className="text-base text-[#4A5863] ">
                                            <TableCell className="text-wrap w-[30%]">3Coptics Juniper OEM QSFP+ LR4 40G DFB CWDM 10km</TableCell>
                                            <TableCell className="w-[25%]">
                                                {method === "fifo" ? "-" : <Input placeholder="Input Here" className="text-gray-400"></Input>}
                                            </TableCell>
                                            <TableCell className="text-wrap w-[25%]">
                                                {method === "fifo" ? "-" : <Input placeholder="Input Here" className="text-gray-400"></Input>}
                                            </TableCell>
                                            <TableCell>4 Pcs</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end mx-auto p-2">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                            <ButtonCustom variant='secondary' icon={<IconArrowBack />} type="link" destination="/delivery">Back to list</ButtonCustom>
                            <ButtonCustom variant='primary' type="link" destination="/delivery">Submit DO</ButtonCustom>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default createdo;
