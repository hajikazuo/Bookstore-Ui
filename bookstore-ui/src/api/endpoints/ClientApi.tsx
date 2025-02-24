import apiClient from "../Client";
import { ClientDTOResponse } from "../models/Clients/ClienteDTOResponse";
import { PaginationHeader } from "../models/pagination/PaginationHeader";
import { PaginationParams } from "../models/pagination/PaginationParams";

export const getClients = async (
    paginationParams: PaginationParams
): Promise<{ data: ClientDTOResponse[]; pagination: PaginationHeader }> => {
    const response = await apiClient.get<ClientDTOResponse[]>('/Client/GetAll', {
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