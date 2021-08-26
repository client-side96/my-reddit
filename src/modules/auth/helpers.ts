import { getValueFromLocalStorage, setValueInLocalStorage } from '../../shared/helpers';
import { TokenResponse } from './types';

export const setAuthorizationValuesInStorage = (tokenResponse: TokenResponse): void => {
    const now = new Date();
    now.setSeconds(now.getSeconds() + tokenResponse.expires_in);
    setValueInLocalStorage('token', tokenResponse.access_token);
    setValueInLocalStorage('refresh', tokenResponse.refresh_token);
    setValueInLocalStorage('expires', now.toISOString());
};

export const isTokenExpired = (): boolean => {
    const tokenExpire = getValueFromLocalStorage('expires');
    const now = new Date();

    if (!tokenExpire) {
        return true;
    }

    return now > new Date(tokenExpire);
};
