import '@/styles/globals.css';
import {GeistSans} from 'geist/font/sans';
import {type Metadata} from 'next';
import {TRPCReactProvider} from '@/trpc/react';
import AuthProvider from './_context/AuthProvider';
import {Toaster} from 'react-hot-toast';
import Header from './_components/Header';
import ScreenWrapper from './_components/ScreenWrapper';
import Banner from './_components/Banner';

export const metadata: Metadata = {
    title: 'Ecommerce App',
    description: 'This is an assigment given by roc8 and completed by Asad Ansari',
    icons: [{rel: 'icon', url: '/icon.png'}],
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html
            lang="en"
            className={`${GeistSans.variable}`}
        >
            <body>
                <TRPCReactProvider>
                    <AuthProvider>
                        <Toaster position="top-center" />
                        <ScreenWrapper>
                            <Header />
                            <Banner />
                            {children}
                        </ScreenWrapper>
                    </AuthProvider>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
