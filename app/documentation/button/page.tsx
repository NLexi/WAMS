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
    variant: "primary" | "secondary" | "tertiary"
    type?: "link" | "button"
    color?: "blue" | "red" | "green"
    destination?: string
    onClick?: React.ReactEventHandler
} & React.HTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function ButtonCustom({ children, icon, variant, type = "button", color = "blue", destination = "#", onClick, className = "", ...rest }: ButtonProps) {

    const buttonContent = (
        <>
            {icon && <span className={\`flex items-center justify-center \${icon && children ? 'mr-2' : ''}\`}>{icon}</span>}
            {children}
        </>
    );

    let palette = { light: "", dark_bg: "", dark_text: "", dark_border: "" };

    switch (color) {
        case "green":
            palette = { light: "hover:bg-[#C0F0C8]", dark_bg: "bg-[#17CA1D]", dark_border:"border-[#17CA1D]", dark_text: "text-[#17CA1D]" };
            break;
        case "red":
            palette = { light: "hover:bg-[#EBBAA7]", dark_bg: "bg-[#CA2B17]", dark_border:"border-[#CA2B17]", dark_text: "text-[#CA2B17]" };
            break;
        default:
            palette = { light: "hover:bg-[#D6EAFA]", dark_bg: "bg-[#3199E8]", dark_border:"border-[#3199E8]", dark_text: "text-[#3199E8]" };
    }

    const variants = {
        primary:
            \`\${palette.dark_bg} text-white \${palette.light} focus-visible:outline-slate-500\`,
        secondary:
            \`\${palette.dark_text} border-2 border-solid \${palette.dark_border} bg-white \${palette.light}\`,
        tertiary:
            \`justify-center \${palette.dark_text} bg-white px-4 font-medium transition-colors \${palette.light} active:border-2 active:border-double active:\${palette.dark_border}\`,
    }
    if (type === "button") {
        return (
            <button
                onClick={onClick}
                className={\`flex h-10 items-center justify-center rounded-md px-4 font-medium text-sm transition-colors focus-visible:outline aria-disabled:cursor-not-allowed aria-disabled:opacity-50 \${variants[variant]} \${className}\`}
                {...rest}
            >
                {buttonContent}
            </button>
        );
    }
    else {
        return (
            <Link
                href={destination}
                onClick={onClick}
                className={\`flex h-10 items-center justify-center rounded-md px-4 font-medium text-sm transition-colors focus-visible:outline aria-disabled:cursor-not-allowed aria-disabled:opacity-50 \${variants[variant]} \${className}\`}
                {...rest}
            >
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
                        <p className="text-base text-[#4A5863]">primary, secondary, tertiary        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">color</p>
                        <p className="text-base text-[#4A5863]">color of button with the default being blue</p>
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
            <div className="flex flex-col gap-4 m-auto p-4 bg-slate-50 rounded-md shadow items-center">
                <p className="font-bold font-outfit text-2xl text-[#323C43]">Demo</p>
                <div className="grid grid-cols-6 gap-4">
                    <ButtonCustom variant="primary">Primary</ButtonCustom>
                    <ButtonCustom variant="primary" color="red">Primary</ButtonCustom>
                    <ButtonCustom variant="primary" color="green">Primary</ButtonCustom>
                    <ButtonCustom variant="primary" icon={<IconTarget />}>Primary</ButtonCustom>
                    <ButtonCustom variant="primary" icon={<IconTarget />} color="red">Primary</ButtonCustom>
                    <ButtonCustom variant="primary" icon={<IconTarget />} color="green">Primary</ButtonCustom>
                    <ButtonCustom variant="secondary">Secondary</ButtonCustom>
                    <ButtonCustom variant="secondary" color="red">Secondary</ButtonCustom>
                    <ButtonCustom variant="secondary" color="green">Secondary</ButtonCustom>
                    <ButtonCustom variant="secondary" icon={<IconTarget />}>Secondary</ButtonCustom>
                    <ButtonCustom variant="secondary" icon={<IconTarget />} color="red">Secondary</ButtonCustom>
                    <ButtonCustom variant="secondary" icon={<IconTarget />} color="green">Secondary</ButtonCustom>
                    <ButtonCustom variant="tertiary">Tertiary</ButtonCustom>
                    <ButtonCustom variant="tertiary" color="red">Tertiary</ButtonCustom>
                    <ButtonCustom variant="tertiary" color="green">Tertiary</ButtonCustom>
                    <ButtonCustom variant="tertiary" icon={<IconTarget />}>Tertiary</ButtonCustom>
                    <ButtonCustom variant="tertiary" icon={<IconTarget />} color="red">Tertiary</ButtonCustom>
                    <ButtonCustom variant="tertiary" icon={<IconTarget />} color="green">Tertiary</ButtonCustom>
                </div>
            </div>
        </div>
    )
};