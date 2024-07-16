import {api} from '@/trpc/react';
import React, {useEffect, useState} from 'react';
import toast from 'react-hot-toast';

interface Category {
    id: number;
    name: string;
    isSavedByUser: boolean;
}

interface CategoryListProps {
    categories: Category[];
    refetch: () => void;
}

const CategoryList: React.FC<CategoryListProps> = ({categories, refetch}) => {
    return (
        <div className="h-[350px] flex flex-col justify-evenly">
            {categories.map((category) => {
                const {id, isSavedByUser, name} = category;
                return (
                    <CategoryItem
                        key={id}
                        id={id}
                        isSavedByUser={isSavedByUser}
                        name={name}
                        refetch={refetch}
                    />
                );
            })}
        </div>
    );
};

export default CategoryList;

const CategoryItem = ({id, isSavedByUser, name, refetch}: {id: number; isSavedByUser: boolean; name: string; refetch: () => void}) => {
    const [isSelected, setIsSelected] = useState(isSavedByUser ?? false);
    const mutation = api.category.saveUnsaveCategory.useMutation();

    useEffect(() => {
        setIsSelected(isSavedByUser);
    }, [isSavedByUser]);

    const onEditHandler = async (id: number) => {
        await mutation
            .mutateAsync({categoryId: id})
            .then((res) => {
                toast.success(res.message);
            })
            .catch(() => {
                toast.error('Something went wrong');
            });
        refetch();
    };

    return (
        <div
            key={id}
            onClick={async () => {
                setIsSelected((prev) => !prev);
                await onEditHandler(id);
            }}
            className="flex gap-4 cursor-pointer hover:bg-black/10 transition-all items-center"
        >
            <input
                type="checkbox"
                className="size-5"
                checked={isSelected}
            />
            <p>{name}</p>
        </div>
    );
};
