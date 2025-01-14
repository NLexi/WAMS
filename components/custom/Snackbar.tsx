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

const SNACKBAR_TIMER = 5000;

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
