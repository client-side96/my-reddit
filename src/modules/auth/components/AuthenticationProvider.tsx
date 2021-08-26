import React from 'react';
import useIsUserAuthenticated from '../hooks/useIsUserAuthenticated';

export const AuthenticationContext = React.createContext<string | null>(null);

const AuthenticationProvider: React.FC = ({ children }) => {
    const token = useIsUserAuthenticated();

    return (
        <AuthenticationContext.Provider value={token}>{children}</AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;
