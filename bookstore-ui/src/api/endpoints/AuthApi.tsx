import apiClient from "../Client";
import { LoginDTORequest } from "../models/Auth/LoginDTORequest";
import { LoginDTOResponse } from "../models/Auth/LoginDTOResponse";


export const login = async (credentials: LoginDTORequest) : Promise<boolean> => {
    try {
        const response = await apiClient.post<LoginDTOResponse>('/Auth/Login', credentials);
        const { token, email, roles, expiration } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('roles', JSON.stringify(roles));
        localStorage.setItem('expiration', expiration);

        return true;
    } catch (error) {
        console.error('Error during login:', error);
        return false; 
    }
}

export const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('roles');
    localStorage.removeItem('expiration');
};

export const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
};

export const getUserRoles = (): string[] => {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
};

export const getUserEmail = (): string | null => {
    return localStorage.getItem('email');
};

export const isAuthenticated = (): boolean => {
    const token = getAuthToken();
    const expiration = localStorage.getItem('expiration');

    if (!token || !expiration) return false;

    return new Date(expiration) > new Date();
};