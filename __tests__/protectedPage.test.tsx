import { render, screen, waitFor } from '@testing-library/react';
import ProtectedPage from '@/app/protected/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/components/LogoutButton', () => () => <div>LogoutButton</div>);

describe('ProtectedPage', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('redirects to login if no user role is found', async () => {
        render(<ProtectedPage />);

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/login');
        });
    });

    it('renders the protected page if user role is found', async () => {
        sessionStorage.setItem('UserRole', 'ADMIN');
        render(<ProtectedPage />);

        await waitFor(() => {
            expect(screen.getByText('Protected Page')).toBeInTheDocument();
            expect(screen.getByText('Welcome to the protected route')).toBeInTheDocument();
            expect(screen.getByText('Admin')).toBeInTheDocument();
            expect(screen.queryByText('Editor')).toBeInTheDocument();
        });
    });

    it('renders the editor button if user role is EDITOR', async () => {
        sessionStorage.setItem('UserRole', 'EDITOR');
        render(<ProtectedPage />);

        await waitFor(() => {
            expect(screen.getByText('Protected Page')).toBeInTheDocument();
            expect(screen.getByText('Welcome to the protected route')).toBeInTheDocument();
            expect(screen.getByText('Editor')).toBeInTheDocument();
            expect(screen.queryByText('Admin')).not.toBeInTheDocument();
        });
    });

    it("does not render Admin or Editor buttons for a normal user", async () => {
        sessionStorage.setItem("UserRole", "USER");
        render(<ProtectedPage />);

        await waitFor(() => {
            expect(screen.queryByText("Admin")).not.toBeInTheDocument();
            expect(screen.queryByText("Editor")).not.toBeInTheDocument();
        });
    });

    it("navigates to /protected/admin when Admin button is clicked", async () => {
        sessionStorage.setItem("UserRole", "ADMIN");
        render(<ProtectedPage />);
    
        await waitFor(() => {
            screen.getByText("Admin").click();
            expect(mockPush).toHaveBeenCalledWith("/protected/admin");
        });
    });
    
    it("navigates to /protected/editor when Editor button is clicked", async () => {
        sessionStorage.setItem("UserRole", "EDITOR");
        render(<ProtectedPage />);
    
        await waitFor(() => {
            screen.getByText("Editor").click();
            expect(mockPush).toHaveBeenCalledWith("/protected/editor");
        });
    });

    it("renders LogoutButton component", async () => {
        sessionStorage.setItem("UserRole", "ADMIN");
        render(<ProtectedPage />);
    
        await waitFor(() => {
            expect(screen.getByText("LogoutButton")).toBeInTheDocument();
        });
    });    
});