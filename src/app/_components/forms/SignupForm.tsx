'use client';
import React from 'react';
import {api} from '@/trpc/react';
import {useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '../Input';
import CONST from '@/app/_constants/app-constants';
import Button from '../Button';
import {useRouter} from 'next/navigation';
import {useSession} from '@/app/_context/AuthProvider';
import type {User} from '@/app/_context/AuthContext';

const SignupForm = () => {
    const router = useRouter();
    const defaultValue = {
        name: '',
        email: '',
        password: '',
    };
    const {setIsAuthenticated} = useSession();
    const {control, handleSubmit, reset} = useForm({
        defaultValues: defaultValue,
    });

    const utils = api.useUtils();

    const createUser = api.user.signup.useMutation({
        onSuccess: async (data) => {
            setIsAuthenticated(data.user as unknown as User, data.accessToken);
            await utils.user.invalidate();
            reset(defaultValue);
            toast.success('User created successfully');
            router.push('/');
        },
        onError: (error) => {
            toast.error(error.message ?? 'Something went wrong');
        },
    });

    return (
        <form
            onSubmit={handleSubmit(async (e) => {
                await createUser.mutateAsync(e);
            })}
            className="space-y-[32px]"
        >
            {CONST.SIGNUP.INPUTS.map((input) => (
                <Input
                    key={input}
                    type={input == 'name' ? 'text' : input}
                    name={input}
                    label={input}
                    control={control}
                />
            ))}
            <Button
                isLoading={createUser.isPending}
                type="submit"
                className="w-full"
            >
                Create Account
            </Button>
        </form>
    );
};

export default SignupForm;
