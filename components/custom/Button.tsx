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
            {icon && <span className={`flex items-center justify-center ${icon && children ? 'mr-2' : ''}`}>{icon}</span>}
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
            `${palette.dark_bg} text-white ${palette.light} focus-visible:outline-slate-500`,
        secondary:
            `${palette.dark_text} border-2 border-solid ${palette.dark_border} bg-white ${palette.light}`,
        tertiary:
            `justify-center ${palette.dark_text} bg-white px-4 font-medium transition-colors ${palette.light} active:border-2 active:border-double active:${palette.dark_border}`,
    }
    if (type === "button") {
        return (
            <button
                onClick={onClick}
                className={`flex h-10 items-center justify-center rounded-md px-4 font-medium text-sm transition-colors focus-visible:outline aria-disabled:cursor-not-allowed aria-disabled:opacity-50 ${variants[variant]} ${className}`}
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
                className={`flex h-10 items-center justify-center rounded-md px-4 font-medium text-sm transition-colors focus-visible:outline aria-disabled:cursor-not-allowed aria-disabled:opacity-50 ${variants[variant]} ${className}`}
                {...rest}
            >
                {buttonContent}
            </Link>
        )
    }
}
