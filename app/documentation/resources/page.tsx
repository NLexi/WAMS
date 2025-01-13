import { ButtonCustom } from "@/components/custom/Button"
import { IconArrowBack, IconTarget } from "@tabler/icons-react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ResourceDocumentation() {

    const codestring = `npm install @tabler/icons-react
npx shadcn@latest init -d
npm install --save react-dropzone
npm install --save zod`

    const codeerror = `npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR!
npm ERR! While resolving: cmdk@1.0.0
npm ERR! Found: react@19.0.0
npm ERR! node_modules/react
npm ERR!   peer react@">=16.8.0" from @floating-ui/react-dom@2.1.2
npm ERR!   node_modules/@floating-ui/react-dom
npm ERR!     @floating-ui/react-dom@"^2.0.0" from @radix-ui/react-popper@1.2.1
npm ERR!     node_modules/@radix-ui/react-popper
npm ERR!       @radix-ui/react-popper@"1.2.1" from @radix-ui/react-menu@2.1.4
npm ERR!       node_modules/@radix-ui/react-menu
npm ERR!         @radix-ui/react-menu@"2.1.4" from @radix-ui/react-dropdown-menu@2.1.4
npm ERR!         node_modules/@radix-ui/react-dropdown-menu
npm ERR!       2 more (@radix-ui/react-popover, @radix-ui/react-select)
npm ERR!   peer react@"^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" from @radix-ui/react-alert-dialog@1.1.4
npm ERR!   node_modules/@radix-ui/react-alert-dialog
npm ERR!     @radix-ui/react-alert-dialog@"^1.1.4" from the root project
npm ERR!   50 more (@radix-ui/react-arrow, @radix-ui/react-checkbox, ...)
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^18.0.0" from cmdk@1.0.0
npm ERR! node_modules/cmdk
npm ERR!   cmdk@"^1.0.0" from the root project
npm ERR!
npm ERR! Conflicting peer dependency: react@18.3.1
npm ERR! node_modules/react
npm ERR!   peer react@"^18.0.0" from cmdk@1.0.0
npm ERR!   node_modules/cmdk
npm ERR!     cmdk@"^1.0.0" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.`

    return (
        <div className="container mx-auto py-12">
            <div className="flex justify-between items-center pb-2 text-black">
                <h4 className="text-[1.75rem] font-bold font-outfit leading-8">Resource Documentation</h4>
                <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                        <ButtonCustom variant='secondary' icon={<IconArrowBack />} type="link" destination="/documentation">Back to resource list</ButtonCustom>
                    </div>
                </div>
            </div>
            <div className="flex py-4">
                <div className="basis-1/4 border-r-2 flex flex-col gap-6 h-[55vh] py-4 pr-1">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Icon</p>
                        <p className="text-base text-[#4A5863]">all iconography uses <a href="https://tabler.io/icons" className="font-bold">tabler ui</a></p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Components</p>
                        <p className="text-base text-[#4A5863]">basic components other than buttons and tabs use <a href="https://ui.shadcn.com/docs/components/" className="font-bold">shadcn</a>, additionally can also utilize <a href="https://shadcn-extension.vercel.app/docs/introduction" className="font-bold">shadcn extension</a></p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Drag and Drop</p>
                        <p className="text-base text-[#4A5863]"><a href="https://react-dropzone.js.org/" className="font-bold">react-dropzone</a> is used to facilitate drag and drop functionality</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-[#323C43]">Input Validation</p>
                        <p className="text-base text-[#4A5863]"><a href="https://www.npmjs.com/package/zod" className="font-bold">zod</a> is used for input validation in forms</p>
                    </div>
                </div>
                <div className="basis-3/4">
                    <div className="my-auto px-8 py-4">
                        <p className="text-base text-[#323C43] font-semibold font-outfit">Necessary Installations</p>
                        <SyntaxHighlighter
                            language="javascript"
                            style={dracula}
                            wrapLongLines
                            customStyle={{ padding: '8px', borderRadius: '8px', maxWidth: '50rem', maxHeight: '23rem' }}
                        >
                            {codestring}
                        </SyntaxHighlighter>
                        <p className="text-base text-[#323C43] font-semibold font-outfit">Notable Possible Problems with Installation</p>
                        <SyntaxHighlighter
                            language="tsx"
                            style={dracula}
                            wrapLongLines
                            customStyle={{ padding: '8px', borderRadius: '8px', maxWidth: '50rem', maxHeight: '12rem' }}
                        >
                            {codeerror}
                        </SyntaxHighlighter>
                        <p className="text-base text-[#323C43] font-semibold font-outfit">Solution : Add "--legacy-peer-deps" to installation command</p>
                    </div>
                </div>
            </div>
        </div>
    )
};