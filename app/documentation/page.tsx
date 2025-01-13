import { ButtonCustom } from '@/components/custom/Button';

export default function DocumentationPage() {

    return (
        <div className="flex items-center justify-center min-h-screen w-">
            <div className='p-8 bg-slate-100 rounded-md shadow flex flex-col m-auto justify-center items-center gap-4 border-b-2 border-r-2'>
                <p className='font-outfit font-bold text-lg hover:cursor-default'>Component List</p>
                <div className='grid grid-cols-3 gap-4'>
                    <ButtonCustom variant='secondary' type='link' destination='/documentation/button'>Button</ButtonCustom>
                    <ButtonCustom variant='secondary' type='link' destination='/documentation/navbar'>Navbar</ButtonCustom>
                    <ButtonCustom variant='secondary' type='link' destination='/documentation/tabs'>Tabs</ButtonCustom>
                    <ButtonCustom variant='secondary' type='link' destination='/documentation/snackbar'>Snackbar</ButtonCustom>
                    <ButtonCustom variant='secondary' type='link' destination='/documentation/fileupload'>File Upload</ButtonCustom>
                    <ButtonCustom variant='secondary' type='link' destination='/documentation/form'>Form Modal</ButtonCustom>
                </div>
                <p className='font-outfit font-bold text-lg hover:cursor-default pt-4'>Important Resources</p>
                <div className='grid grid-cols-1 gap-4'>
                    <ButtonCustom variant='secondary' type='link' destination='/documentation/resources'>Resources</ButtonCustom>
                </div>
            </div>
        </div>

    );
}
