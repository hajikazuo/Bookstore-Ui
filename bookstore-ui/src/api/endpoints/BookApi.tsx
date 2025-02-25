import apiClient from "../Client";
import { BookDTORequest } from "../models/Books/BookDTORequest";
import { BookDTOResponse } from "../models/Books/BookDTOResponse";
import { PaginationHeader } from "../models/pagination/PaginationHeader";
import { PaginationParams } from "../models/pagination/PaginationParams";
import { getAuthToken } from "./AuthApi";

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

export const getBookById = async (id: string): Promise<BookDTOResponse> => {
    try {
        const response = await apiClient.get<BookDTOResponse>(`/Book/GetById/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching book:', error);
        throw new Error('Failed to fetch book');

    }
};

export const addBook = async (book: BookDTORequest): Promise<void> => {
    try {
        await apiClient.post('/Book/Add', book);
    } catch (error) {
        console.error('Error adding book:', error);
        throw new Error('Failed to add book');
    }
};

export const updateBook = async (id: string, book: BookDTOResponse
): Promise<void> => {
    try {
        await apiClient.put<BookDTOResponse>(`/Book/Update/${id}`, book);
    } catch (error) {
        console.error('Error updating book:', error);
        throw new Error('Failed to update book');
    }
}

export const deleteBook = async (id: string): Promise<void> => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("No token found");
    }
    
    try {
        await apiClient.delete(`/Book/Remove/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
    } catch (error) {
        console.error('Error deleting book:', error);
        throw new Error('Failed to delete book');
    }
};