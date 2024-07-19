"use client";
import React from 'react';
import CONST from '../_constants/app-constants';
import Link from 'next/link';
import SignupForm from '../_components/forms/SignupForm';
import { useIsPublic } from '../_hooks/useRoutes';

const SignupPage = () => {
    useIsPublic();
    return (
        <section className="h-[757px] flex items-center justify-center">
            <div className="w-[576px] h-[691px] border border-primary-border rounded-[20px] px-[60px]">
                <h2 className="text-4xl text-center font-semibold py-6">{CONST.SIGNUP.TITLE}</h2>
                <SignupForm />
                <div className="text-center my-12">
                    <span>Have an Account ? </span>
                    <Link
                        className="font-medium text-dark-gray-text"
                        href="/login"
                    >
                        LOGIN
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SignupPage;
