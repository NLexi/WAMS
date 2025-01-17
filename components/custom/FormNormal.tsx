'use client'

import { ButtonCustom } from "@/components/custom/Button"
import { Input } from "@/components/ui/input"
import { IconArrowRight, IconCalendar, IconFile, IconFileUpload, IconInfoCircle } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    FileInput,
    FileUploader,
    FileUploaderContent,
    FileUploaderItem
} from "@/components/custom/FileUpload"
import { useForm } from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import { z } from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    format
} from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

const formSchema = z.object({
    request_code: z.string().optional(),
    requestor: z.string().optional(),
    po_number: z.string().optional(),
    previous_po_number: z.string({ message: "Please input a PO number" }),
    invoice_address: z.string({ message: "Please select an address" }),
    budget: z.coerce.number({message: "Please input a budget"}).nonnegative(),
    unit: z.string({ message: "Please select a unit" }),
    vendor: z.string({ message: "Please add a vendor" }),
    sales_officer: z.string({ message: "Please select which officer" }),
    max_delivery_date: z.coerce.date({ message: "Please add delivery date" }),
    file_upload: z.array(
        z.custom<File>((file) => {
            const isValidType = ["image/jpeg", "image.jpg", "image/png", "application/pdf", "image/svg+xml"].includes(file.type);
            if (!isValidType) {
                throw new Error("Unsupported file type. Allowed types: JPEG, JPG, PNG, PDF, SVG");
            }
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                throw new Error("File size exceeds 5MB.");
            }

            return true;
        })
    )
        .max(5, { message: "You can upload up to 5 files" })
        .nonempty({ message: "Please upload at least one file" }),
});

type FormNormalProps = {
    type: string
}

export function FormNormal({type}: FormNormalProps) {

    const [files, setFiles] = useState<File[] | null>(null);

    const dropZoneConfig = {
        maxFiles: 5,
        maxSize: 1024 * 1024 * 4,
        multiple: true,
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-auto flex-col gap-4">

                <div className="font-semibold text-xl leading-6 font-outfit border-b-2 border-[#CDD4DA] pb-4">General Information</div>
                <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-8">

                        <FormField
                            control={form.control}
                            name="request_code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Request Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled
                                            defaultValue={field.value ?? "RQ2305000082-I"}
                                            {...field}
                                            className={`bg-[#F3F5F6] ${form.formState.errors.request_code ? "border-[#CA2B17] focus-visible:ring-[#CA2B17]" : "border-[#CDD4DA]"}`}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-4">

                        <FormField
                            control={form.control}
                            name="requestor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Requestor</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled
                                            defaultValue={field.value ?? 'Testing ACC'}
                                            {...field}
                                            className={`bg-[#F3F5F6] ${form.formState.errors.requestor ? "border-[#CA2B17] focus-visible:ring-[#CA2B17]" : "border-[#CDD4DA]"}`}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="po_number"
                    render={({ field }) => (
                        <FormItem className="w-2/3 text-[#4A5863]">
                            <FormLabel className=" font-medium text-xs text-[#323C43] leading-5 flex flex-row items-center gap-1">Generate PO Number <IconInfoCircle className="text-[#177CCA] w-3.5 h-3.5" /></FormLabel>
                            <FormControl>
                                <Input
                                    defaultValue={field.value ?? "PO20240514-135-SDV"}
                                    {...field}
                                    className={form.formState.errors.po_number ? "border-[#CA2B17] focus-visible:ring-[#CA2B17]" : "border-input"}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="max_delivery_date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-2/3 text-sm text-[#4A5863] placeholder-[#4A5863]">
                            <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Max Date Shipping</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "flex items-center justify-between pr-3 pl-3 text-left   ",
                                                form.formState.errors.max_delivery_date ? "border-[#CA2B17] focus-visible:ring-[#CA2B17]" : "border-input",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Select Date</span>
                                            )}
                                            <IconCalendar />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="invoice_address"
                    render={({ field }) => (
                        <FormItem className="  text-sm text-[#4A5863] placeholder-[#4A5863] w-2/3">
                            <FormLabel className="flex flex-row items-center gap-1  font-medium text-xs leading-5 text-[#323C43]">Invoice Address</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className={form.formState.errors.invoice_address ? "border-[#CA2B17] focus-visible:ring-[#CA2B17]" : "border-input"}>
                                        <SelectValue placeholder="--Select--" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="cbn_bogor">CBN Branch Bogor</SelectItem>
                                    <SelectItem value="cbn_jakarta">CBN Branch Jakarta</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-8">

                        <FormField
                            control={form.control}
                            name="budget"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Budget <span className="text-[#B3BEC6] text-[0.688rem]">(optional)</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            defaultValue={field.value ?? ""}
                                            placeholder="10.000.000"
                                            {...field}
                                            className={form.formState.errors.budget ? "border-[#CA2B17] focus-visible:ring-[#CA2B17]" : "border-input"}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-2">

                        <FormField
                            control={form.control}
                            name="unit"
                            render={({ field }) => (
                                <FormItem className="  text-sm text-[#4A5863]">
                                    <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Unit</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className={form.formState.errors.unit ? "border-[#CA2B17] focus-visible:ring-[#CA2B17]" : "border-input"}>
                                                <SelectValue placeholder="--Select--" className="placeholder-[#4A5863]" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="IDR">IDR-Rupiah</SelectItem>
                                            <SelectItem value="USD">USD-Dollar</SelectItem>
                                            <SelectItem value="RMB">RMB-Yuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-8">

                        <FormField
                            control={form.control}
                            name="vendor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Select Vendor</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Input Vendor"
                                            {...field}
                                            value={field.value ?? ""}
                                            className={form.formState.errors.vendor ? "border-[#CA2B17] focus-visible:ring-[#CA2B17]" : "border-input"}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-4">

                        <FormField
                            control={form.control}
                            name="sales_officer"
                            render={({ field }) => (
                                <FormItem className="  text-sm text-[#4A5863]">
                                    <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Sales Officer</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className={form.formState.errors.sales_officer ? "border-[#CA2B17] focus-visible:ring-[#CA2B17]" : "border-input"}>
                                                <SelectValue placeholder="--Select--" className="placeholder-[#4A5863]" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="suyarto">Suyarto</SelectItem>
                                            <SelectItem value="supratman">Supratman</SelectItem>
                                            <SelectItem value="sujono">Sujono</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-start bg-[#F3F5F6] w-2/3 p-4 gap-4 rounded-sm border-[#CDD4DA] border-[1px] text-[#4A5863] text-xs mt-4">
                    <div className="flex flex-col items-start justify-center w-1/4">
                        <div className="text-nowrap">Vendor Name</div>
                        <div className="flex items-center">Address</div>
                        <br></br>
                        <div>Phone</div>
                        <div>E-mail</div>
                        <div>Website</div>
                    </div>
                    <div className="flex flex-col items-start justify-start w-3/4">
                        <div>PT Putra Mandiri Fiberindo</div>
                        <div className="text-wrap">
                            Sedayu Square Jl. Kamal Raya Outer Ring Road Blok L no. 35 Cengkareng, Jakarta Barat - 11730
                        </div>
                        <div>(021) 58357085</div>
                        <div>pm_fiberindo@yahoo.co.id</div>
                        <div>-</div>
                    </div>
                </div>

                <div className="font-semibold text-xl leading-6 font-outfit border-b-2 border-[#CDD4DA] py-4">File Attachment <span className="text-[#B3BEC6] text-xs font-normal">(optional)</span></div>
                <FormField
                    control={form.control}
                    name="file_upload"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl className="flex flex-row">
                                <FileUploader
                                    value={files && field.value}
                                    onValueChange={(newFiles) => {
                                        setFiles(newFiles);   // Update local state
                                        field.onChange(newFiles);   // Update form field state
                                    }}
                                    dropzoneOptions={dropZoneConfig}
                                    className="relative bg-background rounded-lg p-2"
                                >
                                    <FileInput
                                        id="fileInput"
                                        className="bg-[#F3F5F6]"
                                    >
                                        <div className={`flex items-center justify-center flex-col py-10 w-full rounded-lg ${form.formState.errors.file_upload ? "border-[#CA2B17] border-[1px]" : "border-input"}`}>
                                            <IconFileUpload className="text-[#3199E8] h-10 w-10" strokeWidth={'1.25'} />
                                            <div className="mb-1 text-sm space-y-3 text-center pt-2">
                                                <span className="font-semibold">Drag and drop files to upload or</span>
                                                <div className="flex h-10 justify-center items-center w-[50%] m-auto bg-[#323C43] text-[white] rounded-sm">Browse Files</div>
                                                <p className="text-xs text-[#4A5863]">
                                                    maximum file size may not exceed 5MB each
                                                </p>
                                            </div>
                                        </div>
                                    </FileInput>
                                    <div className="flex flex-col w-[75%]">
                                        <p className="font-bold text-base font-outfit pb-4 px-4">Attached Files</p>
                                        <FileUploaderContent>
                                            {files &&
                                                files.length > 0 &&
                                                files.map((file, i) => (
                                                    <FileUploaderItem key={i} index={i} className="flex-auto border-b-2 border-[#E5E8EB] p-4 hover:bg-white hover:cursor-default">
                                                        <IconFile className="text-[#3199E8]" size={16} />
                                                        <span className="text-[#3199E8] text-md font-normal">{file.name}</span>
                                                    </FileUploaderItem>
                                                ))}
                                        </FileUploaderContent>
                                    </div>
                                </FileUploader>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="font-semibold text-xl leading-6 font-outfit border-b-2 border-[#CDD4DA] py-4">Item Detail</div>
                <div className="mt-4">
                    <Table>
                        <TableHeader className="border-b border-[#8092A0] text-[#4A5863]  font-semibold text-sm">
                            <TableRow>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Unit Price</TableHead>
                                <TableHead>Unit Discount</TableHead>
                                <TableHead>Net Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="border-b border-[#CDD4DA]">
                            <TableRow className="text-base text-[#4A5863] border-none">
                                <TableCell className="text-wrap w-[30%]">New drop cable FTTH network installation [OTC]<p className="text-[#4A5863] text-sm font-normal">Item Code 06001400100001</p></TableCell>
                                <TableCell>1 Pcs</TableCell>
                                <TableCell className="w-[20%]">
                                    <Input placeholder="Input Here" className="text-gray-400"  defaultValue={'2.880.000'}></Input>
                                </TableCell>
                                <TableCell className="text-wrap w-[20%]">
                                    <Input placeholder="Input Here" className="text-gray-400" defaultValue={'0'}></Input>
                                </TableCell>
                                <TableCell>Rp 2.880.000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><p className="text-[#4A5863] text-sm font-normal">Note:<br></br>
                                    PT Putra Mandiri Fiberindo Jasa spling OTB di Wisma Asia 2 Slip sebanyak 2 OTB x 24 port(CID 02053866)</p></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className="flex flex-row justify-between p-4 pb-[10vh] border-[#8092A0] border-b">
                    <div className="flex justify-center gap-2">
                        <Checkbox id="vat" />
                        <label htmlFor="vat" className="text-[#4A5863] font-semibold">
                            Include VAT 11%
                        </label>
                    </div>
                    <div className="flex flex-col border border-[#8092A0] rounded-sm p-4">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col items-start gap-2 text-[#B3BEC6]">
                                <p>Subtotal</p>
                                <p>Discount</p>
                                <p>VAT 11%</p>
                                <p>Shipping & Handling</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <p>Rp 2.880.000</p>
                                <p>Rp 0</p>
                                <p>Rp 316.800</p>
                                <p>Rp 0</p>
                            </div>
                        </div>
                        <div className="border-t border-[#8092A0] my-2"></div>
                        <div className="flex flex-row justify-between gap-[12vw]">
                            <div className="flex flex-col items-start text-[#B3BEC6]">
                                <p>Total Amount</p>
                            </div>
                            <div className="flex flex-col items-end font-semibold text-base text-black">
                                <p>Rp 3.196.800</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end p-2">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                            <ButtonCustom variant='tertiary' type="link" destination="/request">Cancel</ButtonCustom>
                            <Button type="submit" className="flex h-10 items-center justify-center rounded-md px-4 font-medium text-sm transition-colors focus-visible:outline bg-[#3199E8] text-white hover:bg-[#83C1F1] active:bg-blue-600 focus-visible:outline-slate-500"><IconArrowRight /> {type} PO</Button>
                        </div>
                    </div>
                </div>  
            </form>
        </Form >
    );
}