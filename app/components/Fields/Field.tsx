
type FieldProps = {
    icon?: React.ReactNode;
    color?: string;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function Field({ icon, color, placeholder, onChange }: FieldProps) {
    return (
        < div className="flex gap-2" >
            <div className="w-full">
                <div className="h-9 w-fit rounded-[0.25rem] border border-neutral-400 bg-transparent flex gap-3 items-center p-[4px_8px]">
                    {icon}
                    <input
                        type="text"
                        placeholder={placeholder}
                        className={`w-full text-${color} font-inter focus:outline-none border-none placeholder-${color}`}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div >
    );
}