import apiClient from "../Client";
import { BookDTORequest } from "../models/Books/BookDTORequest";
import { BookDTOResponse } from "../models/Books/BookDTOResponse";
import { PaginationHeader } from "../models/pagination/PaginationHeader";
import { PaginationParams } from "../models/pagination/PaginationParams";

export const getBooks = async (
    paginationParams: PaginationParams
): Promise<{ data: BookDTOResponse[]; pagination: PaginationHeader }> => {
    const response = await apiClient.get<BookDTOResponse[]>('/Book/GetAll', {
        params: paginationParams,
    });

    const paginationHeader = response.headers['pagination'];

    const parsedPagination = paginationHeader ? JSON.parse(paginationHeader) : null;

    const pagination: PaginationHeader = parsedPagination
        ? {
            currentPage: Number(parsedPagination.currentPage),
            pageSize: Number(parsedPagination.itemsPerPage),
            totalCount: Number(parsedPagination.totalItems),
            totalPages: Number(parsedPagination.totalPages),
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

export const addBook = async (book: BookDTORequest): Promise<void> => {
    try {
        await apiClient.post('/Book/Add', book);  
    } catch (error) {
        console.error('Error adding book:', error);
        throw new Error('Failed to add book');
    }
};