import React from 'react';
import AuthenticationProvider from './modules/auth/components/AuthenticationProvider';
import { Feed } from './modules/feed';

const App: React.FC = () => {
    return (
        <AuthenticationProvider>
            <Feed />
        </AuthenticationProvider>
    );
};

export default App;
