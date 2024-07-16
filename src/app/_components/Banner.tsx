import React from 'react';
import CONST from '@/app/_constants/app-constants';
import {ChevronLeft, ChevronRight} from 'lucide-react';

const Banner = () => {
    return (
        <div className="h-9 bg-primary-light-gray flex gap-6 items-center justify-center px-2 md:px-3 lg:px-4">
            <ChevronLeft size={16} />
            <span>{CONST.BANNER}</span>
            <ChevronRight size={16} />
        </div>
    );
};

export default Banner;
