import React from 'react';
import useAuthorization from './useAuthorization';
import { getValueFromLocalStorage } from '../../../shared/helpers';
import { isTokenExpired, setAuthorizationValuesInStorage } from '../helpers';
import { TokenResponse } from '../types';
import { REDIRECT_URI } from '../../../shared/constants';
import { getAccessToken, refreshAccessToken } from '../com';

const useAccessToken = (): string | null => {
    const [authorizationCode, redirectToReddit] = useAuthorization();

    const savedAccessToken = React.useRef(getValueFromLocalStorage('token'));
    const savedRefreshToken = React.useRef(getValueFromLocalStorage('refresh'));

    const updateStorage = (data: TokenResponse): void => {
        savedAccessToken.current = data.access_token;
        savedRefreshToken.current = data.refresh_token;
        setAuthorizationValuesInStorage(data);
    };

    const handleUserAuthentication = React.useCallback(async (): Promise<void | TokenResponse> => {
        try {
            const tokenResponse = await getAccessToken(authorizationCode);
            if (tokenResponse.error) {
                redirectToReddit();
            } else {
                updateStorage(tokenResponse);
                window.location.href = REDIRECT_URI;
            }
        } catch (err) {
            console.error('Error during user authentication: ', err);
            throw err;
        }
    }, [redirectToReddit, authorizationCode]);

    const handleTokenRefresh = React.useCallback(async (): Promise<void | TokenResponse> => {
        try {
            const tokenResponse = await refreshAccessToken(savedRefreshToken.current);
            if (tokenResponse.error) {
                redirectToReddit();
            } else {
                updateStorage(tokenResponse);
            }
        } catch (err) {
            console.error('Error while refreshing the access token: ', err);
            throw err;
        }
    }, [redirectToReddit, savedRefreshToken]);

    React.useEffect(() => {
        const userIsNotAuthorized =
            !authorizationCode && !savedAccessToken.current && !savedRefreshToken.current;
        const userIsNotAuthenticated =
            authorizationCode && !savedAccessToken.current && !savedRefreshToken.current;
        const userTokenIsExpired =
            !authorizationCode &&
            savedAccessToken.current &&
            savedRefreshToken.current &&
            isTokenExpired();

        if (userIsNotAuthorized) {
            redirectToReddit();
        } else if (userIsNotAuthenticated) {
            handleUserAuthentication();
        } else if (userTokenIsExpired) {
            handleTokenRefresh();
        }
    }, [
        authorizationCode,
        savedAccessToken,
        savedRefreshToken,
        redirectToReddit,
        handleTokenRefresh,
        handleUserAuthentication,
    ]);

    return savedAccessToken.current;
};

export default useAccessToken;
