import { render, screen } from '@testing-library/react';
import EditorPage from '@/app/protected/editor/page';
import { redirect } from 'next/navigation';

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

describe('EditorPage', () => {
    const mockUsePermission = require('@/hooks/usePermission').default;

    it('redirects to unauthorized if permission is invalid', () => {
        mockUsePermission.mockReturnValue({ isValid: 'invalid', actions: [] });
        render(<EditorPage />);

        expect(redirect).toHaveBeenCalledWith('/unauthorized');
    });

    it('renders the editor page if permission is valid', () => {
        mockUsePermission.mockReturnValue({ isValid: 'valid', actions: ['POST', 'GET', 'DELETE', 'PUT'] });
        render(<EditorPage />);

        expect(screen.getByText('Editor Page')).toBeInTheDocument();
        expect(screen.getByText('welcome to the editor route')).toBeInTheDocument();
        expect(screen.getByText('POST')).toBeInTheDocument();
        expect(screen.getByText('GET')).toBeInTheDocument();
        expect(screen.getByText('PUT')).toBeInTheDocument();
        expect(screen.getByText('DELETE')).toBeInTheDocument();
    });
});