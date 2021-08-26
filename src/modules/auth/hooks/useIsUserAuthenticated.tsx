import React from 'react';
import useAuthorization from './useAuthorization';
import { useFetchBaseAuth } from '../../../hooks/useFetch';
// import { REDIRECT_URI } from '../../../shared/constants';
import { getValueFromLocalStorage } from '../../../shared/helpers';
import {
    buildAuthorizationFormData,
    buildRefreshTokenFormData,
    isTokenExpired,
    setAuthorizationValuesInStorage,
} from '../helpers';
import { TokenResponse } from '../types';
import { REDIRECT_URI } from '../../../shared/constants';

const useIsUserAuthenticated = (): string | null => {
    const [authorizationCode, redirectToReddit] = useAuthorization();

    const savedToken = React.useRef(getValueFromLocalStorage('token'));
    const refreshToken = React.useRef(getValueFromLocalStorage('refresh'));

    const authenticate = useFetchBaseAuth<TokenResponse>(
        '/access_token',
        buildAuthorizationFormData(authorizationCode),
        'POST'
    );

    const refresh = useFetchBaseAuth<TokenResponse>(
        '/access_token',
        buildRefreshTokenFormData(refreshToken.current),
        'POST'
    );

    const updateStorage = (data: TokenResponse): void => {
        savedToken.current = data.access_token;
        refreshToken.current = data.refresh_token;
        setAuthorizationValuesInStorage(data);
    };

    const handleUserAuthentication = React.useCallback(async (): Promise<void | TokenResponse> => {
        return authenticate().then((data: TokenResponse) => {
            if (data.error) {
                redirectToReddit();
            } else {
                updateStorage(data);
                window.location.href = REDIRECT_URI;
            }
        });
    }, [redirectToReddit, authenticate]);

    const handleTokenRefresh = React.useCallback(async (): Promise<void | TokenResponse> => {
        return refresh().then((data: TokenResponse) => {
            if (data.error) {
                redirectToReddit();
            } else {
                updateStorage(data);
            }
        });
    }, [redirectToReddit, refresh]);

    React.useEffect(() => {
        const userIsNotAuthorized =
            !authorizationCode && !savedToken.current && !refreshToken.current;
        const userIsNotAuthenticated =
            authorizationCode && !savedToken.current && !refreshToken.current;
        const userTokenIsExpired =
            !authorizationCode && savedToken.current && refreshToken.current && isTokenExpired();

        if (userIsNotAuthorized) {
            redirectToReddit();
        } else if (userIsNotAuthenticated) {
            handleUserAuthentication();
        } else if (userTokenIsExpired) {
            handleTokenRefresh();
        }
    }, [
        authorizationCode,
        savedToken,
        refreshToken,
        redirectToReddit,
        handleTokenRefresh,
        handleUserAuthentication,
    ]);

    return savedToken.current;
};

export default useIsUserAuthenticated;
