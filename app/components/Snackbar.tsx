'use client';

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

interface SnackbarContextType {
  (message: string, variant?: 'success' | 'error' | 'default' | 'info'): void;
}

interface SnackbarProviderProps {
  children: ReactNode;
}

interface SnackbarState {
  show: boolean;
  message: string;
  variant: 'success' | 'error' | 'default' | 'info';
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

const SNACKBAR_TIMER = 10000;

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
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
    (message, variant = 'success') => {
      setSnackbar({ show: true, message, variant });

      // Clear the existing timer if it exists
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set a new timer to hide the snackbar after 5 seconds
      timerRef.current = setTimeout(() => {
        handleSnackbarClose();
        timerRef.current = null;
      }, SNACKBAR_TIMER);
    },
    []
  );

  useEffect(() => {
    // Clean up the timer when the component unmounts
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
          'transition-transform bottom-8 font-medium right-8 fixed flex justify-between gap-2 items-center shadow-md min-h-[54px] max-w-[50vw] px-4 py-2 rounded-md min-w-[300px] text-sm truncate whitespace-nowrap bg-transparent border-l-4 border-[1px]',
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
          {snackbar?.variant === 'success' && (
            <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='stroke-approve'>
              <path d="M3.33337 14.1667V15.8333C3.33337 16.2754 3.50897 16.6993 3.82153 17.0119C4.13409 17.3244 4.55801 17.5 5.00004 17.5H15C15.4421 17.5 15.866 17.3244 16.1786 17.0119C16.4911 16.6993 16.6667 16.2754 16.6667 15.8333V14.1667M5.83337 9.16668L10 13.3333M10 13.3333L14.1667 9.16668M10 13.3333V3.33334" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {snackbar?.variant === 'error' && (
            <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='stroke-reject'>
              <path d="M3.33337 14.1667V15.8333C3.33337 16.2754 3.50897 16.6993 3.82153 17.0119C4.13409 17.3244 4.55801 17.5 5.00004 17.5H15C15.4421 17.5 15.866 17.3244 16.1786 17.0119C16.4911 16.6993 16.6667 16.2754 16.6667 15.8333V14.1667M5.83337 9.16668L10 13.3333M10 13.3333L14.1667 9.16668M10 13.3333V3.33334" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {snackbar?.variant === 'info' && (
            <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='stroke-info'>
              <path d="M3.33337 14.1667V15.8333C3.33337 16.2754 3.50897 16.6993 3.82153 17.0119C4.13409 17.3244 4.55801 17.5 5.00004 17.5H15C15.4421 17.5 15.866 17.3244 16.1786 17.0119C16.4911 16.6993 16.6667 16.2754 16.6667 15.8333V14.1667M5.83337 9.16668L10 13.3333M10 13.3333L14.1667 9.16668M10 13.3333V3.33334" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {snackbar?.variant === 'default' && (
            <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='stroke-slate-500'>
              <path d="M3.33337 14.1667V15.8333C3.33337 16.2754 3.50897 16.6993 3.82153 17.0119C4.13409 17.3244 4.55801 17.5 5.00004 17.5H15C15.4421 17.5 15.866 17.3244 16.1786 17.0119C16.4911 16.6993 16.6667 16.2754 16.6667 15.8333V14.1667M5.83337 9.16668L10 13.3333M10 13.3333L14.1667 9.16668M10 13.3333V3.33334" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <div className='flex flex-col'>
            <div className='font-bold text-base font-button'>{snackbar?.message}</div>
            <div className='font-light text-ss font-button'>meta text</div>
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