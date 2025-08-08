import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import Login from './pages/Login';
import Assess from './pages/Assess';
import Dashboard from './pages/Dashboard';
import { useAuth } from './state/AuthContext';
const RequireAuth = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading)
        return null;
    if (!user)
        return _jsx(Navigate, { to: "/login", state: { from: location }, replace: true });
    return _jsx(_Fragment, { children: children });
};
export default function App() {
    return (_jsx(Container, { maxW: "container.lg", py: 8, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/assess", element: _jsx(RequireAuth, { children: _jsx(Assess, {}) }) }), _jsx(Route, { path: "/dashboard", element: _jsx(RequireAuth, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/dashboard", replace: true }) })] }) }));
}
