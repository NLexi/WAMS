'use client';

import Image from "next/image";
import { IconBell, IconUser } from '@tabler/icons-react';
import React from "react";

type NavbarProps = {
    username?: string
}

export default function Navbar({ username }: NavbarProps) {
    return (
        <nav className="bg-white border-[#CDD4DA] border-b p-2">
            <div className="w-full mx-auto flex justify-between items-center">
                <div className="flex items-center px-2">
                    <Image src="/Logo_WAMS.svg" alt="Icon" width={200} height={200} />
                </div>
                {username ?
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
                    :
                    <></>
                }
            </div>
        </nav>
    );
}
