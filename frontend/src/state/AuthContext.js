import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import { apiGet, apiPost } from '../api';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const u = await apiGet('/auth/me');
                if (!cancelled)
                    setUser(u);
            }
            catch {
                // ignore
            }
            finally {
                if (!cancelled)
                    setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, []);
    const login = async (username, password) => {
        try {
            const u = await apiPost('/auth/login', { username, password });
            setUser(u);
            return true;
        }
        catch {
            return false;
        }
    };
    const logout = async () => {
        try {
            await apiPost('/auth/logout', {});
        }
        catch { }
        setUser(null);
    };
    return (_jsx(AuthContext.Provider, { value: { user, loading, login, logout }, children: children }));
};
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
