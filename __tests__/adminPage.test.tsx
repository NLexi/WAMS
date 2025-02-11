import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminPage from '@/app/protected/admin/page';
import { redirect } from 'next/navigation';

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

jest.spyOn(window, 'alert').mockImplementation(() => { });

global.fetch = jest.fn();

describe('AdminPage', () => {
    const mockUsePermission = require('@/hooks/usePermission').default;

    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    it('redirects to unauthorized if permission is invalid', () => {
        mockUsePermission.mockReturnValue({ isValid: 'invalid', actions: [] });
        render(<AdminPage />);

        expect(redirect).toHaveBeenCalledWith('/unauthorized');
    });

    it('renders the admin page if permission is valid', () => {
        mockUsePermission.mockReturnValue({ isValid: 'valid', actions: ['POST', 'GET', 'DELETE', 'PUT'] });
        render(<AdminPage />);

        expect(screen.getByText('Admin Page')).toBeInTheDocument();
        expect(screen.getByText('Welcome to the admin route')).toBeInTheDocument();
        expect(screen.getByText('POST')).toBeInTheDocument();
        expect(screen.getByText('GET')).toBeInTheDocument();
        expect(screen.getByText('PUT')).toBeInTheDocument();
        expect(screen.getByText('DELETE')).toBeInTheDocument();
    });

    it('handles success admin button click', async () => {
        mockUsePermission.mockReturnValue({ isValid: 'valid', actions: ['POST', 'GET'] });
        (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

        render(<AdminPage />);
        fireEvent.click(screen.getByText('Admin Button'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('/api/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
        });
    });

    it('handles failed admin button click', async () => {
        mockUsePermission.mockReturnValue({ isValid: 'valid', actions: ['POST', 'GET'] });
        (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    
        render(<AdminPage />);
        fireEvent.click(screen.getByText('Admin Button'));
    
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('/api/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            expect(window.alert).toHaveBeenCalledWith('unauthorized');
        });
    });
    
});