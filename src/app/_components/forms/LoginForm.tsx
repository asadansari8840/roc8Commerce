'use client';
import React from 'react';
import {api} from '@/trpc/react';
import {useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation';
import CONST from '@/app/_constants/app-constants';
import Button from '../Button';
import Input from '../Input';
import {useSession} from '@/app/_context/AuthProvider';
import type {User} from '@/app/_context/AuthContext';

const LoginForm = () => {
    const router = useRouter();
    const {setIsAuthenticated} = useSession();

    const {control, handleSubmit} = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const loginUser = api.user.login.useMutation({
        onSuccess: (data) => {
            setIsAuthenticated(data.user as unknown as User, data.accessToken);
            toast.success('Logged in successfully');
            router.push('/');
        },
        onError: (error) => {
            toast.error(error.message ?? 'Something went wrong');
        },
    });

    return (
        <form
            onSubmit={handleSubmit((e) => loginUser.mutate(e))}
            className="space-y-[32px]"
        >
            {CONST.LOGIN.INPUTS.map((input) => (
                <Input
                    label={input}
                    key={input}
                    name={input}
                    control={control}
                    type={input}
                />
            ))}
            <Button
                isLoading={loginUser.isPending}
                type="submit"
                className="w-full"
            >
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
