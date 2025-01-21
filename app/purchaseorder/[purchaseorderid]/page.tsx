"use client";

import { ButtonCustom } from "@/components/custom/Button";
import Navbar from "@/components/custom/Navbar";
import { IconArrowBack, IconBallpen, IconChevronDown, IconCircleX, IconDownload, IconEdit, IconX } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { PageTabs } from "../../../components/custom/PageTabs";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { POReject } from "@/components/custom/POReject";
import { PORequestSuccess } from "@/components/custom/PORequestSuccess";
import { useSnackbar } from "@/components/custom/Snackbar";

const PurchaseOrderDetails = () => {
    const searchParams = useSearchParams();
    const purchaseOrderData = {
        poNumber: searchParams.get("poNumber"),
        requestor: searchParams.get("requestor"),
        vendor: searchParams.get("vendor"),
        createdAt: searchParams.get("createdAt"),
        totalAmount: searchParams.get("totalAmount"),
        status: searchParams.get("status"),
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    const router = useRouter();
    const showSnackbar = useSnackbar();
    const subTotal = 2880000;
    const discount = 0;
    const vat = subTotal * 11 / 100;
    const shipping = 0;
    const totalAmount = subTotal - discount + vat + shipping;

    const handleClick = (variant: 'success' | 'error' | 'default' | 'info', message: string, subMessage: string) => {
        showSnackbar(message, variant, subMessage);
    };

    return (
        <div>
            <Navbar username='Eko Widiyanto' />
            <PageTabs initialTab="purchaseorder" />
            <div className="container mx-auto">
                <div className="py-6">
                    <div className="flex justify-between items-center pb-2 text-black">
                        <div className="flex flex-row gap-4">
                            <h1 className="text-[1.75rem] font-bold font-outfit leading-8">{purchaseOrderData.poNumber}</h1>
                            <Button variant='outline' className="w-8 h-8 rounded-sm border-[#3199E8] border-2 text-[#3199E8] hover:bg-[#D6EAFA] hover:text-[#3199E8]" onClick={() => handleClick('success', purchaseOrderData.poNumber ?? "", 'Successfully downloaded')}><IconDownload /></Button>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="bg-[#3199E8] text-white hover:bg-[#83C1F1] active:bg-blue-600 focus-visible:outline-slate-500 flex h-10 items-center justify-center rounded-md px-4 font-medium text-sm transition-colors">
                                    More Action<IconChevronDown className="w-4 h-4" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="text-sm">
                                <DropdownMenuItem onClick={() => router.push('/purchaseorder')}>
                                    <IconArrowBack />
                                    Back to List
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push(`/purchaseorder/editpo?poNumber=${purchaseOrderData.poNumber}`)}>
                                    <IconEdit />
                                    Edit PO
                                </DropdownMenuItem>
                                <PORequestSuccess trigger={
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <IconBallpen />
                                        Request for Approval
                                    </DropdownMenuItem>
                                } />
                                <POReject trigger={
                                    <DropdownMenuItem className="text-[#CA2B17]" onSelect={(e) => e.preventDefault()}>
                                        <IconCircleX />
                                        Reject PO
                                    </DropdownMenuItem>}
                                    poNumber={purchaseOrderData.poNumber ?? ""} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="container mx-auto flex flex-row">
                    <div className="basis-1/4 border-r-2 flex flex-col gap-6 h-[75vh] py-4 pr-2">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">PO Number</p>
                            <p className="text-base text-[#4A5863]">{purchaseOrderData.poNumber}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">Requestor</p>
                            <p className="text-base text-[#4A5863]">{purchaseOrderData.requestor}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">Vendor</p>
                            <p className="text-base text-[#4A5863]">{purchaseOrderData.vendor}</p>
                            <p className="text-base text-[#4A5863]">Sedayu Square Jl. Kamal Raya Outer Ring Road Blok L 35 Cengkareng, Jakarta Barat - 11730</p>
                            <p className="text-base text-[#4A5863]">(021) 58357085</p>
                            <p className="text-base text-[#4A5863]">example@email.co.id</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-[#323C43]">File attachment</p>
                            <p className="text-base text-[#4A5863]">Some File</p>
                        </div>
                    </div>
                    <div className="basis-3/4">
                        <div className="border-b-2 my-auto pb-6 pt-4 px-8">
                            <p className="text-sm text-[#323C43] font-semibold">Status</p>
                            <p className="text-[2rem] font-outfit font-bold py-1 text-[#323C43]">{purchaseOrderData.status}</p>
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
                                            <TableHead>Unit Price</TableHead>
                                            <TableHead>Unit Discount</TableHead>
                                            <TableHead className="text-right">Net Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="border-b border-[#8092A0]">
                                        <TableRow className="text-base text-[#4A5863]">
                                            <TableCell className="text-wrap w-[30%]">3Coptics Juniper OEM QSFP+ LR4 40G DFB CWDM 10km</TableCell>
                                            <TableCell>1 Pcs</TableCell>
                                            <TableCell className="text-wrap">{formatCurrency(subTotal)}</TableCell>
                                            <TableCell>0</TableCell>
                                            <TableCell className="text-right">{formatCurrency(subTotal)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="container flex flex-row justify-end items-end py-8 text-base text-[#4A5863]">
                                <div className="flex flex-col border border-[#8092A0] rounded-sm p-4">
                                    <div className="flex flex-row justify-between gap-[12vw]">
                                        <div className="flex flex-col items-start gap-2">
                                            <p>Subtotal</p>
                                            <p>Discount</p>
                                            <p>VAT 11%</p>
                                            <p>Shipping & Handling</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <p>{formatCurrency(subTotal)}</p>
                                            <p>{formatCurrency(discount)}</p>
                                            <p>{formatCurrency(vat)}</p>
                                            <p>{formatCurrency(shipping)}</p>
                                        </div>
                                    </div>
                                    <div className="border-t border-[#8092A0] my-2"></div>
                                    <div className="flex flex-row justify-between gap-[15vw]">
                                        <div className="flex flex-col items-start">
                                            <p>Total Amount</p>
                                        </div>
                                        <div className="flex flex-col items-end font-semibold text-base text-black">
                                            <p>{formatCurrency(totalAmount)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PurchaseOrderDetails;
