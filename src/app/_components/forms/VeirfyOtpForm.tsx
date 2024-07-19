'use client';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import Button from '../Button';
import OtpInput from '../OptInput';
import {api} from '@/trpc/react';
import {useRouter} from 'next/navigation';
import toast from 'react-hot-toast';
import {User} from '@/app/_context/AuthContext';
import {useSession} from '@/app/_context/AuthProvider';

const VerifyOtpForm = () => {
    const {setIsAuthenticated} = useSession();
    const router = useRouter();
    const [error, setError] = useState(false);
    const {control, handleSubmit, setValue, getValues, reset} = useForm({
        defaultValues: {
            otp: [''],
        },
    });
    const utils = api.useUtils();
    const verifyuser = api.user.verifyUser.useMutation({
        onSuccess: async (data) => {
            setIsAuthenticated(data.user as unknown as User, data.accessToken);
            await utils.user.invalidate();
            toast.success(data.message);
            router.push('/');
        },
        onError: (error) => {
            toast.error(error.message ?? 'Something went wrong');
        },
    });

    const submitHandler = async (value: string) => {
        if (value.length == 8) {
            setError(false);
            await verifyuser.mutateAsync({otp: value});
            reset({otp: []});
        } else {
            setError(true);
        }
    };

    return (
        <form
            onSubmit={handleSubmit((e) => submitHandler(e.otp.join('')))}
            className="space-y-[32px]"
        >
            <OtpInput
                setValue={setValue}
                label="Code"
                control={control}
                name="otp"
            />
            {error && <p className="text-red-500">Otp must be of 8 diigts</p>}
            <Button
                type="submit"
                className="w-full"
                isLoading={verifyuser.isPending}
            >
                VERIFY
            </Button>
        </form>
    );
};

export default VerifyOtpForm;
