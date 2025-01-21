import { ButtonCustom } from "@/components/custom/Button"
import Navbar from "@/components/custom/Navbar";
import { IconArrowBack } from "@tabler/icons-react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function NavbarDocumentation() {

    const codestring = `
'use client';

import Image from "next/image";
import { IconBell, IconUser } from '@tabler/icons-react';

type NavbarProps = {
    username: string
}

export default function Navbar({ username }:NavbarProps) {
    return (
        <nav className="bg-white border-[#CDD4DA] border-b p-2">
            <div className="w-screen mx-auto flex justify-between items-center">
                <div className="flex items-center px-2">
                    <Image src="/Logo_WAMS.svg" alt="Icon" width={200} height={200} />
                </div>

                <div className="flex items-center gap-5 px-[5vw]">
                    <button
                        className="relative p-2 text-button-blue hover:text-gray-900 focus:outline-none"
                        aria-label="Notifications"
                    >
                        <IconBell size={24} />
                        <span className="absolute bottom-1 right-1 inline-block w-2.5 h-2.5 bg-red-600 rounded-full"></span>
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:cursor-pointer">
                            <IconUser size={20} className="text-button-blue hover:text-gray-900" />
                        </div>
                        <span>{username}</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
    `

    return (
        <div className="container mx-auto pt-12 p-4 overflow-x-hidden">
            <div className="flex justify-between items-center pb-2 text-black pr-8">
                <h4 className="text-[1.75rem] font-bold font-outfit leading-8">Navbar Documentation</h4>
                <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                        <ButtonCustom variant='secondary' icon={<IconArrowBack />} type="link" destination="/documentation">Back to component list</ButtonCustom>
                    </div>
                </div>
            </div>
            <div className="flex pt-4 py-2">
                <div className="basis-1/4 border-r-2 flex flex-col gap-6 h-[55vh] py-4 pr-1">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Username</p>
                        <p className="text-base text-[#4A5863]">username shown on navbar                       </p>
                    </div>
                </div>
                <div className="basis-3/4">
                    <div className="my-auto px-8 pt-4">
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
            <p className="font-bold font-outfit text-2xl text-[#323C43]">Demo: </p>
            <div className=" bg-slate-50 py-2">
                <Navbar username="Username" />
            </div>
        </div>
    )
};