import {api} from '@/trpc/react';
import React from 'react';
import Button from './Button';
import {LogOut} from 'lucide-react';
import {useSession} from '../_context/AuthProvider';
import {useRouter} from 'next/navigation';

const LogoutButton = () => {
    const router = useRouter();
    const mutation = api.user.logout.useMutation();
    const {setIsAuthenticated} = useSession();
    
    const logoutHandler = async () => {
        await mutation.mutateAsync();
        setIsAuthenticated(null, null);
        sessionStorage.removeItem('access_token');
        router.push('/login');
    };

    return (
        <Button
            onClick={logoutHandler}
            isLoading={mutation.isPending}
            className="w-fit px-4 py-0 h-full text-sm"
        >
            <LogOut
                className="mr-3"
                size={18}
            />
            Logout
        </Button>
    );
};

export default LogoutButton;
