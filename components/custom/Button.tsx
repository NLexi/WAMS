import Link from "next/link";

type ButtonProps = {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    variant: "primary" | "secondary" | "tertiary" | "positive" | "danger"
    type?: "link" | "button"
    destination?: string
    onClick?: React.ReactEventHandler
} & React.HTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function ButtonCustom({ children, icon, variant, type="button", destination="#", onClick, ...rest }: ButtonProps) {

    const buttonContent = (
        <>
          {icon && <span className={`flex items-center justify-center ${icon && children ? 'mr-2' : ''}`}>{icon}</span>}
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
            <button onClick={onClick} className={`flex h-10 items-center justify-center rounded-md px-4 font-medium text-sm transition-colors focus-visible:outline aria-disabled:cursor-not-allowed aria-disabled:opacity-50 ${variants[variant]}`}>
                {buttonContent}
            </button>
        );
    }
    else {
        return (
            <Link href={destination} onClick={onClick} className={`flex h-10 items-center justify-center rounded-md px-4 font-medium text-sm transition-colors focus-visible:outline aria-disabled:cursor-not-allowed aria-disabled:opacity-50 ${variants[variant]}`}>
                {buttonContent}
            </Link>
        )
    }
}
