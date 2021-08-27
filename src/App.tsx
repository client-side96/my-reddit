import React from 'react';
import { RecoilRoot } from 'recoil';
import AuthenticationProvider from './modules/auth/components/AuthenticationProvider';
import { Feed } from './modules/posts';
import GlobalStyle from './globalStyles';

const App: React.FC = () => {
    return (
        <AuthenticationProvider>
            <RecoilRoot>
                <GlobalStyle />
                <Feed />
            </RecoilRoot>
        </AuthenticationProvider>
    );
};

export default App;
