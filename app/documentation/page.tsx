import { redirect } from 'next/navigation';

export default function DocumentationPage() {

    return (
        redirect('/documentation/button')
    );
}
