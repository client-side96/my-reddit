import React from 'react';
import { RecoilRoot } from 'recoil';
import AuthenticationProvider from './modules/auth/components/AuthenticationProvider';
import { Feed } from './modules/posts';

const App: React.FC = () => {
    return (
        <AuthenticationProvider>
            <RecoilRoot>
                <Feed />
            </RecoilRoot>
        </AuthenticationProvider>
    );
};

export default App;
