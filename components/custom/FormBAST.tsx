'use client'

import { ButtonCustom } from "@/components/custom/Button"
import { Input } from "@/components/ui/input"
import { IconArrowRight, IconCalendar, IconFileUpload, IconInfoCircle } from "@tabler/icons-react"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    format
} from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Textarea } from "../ui/textarea"
import { ConfirmationDialog } from "./ConfirmationModal"

const formSchema = z.object({
    request_code: z.string({message: "Please input the BAST Number"}),
    max_delivery_date: z.coerce.date({ message: "Please add delivery date" }),
    note: z.string().optional(),
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

export function FormBAST() {

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

                <div className="font-semibold text-xl leading-6 font-outfit border-b-2 border-[#CDD4DA] py-4">BAST Submission</div>
                <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-8">

                        <FormField
                            control={form.control}
                            name="request_code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" font-medium text-xs leading-5 text-[#323C43] flex flex-row items-center gap-1">BAST Number <IconInfoCircle className="text-[#177CCA] w-4 h-4" /></FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Input BAST Number"
                                            defaultValue={field.value ?? ""}
                                            {...field}
                                            className={`${form.formState.errors.request_code ? "border-[#CA2B17] focus-visible:ring-[#CA2B17]" : "border-[#CDD4DA]"}`}
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
                            name="max_delivery_date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col text-sm text-[#4A5863] placeholder-[#4A5863]">
                                    <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">BAST Date</FormLabel>
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
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="file_upload"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Upload BAST File</FormLabel>
                            <FormControl className="flex flex-col">
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
                                        <div className={`flex items-center justify-center flex-col py-10 w-full rounded-lg mb-2 ${form.formState.errors.file_upload ? "border-[#CA2B17] border-[1px]" : "border-input"}`}>
                                            <IconFileUpload className="text-[#3199E8] h-10 w-10" strokeWidth={'1.25'} />
                                            <div className="mb-1 text-sm space-y-3 text-center pt-2">
                                                <span className="font-semibold">Drag and drop files to upload or</span>
                                                <p className="text-xs text-[#4A5863]">
                                                    maximum file size may not exceed 5MB each
                                                </p>
                                            </div>
                                        </div>
                                    </FileInput>
                                    <FileUploaderContent>
                                        {files &&
                                            files.length > 0 &&
                                            files.map((file, i) => (
                                                <FileUploaderItem key={i} index={i} className="flex flex-auto items-center border-[1px] bg-[#F3F5F6] border-[#CDD4DA] p-4 hover:bg-white hover:cursor-default">
                                                    <span className="text-[#4A5863] text-md font-normal">{file.name}</span>
                                                </FileUploaderItem>
                                            ))}
                                    </FileUploaderContent>
                                </FileUploader>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                        <FormItem className="text-xs text-[#4A5863] placeholder-[#4A5863] mb-4">
                            <FormLabel className=" font-medium text-xs leading-5 text-[#323C43]">Note</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Input additional information if needed"
                                    className={`resize-none ${form.formState.errors.note ? "border-[#CA2B17] focus-visible:ring-[#CA2B17]" : "border-input"}`}
                                    rows={5}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row justify-end py-4 border-t-2">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                            <ButtonCustom variant='tertiary' type="link" destination="/request">Cancel</ButtonCustom>
                            <ConfirmationDialog trigger={<Button type="submit" className="flex h-10 items-center justify-center rounded-md px-4 font-medium text-sm transition-colors focus-visible:outline bg-[#3199E8] text-white hover:bg-[#83C1F1] active:bg-blue-600 focus-visible:outline-slate-500"><IconArrowRight /> Submit Form</Button>}/>
                        </div>
                    </div>
                </div>
            </form>
        </Form >
    );
}