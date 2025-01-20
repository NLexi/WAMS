"use client";

import { ButtonCustom } from "@/components/custom/Button";
import Navbar from "@/components/custom/Navbar";
import { IconCircleCheck, IconCircleMinus, IconDownload, IconFile } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useSnackbar } from "@/components/custom/Snackbar";
import LogHistory from "@/components/custom/LogHistory";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const RequestApproval = () => {
    const searchParams = useSearchParams();
    const purchaseOrderData = {
        poNumber: searchParams.get("poNumber"),
        requestor: searchParams.get("requestor"),
        vendor: searchParams.get("vendor"),
        createdAt: searchParams.get("createdAt"),
        totalAmount: searchParams.get("totalAmount"),
        status: searchParams.get("status"),
    };

    const router = useRouter();
    const showSnackbar = useSnackbar();

    const handleClick = (variant: 'success' | 'error' | 'default' | 'info', message: string, subMessage: string) => {
        showSnackbar(message, variant, subMessage);
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-10">
                <div className="py-6">
                    <div className="flex justify-between items-center pb-2 text-black">
                        <div className="flex flex-row gap-4">
                            <h1 className="text-[1.75rem] font-bold font-outfit leading-8">RQ2305000082-I</h1>
                            <Button variant='outline' className="w-8 h-8 rounded-sm border-[#3199E8] border-2 text-[#3199E8] hover:bg-[#D6EAFA] hover:text-[#3199E8]" onClick={() => handleClick('success', "RQ2305000082-I", 'Successfully downloaded')}><IconDownload /></Button>
                        </div>
                        <div className="flex flex-row justify-between gap-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <ButtonCustom variant="primary" color="red" icon={<IconCircleMinus />}>Reject</ButtonCustom>
                                </DialogTrigger>
                                <DialogContent className='flex flex-col m-auto items-center'>
                                    <DialogHeader className="flex m-auto items-center pt-[5%]">
                                        <DialogTitle className="font-semibold font-outfit text-xl leading-6">Reject this PO</DialogTitle>
                                        <DialogDescription className="text-xs">
                                            Affected Request Number RQ2305000082-I
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="w-[90%] mt-2">
                                        <p className="font-medium text-xs leading-5 text-[#323C43] p-1">Reason</p>
                                        <Textarea id='reason' placeholder="Give a reason to reject this request" className="resize-none text-xs text-[#4A5863] placeholder-[#4A5863] rounded-sm" />
                                    </div>
                                    <DialogFooter>
                                        <DialogClose type="submit" asChild>
                                            <ButtonCustom variant='primary' color="red" type="link" destination="/approval/reject">                   Submit Reject                   </ButtonCustom>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <ButtonCustom variant="primary" color="green" icon={<IconCircleCheck />} type="link" destination="/approval/approve">Approve</ButtonCustom>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto flex flex-row">
                    <div className="basis-1/4 flex flex-col gap-6 py-4 pr-2">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">Project ID</p>
                            <p className="text-base text-[#4A5863]">HTS09005</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">Project Name</p>
                            <p className="text-base text-[#4A5863]">Hotspot Mall Ambasador</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">Reference Number</p>
                            <p className="text-base text-[#4A5863]">005/busdev-mkt/bts-wiring-fo/III/2009</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">Category</p>
                            <p className="text-base text-[#4A5863]">HTS</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">Department</p>
                            <p className="text-base text-[#4A5863]">PRO</p>
                        </div>
                    </div>
                    <div className="basis-3/4 border-l-2">
                        <div className="border-b-2 my-auto pb-6 pt-4 px-8">
                            <p className="text-sm text-[#323C43] font-semibold">Status</p>
                            <p className="text-[2rem] font-outfit font-bold py-1 text-[#323C43]">Pending Approval</p>
                            <p className="text-sm text-[#4A5863]">Updated 20 November 2024</p>
                        </div>
                        <div className="mt-6 px-8 border-b-2">
                            <h3 className="text-xl font-bold">Items Request Detail</h3>
                            <div className="mt-4">
                                <Table>
                                    <TableHeader className="border-b-2 border-[#8092A0] text-[#4A5863] font-semibold text-sm">
                                        <TableRow>
                                            <TableHead >Item Name</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Target Location</TableHead>
                                            <TableHead className="text-right">Receive Target</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="border-b border-[#8092A0]">
                                        <TableRow className="text-base text-[#4A5863]">
                                            <TableCell className="text-wrap w-[40%]">New drop cable FTTH network installation [OTC]</TableCell>
                                            <TableCell>1 Pcs</TableCell>
                                            <TableCell>Service</TableCell>
                                            <TableCell>CBN Head Office</TableCell>
                                            <TableCell className="text-right">29 Nov 2024</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="flex flex-row gap-[40%]">
                                <div className="flex flex-col gap-4 py-8">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-semibold text-[#323C43]">Requestor</p>
                                        <p className="text-base text-[#4A5863]">Testing ACC</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-semibold text-[#323C43]">Notes</p>
                                        <p className="text-base text-[#4A5863]">fox jumps over the lazy dog</p>
                                    </div>
                                </div>
                                <div className="p-4 py-8">
                                    <p className="text-sm font-semibold text-[#323C43]">File attachment</p>
                                    <div className="flex flex-row border-b-2 gap-2 items-center border-[#E5E8EB] p-2.5 hover:bg-white hover:cursor-default">
                                        <IconFile className="text-[#3199E8]" size={24} />
                                        <span className="text-[#3199E8] text-md font-normal">image_cable_existing.png</span>
                                    </div>
                                    <div className="flex flex-row border-b-2 gap-2 items-center border-[#E5E8EB] p-2.5 hover:bg-white hover:cursor-default">
                                        <IconFile className="text-[#3199E8]" size={24} />
                                        <span className="text-[#3199E8] text-md font-normal">image_location.png</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 px-8">
                            <LogHistory />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default RequestApproval;
