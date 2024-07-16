'use client';
import React from 'react';
import CONST from '../_constants/app-constants';
import Link from 'next/link';
import LoginForm from '../_components/forms/LoginForm';
import {useIsPublic} from '../_hooks/useRoutes';

const LoginPage = () => {
    useIsPublic();
    return (
        <section className="h-[757px] flex items-center justify-center">
            <div className="w-[576px] h-[614px] border border-primary-border rounded-[20px] px-[60px]">
                <div className='text-center'>
                    <h2 className="text-4xl font-semibold py-6">{CONST.LOGIN.TITLE}</h2>
                    <h3 className="my-3 text-2xl font-medium">{CONST.LOGIN.SUBTITLE}</h3>
                    <p>{CONST.LOGIN.PARA}</p>
                </div>
                <LoginForm />
                <hr className="mt-10" />
                <div className="text-center my-12">
                    <span>Don't have an Account ? </span>
                    <Link
                        className="font-medium text-dark-gray-text"
                        href="/signup"
                    >
                        SIGN UP
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
