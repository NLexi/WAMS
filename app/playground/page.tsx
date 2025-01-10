'use client'

import { ButtonCustom } from '@/components/custom/Button';
import { Tab } from '../../components/custom/Tab';
import { useSnackbar } from '../../components/custom/Snackbar';
import Navbar from '../../components/custom/Navbar';
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
} from '@tabler/icons-react';

export default function Page() {
    const showSnackbar = useSnackbar();

    const handleClick = (variant: 'success' | 'error' | 'default' | 'info') => {
        showSnackbar(`Context Text`, variant);
    };   

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
        </div>
    );
}
