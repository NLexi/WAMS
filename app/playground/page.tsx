'use client'

import { Button } from '@/app/components/Buttons/Button';
import { BackButton } from '@/app/components/Buttons/BackButton';
import { BackButton2 } from '../components/Buttons/BackButton2';
import { TransparentButton } from '../components/Buttons/TransparentButton';
import { RejectButton } from '../components/Buttons/RejectButton';
import { ApproveButton } from '../components/Buttons/ApproveButton';
import { SearchBar } from '../components/Fields/SearchBar';
import { Requests } from '../components/Menu/Requests';
import { useSnackbar } from '../components/Snackbar';

import { SetStateAction, useState } from "react";

export default function Page() {
    const [search, setSearch] = useState("");

    const showSnackbar = useSnackbar();

    const handleClick = (variant: 'success' | 'error' | 'default' | 'info') => {
        showSnackbar(`Context Text`, variant);
    };

    const handleSearch = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSearch(event.target.value);
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center flex-col">
            <div className="p-6 text-white rounded-lg flex gap-2">
                <Button icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.875 13.875L15.75 15.75M3 4.5H15M3 9H6M3 13.5H6M8.25 11.25C8.25 12.0456 8.56607 12.8087 9.12868 13.3713C9.69129 13.9339 10.4543 14.25 11.25 14.25C12.0456 14.25 12.8087 13.9339 13.3713 13.3713C13.9339 12.8087 14.25 12.0456 14.25 11.25C14.25 10.4543 13.9339 9.69129 13.3713 9.12868C12.8087 8.56607 12.0456 8.25 11.25 8.25C10.4543 8.25 9.69129 8.56607 9.12868 9.12868C8.56607 9.69129 8.25 10.4543 8.25 11.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}>
                    Check
                </Button>
                <Button icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.75 12.75C3.75 13.1478 3.90803 13.5294 4.18934 13.8107C4.47064 14.092 4.85217 14.25 5.25 14.25C5.64782 14.25 6.02935 14.092 6.31066 13.8107C6.59196 13.5294 6.75 13.1478 6.75 12.75M3.75 12.75C3.75 12.3522 3.90803 11.9706 4.18934 11.6893C4.47064 11.408 4.85217 11.25 5.25 11.25C5.64782 11.25 6.02935 11.408 6.31066 11.6893C6.59196 11.9706 6.75 12.3522 6.75 12.75M3.75 12.75H2.25V9.75M6.75 12.75H11.25M11.25 12.75C11.25 13.1478 11.408 13.5294 11.6893 13.8107C11.9706 14.092 12.3522 14.25 12.75 14.25C13.1478 14.25 13.5294 14.092 13.8107 13.8107C14.092 13.5294 14.25 13.1478 14.25 12.75M11.25 12.75C11.25 12.3522 11.408 11.9706 11.6893 11.6893C11.9706 11.408 12.3522 11.25 12.75 11.25C13.1478 11.25 13.5294 11.408 13.8107 11.6893C14.092 11.9706 14.25 12.3522 14.25 12.75M14.25 12.75H15.75V8.25M1.5 3.75H9.75V12.75M15.75 8.25H9.75M15.75 8.25L13.5 4.5H9.75M2.25 6.75H5.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}>
                    Create DO
                </Button>
                <Button icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.75 9H14.25M14.25 9L9.75 13.5M14.25 9L9.75 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}>
                    Submit Form
                </Button>
                <Button icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.75 9L8.25 10.5L11.25 7.5M2.25 9C2.25 9.88642 2.42459 10.7642 2.76381 11.5831C3.10303 12.4021 3.60023 13.1462 4.22703 13.773C4.85382 14.3998 5.59794 14.897 6.41689 15.2362C7.23583 15.5754 8.11358 15.75 9 15.75C9.88642 15.75 10.7642 15.5754 11.5831 15.2362C12.4021 14.897 13.1462 14.3998 13.773 13.773C14.3998 13.1462 14.897 12.4021 15.2362 11.5831C15.5754 10.7642 15.75 9.88642 15.75 9C15.75 8.11358 15.5754 7.23583 15.2362 6.41689C14.897 5.59794 14.3998 4.85382 13.773 4.22703C13.1462 3.60023 12.4021 3.10303 11.5831 2.76381C10.7642 2.42459 9.88642 2.25 9 2.25C8.11358 2.25 7.23583 2.42459 6.41689 2.76381C5.59794 3.10303 4.85382 3.60023 4.22703 4.22703C3.60023 4.85382 3.10303 5.59794 2.76381 6.41689C2.42459 7.23583 2.25 8.11358 2.25 9Z" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                }>
                    Confirm
                </Button>
                <TransparentButton>
                    Cancel
                </TransparentButton>
                <ApproveButton>
                    Approve
                </ApproveButton>
                <RejectButton>
                    Reject
                </RejectButton>
            </div>
            <div className="p-6 text-white rounded-lg flex gap-2">
                <Button icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.25 9C8.25 9.19891 8.32902 9.38968 8.46967 9.53033C8.61032 9.67098 8.80109 9.75 9 9.75C9.19891 9.75 9.38968 9.67098 9.53033 9.53033C9.67098 9.38968 9.75 9.19891 9.75 9C9.75 8.80109 9.67098 8.61032 9.53033 8.46967C9.38968 8.32902 9.19891 8.25 9 8.25C8.80109 8.25 8.61032 8.32902 8.46967 8.46967C8.32902 8.61032 8.25 8.80109 8.25 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.25 9C5.25 9.99456 5.64509 10.9484 6.34835 11.6516C7.05161 12.3549 8.00544 12.75 9 12.75C9.99456 12.75 10.9484 12.3549 11.6516 11.6516C12.3549 10.9484 12.75 9.99456 12.75 9C12.75 8.00544 12.3549 7.05161 11.6516 6.34835C10.9484 5.64509 9.99456 5.25 9 5.25C8.00544 5.25 7.05161 5.64509 6.34835 6.34835C5.64509 7.05161 5.25 8.00544 5.25 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.25 9C2.25 9.88642 2.42459 10.7642 2.76381 11.5831C3.10303 12.4021 3.60023 13.1462 4.22703 13.773C4.85382 14.3998 5.59794 14.897 6.41689 15.2362C7.23583 15.5754 8.11358 15.75 9 15.75C9.88642 15.75 10.7642 15.5754 11.5831 15.2362C12.4021 14.897 13.1462 14.3998 13.773 13.773C14.3998 13.1462 14.897 12.4021 15.2362 11.5831C15.5754 10.7642 15.75 9.88642 15.75 9C15.75 8.11358 15.5754 7.23583 15.2362 6.41689C14.897 5.59794 14.3998 4.85382 13.773 4.22703C13.1462 3.60023 12.4021 3.10303 11.5831 2.76381C10.7642 2.42459 9.88642 2.25 9 2.25C8.11358 2.25 7.23583 2.42459 6.41689 2.76381C5.59794 3.10303 4.85382 3.60023 4.22703 4.22703C3.60023 4.85382 3.10303 5.59794 2.76381 6.41689C2.42459 7.23583 2.25 8.11358 2.25 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}>
                    Accept PO
                </Button>
                <Button icon={<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1.75V12.25M1.75 7H12.25" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                }>
                    New Accept PO
                </Button>
                <BackButton>
                    Back to list
                </BackButton>
                <BackButton2>
                    Back to list
                </BackButton2>
                <Button>
                    Submit Accept DO Form
                </Button>

            </div>
            <div className="p-6 rounded-lg flex gap-4">
                <SearchBar placeholder='Search by PO Number' color='stone-400' onChange={handleSearch}></SearchBar>
                <Requests/>
                <button
                    className="bg-green-500 p-2 rounded-xl text-white"
                    onClick={() => handleClick('success')}
                >
                    Success Snackbar
                </button>
                <button
                    className="bg-red-500 p-2 rounded-xl font-medium text-white"
                    onClick={() => handleClick('error')}
                >
                    Error Snackbar
                </button>
                <button
                    className="bg-slate-500 p-2 rounded-xl font-medium text-white"
                    onClick={() => handleClick('default')}
                >
                    Default Snackbar
                </button>
                <button
                    className="bg-blue-500 p-2 rounded-xl font-medium text-white"
                    onClick={() => handleClick('info')}
                >
                    Info Snackbar
                </button>
            </div>
        </div>
    )
}