'use client'

import { ButtonCustom } from "@/components/custom/Button"
import { useSnackbar } from "@/components/custom/Snackbar";
import { IconArrowBack } from "@tabler/icons-react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function SnackbarDocumentation() {

  const showSnackbar = useSnackbar();

  const handleClick = (variant: 'success' | 'error' | 'default' | 'info') => {
    showSnackbar(`Message`, variant);
  };

  const codestring = `
'use client';

import { IconDownload } from '@tabler/icons-react';
import classNames from 'classnames';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IoMdClose } from 'react-icons/io';

type SnackbarVariant = 'success' | 'error' | 'default' | 'info';

type SnackbarContextType = (message: string, variant?: SnackbarVariant, subMessage?: string) => void;

type SnackbarProviderProps = {
  children: ReactNode;
};

type SnackbarState = {
  show: boolean;
  message: string;
  subMessage?: string;
  variant: SnackbarVariant;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

const SNACKBAR_TIMER = 10000;

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    show: false,
    message: '',
    variant: 'success',
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, show: false }));
  };

  const showSnackbar = useCallback<SnackbarContextType>(
    (message, variant = 'success', subMessage = 'meta text') => {
      setSnackbar({ show: true, message, subMessage, variant });

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        handleSnackbarClose();
        timerRef.current = null;
      }, SNACKBAR_TIMER);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <div
        className={classNames(
          'transition-transform bottom-8 font-medium right-8 fixed flex justify-between gap-2 items-center shadow-md min-h-[54px] max-w-[50vw] px-4 py-2 rounded-md min-w-[300px] text-sm truncate whitespace-nowrap bg-white border-l-4 border-[1px]',
          {
            ['border-approve']: snackbar?.variant === 'success',
            ['border-reject']: snackbar?.variant === 'error',
            ['border-slate-400']: snackbar?.variant === 'default',
            ['border-info']: snackbar?.variant === 'info',
            ['translate-x-[200%]']: !snackbar?.show,
            ['translate-x-0']: snackbar?.show,
          }
        )}
      >
        <div className="flex items-center gap-4 flex-grow">
          {snackbar?.variant === 'success' && (<IconDownload className='text-approve' />)}
          {snackbar?.variant === 'error' && (<IconDownload className='text-reject' />)}
          {snackbar?.variant === 'info' && (<IconDownload className='text-info' />)}
          {snackbar?.variant === 'default' && (<IconDownload className='text-slate-500' />)}
          <div className="flex flex-col">
            <div className="font-bold text-base">{snackbar?.message}</div>
            <div className="font-light text-ss">{snackbar?.subMessage}</div>
          </div>
        </div>
        <div className="w-px h-full bg-slate-500 mx-2" />
        <div
          className="hover:bg-slate-100 p-1 rounded-full cursor-pointer"
          onClick={handleSnackbarClose}
        >
          <IoMdClose size={20} />
        </div>
      </div>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

    `

  return (
    <div className="container mx-auto py-12 p-4">
      <div className="flex justify-between items-center pb-2 text-black">
        <h4 className="text-[1.75rem] font-bold font-outfit leading-8">Snackbar Documentation</h4>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <ButtonCustom variant='secondary' icon={<IconArrowBack />} type="link" destination="/documentation">Back to component list</ButtonCustom>
          </div>
        </div>
      </div>
      <div className="flex py-4">
        <div className="basis-1/4 border-r-2 flex flex-col gap-6 h-[55vh] py-4 pr-1">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-[#323C43]">Variant</p>
            <p className="text-base text-[#4A5863]">success, error, default, info     </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-[#323C43]">Message</p>
            <p className="text-base text-[#4A5863]">main message with bold font</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-[#323C43]">SubMessage</p>
            <p className="text-base text-[#4A5863]">smaller message with normal font</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-[#323C43]">How to use</p>
            <p className="text-base text-[#4A5863]">call useSnackBar(<span className="font-bold">[variant]</span>) on an onClick component</p>
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
        <ButtonCustom variant="primary" color="green" onClick={() => handleClick('success')}>success</ButtonCustom>
        <ButtonCustom variant="primary" color="red" onClick={() => handleClick('error')}>error</ButtonCustom>
        <ButtonCustom variant="primary" onClick={() => handleClick('default')}>default</ButtonCustom>
        <ButtonCustom variant="secondary" onClick={() => handleClick('info')}>info</ButtonCustom>
      </div>
    </div>
  )
};