
type SearchBarProps = {
    color?: string;
    placeholder?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function SearchBar({ color, placeholder, onChange }: SearchBarProps) {
    return (
        < div className="flex gap-2" >
            <div className="w-full">
                <div className="h-9 w-fit rounded-[0.25rem] border border-neutral-400 bg-transparent flex gap-3 items-center p-[4px_8px]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.75 14.75L10.25 10.25M1.25 6.5C1.25 7.18944 1.3858 7.87213 1.64963 8.50909C1.91347 9.14605 2.30018 9.7248 2.78769 10.2123C3.2752 10.6998 3.85395 11.0865 4.49091 11.3504C5.12787 11.6142 5.81056 11.75 6.5 11.75C7.18944 11.75 7.87213 11.6142 8.50909 11.3504C9.14605 11.0865 9.7248 10.6998 10.2123 10.2123C10.6998 9.7248 11.0865 9.14605 11.3504 8.50909C11.6142 7.87213 11.75 7.18944 11.75 6.5C11.75 5.81056 11.6142 5.12787 11.3504 4.49091C11.0865 3.85395 10.6998 3.2752 10.2123 2.78769C9.7248 2.30018 9.14605 1.91347 8.50909 1.64963C7.87213 1.3858 7.18944 1.25 6.5 1.25C5.81056 1.25 5.12787 1.3858 4.49091 1.64963C3.85395 1.91347 3.2752 2.30018 2.78769 2.78769C2.30018 3.2752 1.91347 3.85395 1.64963 4.49091C1.3858 5.12787 1.25 5.81056 1.25 6.5Z" stroke="#4A5863" strokeWidth='2' strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                        type="text"
                        placeholder={placeholder}
                        className={`w-full text-${color} focus:outline-none border-none placeholder-${color}`}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div >
    );
}