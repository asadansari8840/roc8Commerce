import React from 'react';

type ScreenWrapper = {
    children?: React.ReactNode;
    className?: string;
};
/**
 * This is the utiliy screen wrapper for different pages for restricting the max width !
 * @param children ReactNode
 * @param className string
 * @returns
 */
const ScreenWrapper: React.FC<ScreenWrapper> = async ({children, className = ''}) => {
    return (
        <div className="flex items-center justify-center w-full">
            <section className={['w-full max-w-[1440px]', className].join(' ')}>{children}</section>
        </div>
    );
};

export default ScreenWrapper;
