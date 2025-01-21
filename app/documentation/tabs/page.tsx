import { ButtonCustom } from "@/components/custom/Button"
import { PageTabs } from "@/components/custom/PageTabs";
import { Tab } from "@/components/custom/Tab";
import { IconArrowBack, IconTarget } from "@tabler/icons-react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function TabDocumentation() {

    const codestring = `
type TabProps = {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    isActive?: boolean;
    onClick?: React.ReactEventHandler;
}

export function Tab({children, icon, isActive = false, onClick} : TabProps) {
    return (
        <button onClick={onClick} className={\`group max-h-14 w-fit flex gap-2 items-center px-2 py-4 hover:bg-[#D6EAFA] hover:cursor-pointer \${isActive ? 'border-b-[3px] border-[#3199E8]' : ''}\`}>
            <div className={\`\${isActive ? 'text-[#354052]' : 'text-[#B3BEC6]'} group-hover:text-[#354052]\`}>
                {icon}
            </div>
            <div className={\`\${isActive ? 'text-[#354052]' : 'text-[#4A5863]'}\`}>
                {children}
            </div>
        </button>
    )
}
    `

    return (
        <div className="container mx-auto pt-12 p-4">
            <div className="flex justify-between items-center pb-2 text-black">
                <h4 className="text-[1.75rem] font-bold font-outfit leading-8">Tab Documentation</h4>
                <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                        <ButtonCustom variant='secondary' icon={<IconArrowBack />} type="link" destination="/documentation">Back to component list</ButtonCustom>
                    </div>
                </div>
            </div>
            <div className="flex py-4">
                <div className="basis-1/4 border-r-2 flex flex-col gap-6 h-[55vh] py-4 pr-1">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Icon</p>
                        <p className="text-base text-[#4A5863]">any icons using tabler</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">IsActive</p>
                        <p className="text-base text-[#4A5863]">boolean value to determine if it is in its active state or not     </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">OnClick</p>
                        <p className="text-base text-[#4A5863]">an on click event handler</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Extension Component</p>
                        <p className="text-base text-[#4A5863]">PageTabs Component</p>
                    </div>
                </div>
                <div className="basis-3/4">
                    <div className="my-auto px-8 py-4">
                        <p className="text-base text-[#323C43] font-semibold font-outfit">Component Code</p>
                        <SyntaxHighlighter
                            language="javascript"
                            style={dracula}
                            wrapLongLines
                            customStyle={{ padding: '8px', borderRadius: '8px', maxWidth: '50rem', maxHeight: '23rem' }}
                        >
                            {codestring}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-4 m-auto p-2 bg-slate-50 rounded-md shadow items-center justify-center">
                <p className="font-bold font-outfit text-2xl text-[#323C43]">Demo: </p>
                <Tab icon={<IconTarget />} isActive={false}>Default</Tab>
                <Tab icon={<IconTarget />} isActive={true}>Active</Tab>
            </div>
        </div>
    )
};