import React from 'react';
import { AUTHORIZATION_URL } from '../../../shared/constants';
import { AuthorizationParams } from '../types';

const useAuthorization = (): [string | undefined, () => void] => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params: AuthorizationParams = Object.fromEntries(
        urlSearchParams.entries()
    ) as AuthorizationParams;

    const authCode = React.useRef<string | undefined>(params.code);

    const redirectToRedditAuthorization = () => {
        window.location.href = AUTHORIZATION_URL;
    };

    React.useEffect(() => {
        if (params.code) {
            authCode.current = params.code;
        }
    }, [params]);

    return [authCode.current, redirectToRedditAuthorization];
};

export default useAuthorization;
