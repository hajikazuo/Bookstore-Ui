import { TextField, Button, Box, Typography, Container, CircularProgress, Paper } from "@mui/material";
import { useLogin } from "../hooks/auth/LoginHook";

const Login = () => {
    const { credentials, loading, error, handleChange, handleLogin } = useLogin();

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
                    <TextField
                        label="E-mail"
                        name="email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : "Login"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
