import { getValueFromLocalStorage, setValueInLocalStorage } from '../../shared/helpers';
import { TokenResponse } from './types';

export const buildAuthorizationFormData = (code: string | undefined): FormData => {
    const form = new FormData();
    if (code) {
        form.append('code', code);
        form.append('grant_type', 'authorization_code');
        form.append('redirect_uri', 'http://localhost:4000');
    }

    return form;
};

export const buildRefreshTokenFormData = (refreshToken?: string | null): FormData => {
    const form = new FormData();
    if (refreshToken) {
        form.append('grant_type', 'refresh_token');
        form.append('refresh_token', refreshToken);
    }

    return form;
};

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
