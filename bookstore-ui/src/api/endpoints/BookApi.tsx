import apiClient from "../Client";
import { BookDTO } from "../models/BookDTO";
import { PaginationHeader } from "../models/pagination/PaginationHeader";
import { PaginationParams } from "../models/pagination/PaginationParams";

export const getBooks = async (
    paginationParams: PaginationParams
): Promise<{ data: BookDTO[]; pagination: PaginationHeader }> => {
    const response = await apiClient.get<BookDTO[]>('/Book/GetAll', {
        params: paginationParams,
    });
    
    const paginationHeader = response.headers['pagination'];

    const pagination: PaginationHeader = paginationHeader
    ? {
        currentPage: Number(paginationHeader.currentPage),
        pageSize: Number(paginationParams.pageSize),
        totalCount: Number(paginationHeader.totalItems),
        totalPages: Number(paginationHeader.totalPages),
    }
    : {
        currentPage: 1,
        pageSize: paginationParams.pageSize,
        totalCount: 0,
        totalPages: 1,
    };

    return {
        data: response.data,
        pagination,
    };
};