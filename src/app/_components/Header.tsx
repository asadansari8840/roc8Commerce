'use client';
import React from 'react';
import CONST from '@/app/_constants/app-constants';
import Link from 'next/link';
import {ShoppingCart, Search} from 'lucide-react';
import {useSession} from '../_context/AuthProvider';
import LogoutButton from './LogoutButton';

const Header = () => {
    return (
        <header className="h-[100px] px-2 md:px-3 lg:px-4">
            <UpperHeader />
            <NavContents />
        </header>
    );
};

export default Header;

const UpperHeader = () => {
    const {user} = useSession();
    return (
        <div className="text-sm gap-5 w-full h-9 flex items-center justify-end">
            {user?.email && <LogoutButton />}
            <Link href="#">Help</Link>
            <Link href="#">Order & Returns</Link>
            <Link href="#">Hi, {user?.name ?? 'User'}</Link>
        </div>
    );
};

const NavContents = () => {
    return (
        <div className="items-center h-[64px] grid grid-cols-6">
            <h2 className="text-black col-span-1 text-3xl font-semibold">{CONST.NAV.TITLE}</h2>
            <section className="space-x-3 font-semibold col-span-4 flex items-center justify-center">
                {CONST.NAV.LINKS.map((link) => (
                    <Link
                        key={link}
                        href="#"
                        className="hover:opacity-70 transition-all"
                    >
                        {link}
                    </Link>
                ))}
            </section>
            <section className="flex gap-12 col-span-1 items-center justify-end">
                <Search className="cursor-pointer" />
                <ShoppingCart className="cursor-pointer" />
            </section>
        </div>
    );
};
