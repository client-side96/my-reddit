import { CLIENT_ID, CLIENT_SECRET } from '../../shared/constants';
import { BaseAuthApi } from '../../shared/api';
import { TokenResponse } from './types';

export const getAccessToken = async (authCode?: string): Promise<TokenResponse> => {
    const token = btoa(CLIENT_ID + ':' + CLIENT_SECRET);

    const form = new FormData();
    form.append('code', authCode || '');
    form.append('grant_type', 'authorization_code');
    form.append('redirect_uri', 'http://localhost:4000');

    return BaseAuthApi<TokenResponse>('/access_token', token, form).post();
};

export const refreshAccessToken = async (refreshToken: string | null): Promise<TokenResponse> => {
    const token = btoa(CLIENT_ID + ':' + CLIENT_SECRET);

    const form = new FormData();
    form.append('grant_type', 'refresh_token');
    form.append('refresh_token', refreshToken || '');

    return BaseAuthApi<TokenResponse>('/access_token', token, form).post();
};
