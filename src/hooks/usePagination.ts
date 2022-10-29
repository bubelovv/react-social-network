import {useMemo} from 'react';

export const usePagination = (totalItems: number, limitItems: number, portionItems: number) => {
    return useMemo(() => {
        let totalPages = Math.ceil(totalItems / limitItems);

        const numbersPages = [];
        for (let i = 0; i < totalPages; i++) {
            numbersPages.push(i + 1);
        }

        let pagesLeft = (portionItems - 1) * limitItems + 1;
        let pagesRight = portionItems * limitItems;
        let filterNumbersPages = numbersPages.filter(page => page >= pagesLeft && page <= pagesRight);

        return [filterNumbersPages , totalPages];
    }, [totalItems, limitItems, portionItems]);
};
