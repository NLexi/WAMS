interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: React.ReactNode;
}

export function Button({ children, icon }: ButtonProps) {
    return (
        <button
            className=
            'flex h-10 items-center rounded-md bg-button-blue px-4 font-medium font-button text-white transition-colors hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
}
