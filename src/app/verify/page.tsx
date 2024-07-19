'use client';
import React from 'react';
import CONST from '../_constants/app-constants';
import Link from 'next/link';
import SignupForm from '../_components/forms/SignupForm';
import VerifyOtpForm from '../_components/forms/VeirfyOtpForm';
import {useSession} from '../_context/AuthProvider';
import {useIsPrivate} from '../_hooks/useRoutes';

const VerifyPage = () => {
    useIsPrivate();
    const {user} = useSession();
    return (
        <section className="h-[757px] flex items-start mt-10 justify-center">
            <div className="w-[576px] h-[453px] border border-primary-border rounded-[20px] px-[60px]">
                <h2 className="text-4xl text-center font-semibold py-6 my-6">{CONST.VERIFY.TITLE}</h2>
                <div className="w-full items-center justify-center flex my-6">
                    <p className="max-w-[80%] text-center">{CONST.VERIFY.PARA.getParaWithEmail(user?.email)}</p>
                </div>
                <VerifyOtpForm />
            </div>
        </section>
    );
};

export default VerifyPage;
