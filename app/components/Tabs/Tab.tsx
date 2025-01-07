type TabProps = {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    isActive?: boolean;
    onClick?: React.ReactEventHandler;
}

export function Tab({children, icon, isActive = false, onClick} : TabProps) {
    return (
        <button onClick={onClick} className={`group max-h-14 w-fit flex gap-2 items-center px-2 py-4 hover:bg-[#D6EAFA] hover:cursor-pointer ${isActive ? 'border-b-[3px] border-[#3199E8]' : ''}`}>
            <div className={`${isActive ? 'text-[#354052]' : 'text-[#B3BEC6]'} group-hover:text-[#354052]`}>
                {icon}
            </div>
            <div className={`font-inter font-normal ${isActive ? 'text-[#354052]' : 'text-[#4A5863]'}`}>
                {children}
            </div>
        </button>
    )
}