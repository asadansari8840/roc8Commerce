'use client';

import {useState} from 'react';
import {api} from '@/trpc/react';
import CONST from './_constants/app-constants';
import {useSession} from './_context/AuthProvider';
import {useIsPrivate} from './_hooks/useRoutes';
import Pagination from '@/app/_components/Pagination';
import CategoryList from '@/app/_components/CategoryList';
import AsyncComponent from './_components/AsyncComponent';

export default function Home() {
    const {isLoading} = useSession();
    const [currentPage, setCurrentPage] = useState(1);
    const {data, refetch, isFetching} = api.category.getCategories.useQuery({page: currentPage});
    useIsPrivate();

    if (isLoading) {
        return <div>Loading....</div>;
    }

    const totalPages = data?.totalPages ?? 1;

    const handlePageChange = async (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            await refetch();
        }
    };

    return (
        <section className="h-[757px] flex items-center justify-center">
            <div className="w-[576px] h-[658px] border border-primary-border rounded-[20px] px-[60px]">
                <h2 className="text-3xl text-center font-semibold mt-[40px]">{CONST.HOME.TITLE}</h2>
                <p className="text-center mt-[23px]">{CONST.HOME.PARA}</p>
                <p className="mt-[33px] text-[20px] font-medium">{CONST.HOME.CAT_TITLE}</p>
                <AsyncComponent isLoading={isFetching}>
                    <CategoryList
                        refetch={refetch}
                        categories={data?.categories ?? []}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </AsyncComponent>
            </div>
        </section>
    );
}
