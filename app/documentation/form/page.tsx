import { ButtonCustom } from "@/components/custom/Button"
import { FormDialog } from "@/components/custom/FormDialog";
import { IconArrowBack, IconTarget } from "@tabler/icons-react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function FormDocumentation() {

    const codestring = `
'use client'

import { ButtonCustom } from "@/components/custom/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"
import { IconCalendar, IconFile, IconFileUpload, IconInfoCircle, IconPlus } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import {
    Form,
    FormControl,
    FormDescription,
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
import * as z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    format
} from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useState } from "react"

const formSchema = z.object({
    name_0843262112: z.string(),
    name_5485797394: z.string(),
    name_8512321562: z.boolean(),
    name_5027752183: z.string(),
    name_7612042405: z.string(),
    name_7612042378: z.string(),
    name_0442658529: z.string(),
    name_0442658531: z.string(),
    name_0179162223: z.string(),
    name_0185634836: z.string(),
    name_4322188965: z.boolean(),
    name_8908564908: z.string(),
    name_1900702758: z.coerce.date(),
    name_6870145672: z.string(),
    name_2722450973: z.string(),
    name_5202057836: z.string()
});

type FormDialogProps = {
    trigger: React.ReactNode;
}

export function FormDialog({ trigger }: FormDialogProps) {

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
        try {
            console.log(values);
        } catch (error) {
            console.error("Form submission error", error);
        }
    }


    return (
        <Dialog>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <DialogContent className="sm:max-w-[60%] sm:h-[85vh] ">
                        <div className="flex flex-auto flex-col gap-4 overflow-scroll no-scrollbar pt-4 px-4">
                            <DialogHeader>
                                <DialogTitle className="font-semibold text-xl leading-6 font-outfit border-b-2 border-[#CDD4DA] py-4">General Information</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-12 gap-4 items-center">

                                <div className="col-span-9">

                                    <FormField
                                        control={form.control}
                                        name="name_0843262112"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Initial Budget <span className="text-[#B3BEC6] text-[0.688rem]">(optional)</span></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="10.000.000"
                                                        type=""
                                                        {...field}
                                                        value={field.value ?? ""}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-3">

                                    <FormField
                                        control={form.control}
                                        name="name_5485797394"
                                        render={({ field }) => (
                                            <FormItem className="  text-sm text-[#4A5863]">
                                                <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Unit</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
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
                            <FormField
                                control={form.control}
                                name="name_8512321562"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className=" font-semibold text-sm leading-6 text-[#4A5863]">Repeat Previous Order</FormLabel>
                                            <FormDescription className="text-[#8092A0] text-xs ">Check this box if you want the same request as previous order</FormDescription>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name_5027752183"
                                render={({ field }) => (
                                    <FormItem className="  text-sm text-[#4A5863] placeholder-[#4A5863]">
                                        <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Input Previous PO Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="PO Number"

                                                type=""
                                                {...field}
                                                value={field.value ?? ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name_7612042405"
                                render={({ field }) => (
                                    <FormItem className="  text-sm text-[#4A5863] placeholder-[#4A5863]">
                                        <FormLabel className="flex flex-row items-center gap-1  font-medium text-xs leading-5 text-[#323C43]">Choose Request Form Type <IconInfoCircle className="text-[#177CCA] w-3.5 h-3.5" /></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="--Select--" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="specific">Specific Item</SelectItem>
                                                <SelectItem value="non-specific">Non-Specific Item</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogHeader>
                                <DialogTitle className="font-semibold text-xl leading-6 font-outfit border-b-2 border-[#CDD4DA] py-4">Detail Information</DialogTitle>
                            </DialogHeader>
                            <FormField
                                control={form.control}
                                name="name_7612042378"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Type of Request</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-row space-x-2"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="item" />
                                                    </FormControl>
                                                    <FormLabel className="text-[#4A5863] font-semibold text-sm">
                                                        Item
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="service" />
                                                    </FormControl>
                                                    <FormLabel className="text-[#4A5863] font-semibold text-sm">
                                                        Service
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name_0442658529"
                                render={({ field }) => (
                                    <FormItem className="  text-sm text-[#4A5863] placeholder-[#4A5863]">
                                        <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Filter by Tagging <span className="text-[#B3BEC6]    text-[0.688rem]">(optional)</span></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="--Select--" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="router">Router</SelectItem>
                                                <SelectItem value="other">Other Filtering</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name_0442658531"
                                render={({ field }) => (
                                    <FormItem className="  text-sm text-[#4A5863] placeholder-[#4A5863]">
                                        <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Select Item</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="--Select--" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="huawei">Huawei NetEngine AR8140-T-12G10XG</SelectItem>
                                                <SelectItem value="cisco">Cisco ISR G1 1800</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-12 gap-4">

                                <div className="col-span-4">
                                    <div className="space-y-2">
                                        <Label id="stock" className=" font-medium text-xs leading-5 text-[#323C43]">Stock in Warehouse</Label>
                                        <Input disabled id="stock" value="0 Pcs" className="bg-[#F3F5F6] border-2 border-[#CDD4DA]"></Input>
                                    </div>
                                </div>

                                <div className="col-span-4">

                                    <FormField
                                        control={form.control}
                                        name="name_0185634836"
                                        render={({ field }) => (
                                            <FormItem className="  text-sm text-[#4A5863] placeholder-[#4A5863]">
                                                <FormLabel aria-required className=" font-medium text-xs leading-5 text-[#323C43]">Amount Request</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Input Amount"

                                                        type=""
                                                        {...field}
                                                        value={field.value ?? ""}
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
                                        name="name_4322188965"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 pt-8">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className="w-6 h-6 p-0 rounded-none"
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className=" font-semibold text-sm leading-6 text-[#4A5863]">Set Buy</FormLabel>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                            </div>

                            <FormField
                                control={form.control}
                                name="name_8908564908"
                                render={({ field }) => (
                                    <FormItem className="  text-sm text-[#4A5863] placeholder-[#4A5863]">
                                        <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Target Location</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="--Select--" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="tangerang">Tangerang</SelectItem>
                                                <SelectItem value="jakarta">Jakarta</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name_1900702758"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col   text-sm text-[#4A5863] placeholder-[#4A5863]">
                                        <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Target Delivery Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "flex items-center justify-between pr-3 pl-3 text-left   ",
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
                                name="name_6870145672"
                                render={({ field }) => (
                                    <FormItem className="  text-sm text-[#4A5863] placeholder-[#4A5863]">
                                        <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Select Requestor</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="--Select--" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="PTA">Perusahaan A</SelectItem>
                                                <SelectItem value="PTB">Perusahaan B</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name_2722450973"
                                render={({ field }) => (
                                    <FormItem className="text-xs text-[#4A5863] placeholder-[#4A5863]">
                                        <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Note</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe additional information"
                                                className="resize-none"
                                                rows={3}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogHeader>
                                <DialogTitle className="font-semibold text-xl leading-6 font-outfit border-b-2 border-[#CDD4DA] py-4">File Attachment  <span className="  text-xs">(optional)</span></DialogTitle>
                            </DialogHeader>
                            <FormField
                                control={form.control}
                                name="name_5202057836"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl className="flex flex-row">
                                            <FileUploader
                                                value={files}
                                                onValueChange={setFiles}
                                                dropzoneOptions={dropZoneConfig}
                                                className="relative bg-background rounded-lg p-2"
                                            >
                                                <FileInput
                                                    id="fileInput"
                                                    className="bg-[#F3F5F6]"
                                                >
                                                    <div className="flex items-center justify-center flex-col py-10 w-full ">
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
                        </div>
                        <DialogFooter className=" border-t-2 bg-inherit border-[#E5E8EB] pt-4">
                            <DialogClose asChild>
                                <ButtonCustom variant="tertiary">Cancel</ButtonCustom>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="submit" variant='default' className="rounded-md bg-button-blue text-white hover:bg-blue-300 active:bg-blue-600 focus-visible:outline-slate-500"><IconPlus />Submit Item</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
        </Dialog>
    );
}
    `

    return (
        <div className="container mx-auto py-12 p-4">
            <div className="flex justify-between items-center pb-2 text-black">
                <h4 className="text-[1.75rem] font-bold font-outfit leading-8">Form Documentation</h4>
                <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                        <ButtonCustom variant='secondary' icon={<IconArrowBack />} type="link" destination="/documentation">Back to component list</ButtonCustom>
                    </div>
                </div>
            </div>
            <div className="flex py-4">
                <div className="basis-1/4 border-r-2 flex flex-col gap-6 h-[55vh] py-4 pr-1">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Trigger</p>
                        <p className="text-base text-[#4A5863]">what is used to trigger the dialog to appear</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Form Types</p>
                        <p className="text-base text-[#4A5863]">normal input, textarea, select, file upload, date picker, radio group, checkbox     </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Form Layout</p>
                        <p className="text-base text-[#4A5863]">form is in a dialog(modal) and follows the WAMS figma layout</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Important Resources</p>
                        <p className="text-base text-[#4A5863]">this <a href="https://shadcn-form-build.vercel.app/playground" className="font-bold">website</a> is useful for playing around with the layout and form types</p>
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
            <div className="flex flex-row gap-4 m-auto p-2 bg-slate-50 rounded-md shadow items-center justify-center">
                <p className="font-bold font-outfit text-2xl text-[#323C43]">Demo: </p>
                <FormDialog trigger={<ButtonCustom variant="primary">Press to access form</ButtonCustom>} />
            </div>
        </div>
    )
};