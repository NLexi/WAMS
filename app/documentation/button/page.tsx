import { ButtonCustom } from "@/components/custom/Button"
import { IconArrowBack, IconTarget } from "@tabler/icons-react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ButtonDocumentation() {

    const codestring = `
import Link from "next/link";

type ButtonProps = {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    variant: "primary" | "secondary" | "tertiary" | "positive" | "danger"
    type?: "link" | "button"
    destination?: string
    onClick?: React.ReactEventHandler
}

export function ButtonCustom({ children, icon, variant, type="button", destination="#", onClick }: ButtonProps) {

    const buttonContent = (
        <>
          {icon && <span className={\`flex items-center justify-center \${icon && children ? 'mr-2' : ''}\`}>{icon}</span>}
          {children}
        </>
      );

    const variants = {
        primary:
            "bg-[#3199E8] text-white hover:bg-[#83C1F1] active:bg-blue-600 focus-visible:outline-slate-500",
        secondary:
            "text-[#3199E8] border-2 border-solid border-[#3199E8] bg-white hover:bg-[#D6EAFA] active:bg-blue-600",
        tertiary:
            "justify-center text-[#3199E8] bg-white px-4 font-medium transition-colors hover:bg-[#D6EAFA] active:border-2 active:border-double active:border-[#3199E8]",
        positive:
            "bg-[#17CA1D] px-4 font-medium text-white transition-colors hover:bg-green-300 active:opacity-70",
        danger:
            "bg-[#CA2B17] px-4 font-medium text-white transition-colors hover:bg-red-500 active:opacity-70",
    }
    if (type === "button") {
        return (
            <button onClick={onClick} className={\`flex h-10 items-center justify-center rounded-md px-4 font-medium text-sm transition-colors focus-visible:outline aria-disabled:cursor-not-allowed aria-disabled:opacity-50 \${variants[variant]}\`}>
                {buttonContent}
            </button>
        );
    }
    else {
        return (
            <Link href={destination} onClick={onClick} className={\`flex h-10 items-center justify-center rounded-md px-4 font-medium text-sm transition-colors focus-visible:outline aria-disabled:cursor-not-allowed aria-disabled:opacity-50 \${variants[variant]}\`}>
                {buttonContent}
            </Link>
        )
    }
}

    `

    return (
        <div className="container mx-auto py-12 p-4">
            <div className="flex justify-between items-center pb-2 text-black">
                <h4 className="text-[1.75rem] font-bold font-outfit leading-8">Button Documentation</h4>
                <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                        <ButtonCustom variant='secondary' icon={<IconArrowBack />} type="link" destination="/documentation">Back to component list</ButtonCustom>
                    </div>
                </div>
            </div>
            <div className="flex py-4">
                <div className="basis-1/4 border-r-2 flex flex-col gap-6 h-[55vh] py-4 pr-1">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Icon</p>
                        <p className="text-base text-[#4A5863]">any icons using tabler</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Variant</p>
                        <p className="text-base text-[#4A5863]">primary, secondary, tertiary, positive, danger     </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">OnClick</p>
                        <p className="text-base text-[#4A5863]">an on click event handler</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Type</p>
                        <p className="text-base text-[#4A5863]">link, button</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Destination</p>
                        <p className="text-base text-[#4A5863]">href for <span className="font-bold">[link]</span> button type only</p>
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
                <ButtonCustom variant="primary">Primary</ButtonCustom>
                <ButtonCustom variant="primary" icon={<IconTarget />}>Icon</ButtonCustom>
                <ButtonCustom variant="secondary">Secondary</ButtonCustom>
                <ButtonCustom variant="secondary" icon={<IconTarget />}>Icon</ButtonCustom>
                <ButtonCustom variant="tertiary">Tertiary</ButtonCustom>
                <ButtonCustom variant="tertiary" icon={<IconTarget />}>Icon</ButtonCustom>
                <ButtonCustom variant="positive">Positive</ButtonCustom>
                <ButtonCustom variant="positive" icon={<IconTarget />}>Icon</ButtonCustom>
                <ButtonCustom variant="danger">Danger</ButtonCustom>
                <ButtonCustom variant="danger" icon={<IconTarget />}>Icon</ButtonCustom>
            </div>
        </div>
    )
};