// src/hooks/usePagination.ts
import { useState } from 'react';

interface UsePaginationProps {
    totalItems: number;
    itemsPerPage: number;
    initialPage?: number;
}

export const usePagination = ({ totalItems, itemsPerPage, initialPage = 1 }: UsePaginationProps) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const goToPage = (page: number) => {
        const pageNumber = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(pageNumber);
    };

    const nextPage = () => goToPage(currentPage + 1);
    const prevPage = () => goToPage(currentPage - 1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return {
        currentPage,
        totalPages,
        startIndex,
        endIndex,
        nextPage,
        prevPage,
        goToPage,
        canGoNext: currentPage < totalPages,
        canGoPrev: currentPage > 1,
    };
};