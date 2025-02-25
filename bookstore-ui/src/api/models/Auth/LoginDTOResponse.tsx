export interface LoginDTOResponse {
    email: string;
    token: string;
    roles: string[];
    expiration: string; 
}
