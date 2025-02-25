import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LoginDTORequest } from "../../api/models/Auth/LoginDTORequest";
import { login } from "../../api/endpoints/AuthApi";

export const useLogin = () => {
    const [credentials, setCredentials] = useState<LoginDTORequest>({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { updateAuthState } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        const success = await login(credentials);

        if (success) {
            updateAuthState();
            navigate("/homepage");
        } else {
            setError("Invalid email or password.");
        }

        setLoading(false);
    };

    return {
        credentials,
        loading,
        error,
        handleChange,
        handleLogin,
    };
};
