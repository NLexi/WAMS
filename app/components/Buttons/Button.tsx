type ButtonProps = {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    variant: "primary" | "secondary" | "tertiary" | "positive" | "danger"
    onClick?: React.ReactEventHandler
}

export function Button({ children, icon, variant, onClick }: ButtonProps) {

    const variants = {
        primary:
            "bg-button-blue text-white hover:bg-blue-300 active:bg-blue-600 focus-visible:outline-slate-500",
        secondary:
            "text-button-blue border-2 border-solid border-button-blue bg-white hover:bg-button-blue hover:text-white active:bg-blue-600",
        tertiary:
            "justify-center text-button-blue bg-white px-4 font-medium font-button transition-colors hover:opacity-75 active:border-2 active:border-button-blue",
        positive:
            "bg-approve px-4 font-medium font-button text-white transition-colors hover:bg-green-300 active:bg-green-600",
        danger:
            "bg-reject px-4 font-medium font-button text-white transition-colors hover:bg-red-500 active:bg-red-700",
    }

    return (
        <button onClick={onClick} className={`flex h-10 items-center border-2 border-transparent rounded-md px-4 font-medium font-inter transition-colors focus-visible:outline aria-disabled:cursor-not-allowed aria-disabled:opacity-50 ${variants[variant]}`}>
            <span className={`flex items-center justify-center ${icon && children ? 'mr-2' : ''}`}>
                {icon}
            </span>
            {children}
        </button>
    );
}
