type TabProps = {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    isActive?: boolean;
    onClick?: React.ReactEventHandler;
}

export function Tab({children, icon, isActive = false, onClick} : TabProps) {
    return (
        <button onClick={onClick} className={`max-h-14 w-fit flex gap-2 items-center px-2 py-4 hover:bg-request hover:cursor-pointer ${isActive ? 'border-b-[3px] border-button-blue' : ''}`}>
            <div className={`${isActive ? 'text-black' : 'text-inactive'}`}>
                {icon}
            </div>
            <div className={`font-inter font-normal ${isActive ? 'text-black' : 'text-inactive'}`}>
                {children}
            </div>
        </button>
    )
}