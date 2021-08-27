import React from 'react';
import { RecoilRoot } from 'recoil';
import { createGlobalStyle } from 'styled-components';
import AuthenticationProvider from './modules/auth/components/AuthenticationProvider';
import { Feed } from './modules/posts';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Segoe UI;
    box-sizing: border-box;
  }
`;

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
