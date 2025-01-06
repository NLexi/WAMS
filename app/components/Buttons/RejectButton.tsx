interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function RejectButton({ children}: ButtonProps) {
    return (
        <button
            className=
            'flex h-10 items-center rounded-md bg-reject px-4 font-medium font-button text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 active:bg-red-700 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
        >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.75 9H11.25M2.25 9C2.25 9.88642 2.42459 10.7642 2.76381 11.5831C3.10303 12.4021 3.60023 13.1462 4.22703 13.773C4.85382 14.3998 5.59794 14.897 6.41689 15.2362C7.23583 15.5754 8.11358 15.75 9 15.75C9.88642 15.75 10.7642 15.5754 11.5831 15.2362C12.4021 14.897 13.1462 14.3998 13.773 13.773C14.3998 13.1462 14.897 12.4021 15.2362 11.5831C15.5754 10.7642 15.75 9.88642 15.75 9C15.75 8.11358 15.5754 7.23583 15.2362 6.41689C14.897 5.59794 14.3998 4.85382 13.773 4.22703C13.1462 3.60023 12.4021 3.10303 11.5831 2.76381C10.7642 2.42459 9.88642 2.25 9 2.25C8.11358 2.25 7.23583 2.42459 6.41689 2.76381C5.59794 3.10303 4.85382 3.60023 4.22703 4.22703C3.60023 4.85382 3.10303 5.59794 2.76381 6.41689C2.42459 7.23583 2.25 8.11358 2.25 9Z" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="p-1"></div>
            {children}
        </button>
    );
}
