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

export function ButtonRevamp({ children, icon, variant, type = "button", color = "blue", destination = "#", onClick, className = "", ...rest }: ButtonProps) {

    const buttonContent = (
        <>
            {icon && <span className={`flex items-center justify-center ${icon && children ? 'mr-2' : ''}`}>{icon}</span>}
            {children}
        </>
    );

    let palette = { light: "", dark: "" };

    switch (color) {
        case "green":
            palette = { light: "green-300", dark: "[#17CA1D]" };
            break;
        case "red":
            palette = { light: "red-400", dark: "[#CA2B17]" };
            break;
        default:
            palette = { light: "[#D6EAFA]", dark: "[#3199E8]" };
    }

    const variants = {
        primary:
            `bg-${palette.dark} text-white hover:bg-${palette.light} focus-visible:outline-slate-500`,
        secondary:
            `text-${palette.dark} border-2 border-solid border-${palette.dark} bg-white hover:bg-${palette.light} hover:text-white`,
        tertiary:
            `justify-center text-${palette.dark} bg-white px-4 font-medium transition-colors hover:bg-${palette.light} active:border-2 active:border-double active:border-${palette.dark}`,
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
