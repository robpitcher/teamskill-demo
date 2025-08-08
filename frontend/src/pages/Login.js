import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Card, CardBody, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
export default function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const ok = await login(username, password);
        if (ok) {
            const redirectTo = location.state?.from?.pathname || '/dashboard';
            navigate(redirectTo, { replace: true });
        }
        else {
            setError('Invalid credentials');
        }
    };
    return (_jsxs(Stack, { align: "center", spacing: 6, children: [_jsx(Heading, { children: "Sign In" }), _jsx(Card, { w: "sm", children: _jsx(CardBody, { children: _jsx("form", { onSubmit: handleSubmit, children: _jsxs(Stack, { spacing: 4, children: [_jsxs(FormControl, { children: [_jsx(FormLabel, { children: "Username" }), _jsx(Input, { value: username, onChange: (e) => setUsername(e.target.value) })] }), _jsxs(FormControl, { children: [_jsx(FormLabel, { children: "Password" }), _jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value) })] }), error && _jsx(Text, { color: "red.500", children: error }), _jsx(Button, { type: "submit", colorScheme: "blue", children: "Sign In" })] }) }) }) })] }));
}
