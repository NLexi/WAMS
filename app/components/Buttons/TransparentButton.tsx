interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function TransparentButton({ children }: ButtonProps) {
    return (
        <button
            className=
            'group flex h-10 items-center rounded-md text-button-blue bg-white px-4 font-medium font-button transition-colors hover: opacity-75 active:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
        >
            {children}
        </button>
    );
}
