interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function BackButton2({ children }: ButtonProps) {
    return (
        <button
            className=
            'group flex h-10 items-center rounded-md text-button-blue  border-2 border-solid border-button-blue bg-white px-4 font-medium font-button transition-colors hover:opacity-75 active:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
        >
            <svg
                width="14"
                height="12"
                viewBox="0 0 14 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 transition-colors stroke-button-blue"
            >
                <path
                    d="M4.75 4.25L1.75 7.25M1.75 7.25L4.75 10.25M1.75 7.25H10C10.7956 7.25 11.5587 6.93393 12.1213 6.37132C12.6839 5.80871 13 5.04565 13 4.25C13 3.45435 12.6839 2.69129 12.1213 2.12868C11.5587 1.56607 10.7956 1.25 10 1.25H9.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            {children}
        </button>
    );
}
