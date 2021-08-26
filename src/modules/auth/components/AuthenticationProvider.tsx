import React from 'react';
import useAccessToken from '../hooks/useAccessToken';

export const AuthenticationContext = React.createContext<string | null>(null);

const AuthenticationProvider: React.FC = ({ children }) => {
    const token = useAccessToken();

    return (
        <AuthenticationContext.Provider value={token}>{children}</AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;
