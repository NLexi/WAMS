'use client'

import { ButtonCustom } from '@/app/components/Buttons/Button';
import { Field } from '../components/Fields/Field';
import { Tab } from '../components/Tabs/Tab';
import { useSnackbar } from '../components/Snackbars/Snackbar';
import { Table } from '../components/Tables/Table';
import Navbar from '../components/Navbars/Navbar';
import Image from 'next/image';


import { 
    IconPlus, 
    IconTruckDelivery, 
    IconListSearch, 
    IconArrowRight, 
    IconCircleCheck, 
    IconCircleMinus, 
    IconTarget, 
    IconArrowBack, 
    IconBell, 
    IconSearch 
} from '@tabler/icons-react';
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

    const dummyData = [
        {
          'Request Number': 'REQ001',
          'PO Number': 'PO1001',
          'Requestor': 'Alice Johnson',
          'Department': 'Engineering',
          'Request Date': '2025-01-01',
          'Status': 'Pending',
          'Action' : null,
        },
        {
          'Request Number': 'REQ002',
          'PO Number': 'PO1002',
          'Requestor': 'Bob Smith',
          'Department': 'Marketing',
          'Request Date': '2025-01-02',
          'Status': 'Approved',
          'Action' : null,
        },
        {
          'Request Number': 'REQ003',
          'PO Number': 'PO1003',
          'Requestor': 'Charlie Brown',
          'Department': 'Finance',
          'Request Date': '2025-01-03',
          'Status': 'Denied',
          'Action' : null,
        },
        {
          'Request Number': 'REQ004',
          'PO Number': 'PO1004',
          'Requestor': 'David Williams',
          'Department': 'Sales',
          'Request Date': '2025-01-04',
          'Status': 'Pending',
          'Action' : null,
        },
        {
          'Request Number': 'REQ005',
          'PO Number': 'PO1005',
          'Requestor': 'Eva Green',
          'Department': 'HR',
          'Request Date': '2025-01-05',
          'Status': 'Approved',
          'Action' : null,
        },
      ];     

    return (
        <div className="h-screen w-screen grid grid-cols-1 place-items-center gap-8">
            <Navbar/>
            <div className="text-center">
                <h1 className='font-inter font-bold mb-4'>Buttons</h1>
                <div className="grid grid-cols-4 gap-5 p-5 text-white rounded-lg">
                    <ButtonCustom icon={<IconListSearch />} variant='primary'>Check</ButtonCustom>
                    <ButtonCustom icon={<IconTruckDelivery />} variant='primary'>Create DO</ButtonCustom>
                    <ButtonCustom icon={<IconArrowRight />} variant='primary'>Submit Form</ButtonCustom>
                    <ButtonCustom icon={<IconCircleCheck />} variant='primary'>Confirm</ButtonCustom>
                    <ButtonCustom icon={<IconCircleCheck />} variant='positive'>Approve</ButtonCustom>
                    <ButtonCustom icon={<IconCircleMinus />} variant='danger'>Reject</ButtonCustom>
                    <ButtonCustom icon={<IconTarget />} variant='primary'>Accept PO</ButtonCustom>
                    <ButtonCustom icon={<IconPlus />} variant='primary'>New Accept PO</ButtonCustom>
                    <ButtonCustom icon={<IconArrowBack />} variant='secondary'>Back to list</ButtonCustom>
                    <ButtonCustom variant='primary'>Submit Accept DO Form</ButtonCustom>
                    <ButtonCustom variant='tertiary'>Cancel</ButtonCustom>
                </div>
            </div>

            <div className="text-center">
                <h1 className='font-inter font-bold mb-4'>Fields</h1>
                <div className="p-6 rounded-lg">
                    <Field icon={<IconSearch />} placeholder='Search by PO Number' color='stone-400' onChange={handleSearch} />
                </div>
            </div>

            <div className="text-center">
                <h1 className='font-inter font-bold mb-4'>Tabs</h1>
                <div className="p-6 rounded-lg">
                    <Tab icon={<IconBell/>}>Requests</Tab>
                </div>
            </div>

            <div className="text-center">
                <h1 className='font-inter font-bold mb-4'>SnackBar</h1>
                <div className="grid grid-cols-2 gap-4 p-6 rounded-lg">
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

            <div className='text-center'>
                <h1 className='font-inter font-bold mb-4'>Testing Logos</h1>
                <Image src="/Logo_WAMS.svg" alt="Icon" width={250} height={250} />
            </div>

            <div className='text-center'>
                <h1 className='font-inter font-bold mb-4'>Table</h1>
                <Table headerItems={['Request Number', 'PO Number', 'Requestor', 'Department', 'Request Date', 'Status', 'Action']} contentData={dummyData}></Table>
            </div>
        </div>
    );
}
