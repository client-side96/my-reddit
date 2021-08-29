import { Request, RequestMethod, RequestOptions } from '../globalTypes';
import { API_BASE_URL, OAUTH_URL } from './constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const interceptResponseError = (json: any) => {
    if (json.error) {
        throw new Error(`API Error: ${json.error} - ${json.message}`);
    }

    return json;
};

const _fetch = async <T>(url: string, options: RequestInit): Promise<T> => {
    try {
        const response = await fetch(url, options);
        return interceptResponseError(await response.json());
    } catch (err) {
        console.error(`Path ${url}: `, err);
        throw new Error(err);
    }
};

const getDefaultOptions = ({
    method,
    authorizationType,
    token,
    headers,
    body,
}: RequestOptions) => ({
    method,
    headers: {
        ...headers,
        Authorization: `${authorizationType} ${token}`,
    },
    body,
});

const requestCallback = <T>(
    url: string,
    method: RequestMethod,
    requestOptions: RequestOptions
): Promise<T> => {
    const options: RequestOptions = { ...requestOptions, method };
    return _fetch<T>(url, getDefaultOptions(options));
};

export const provideRequestMethods = <T>(url: string, options: RequestOptions): Request<T> => ({
    get: () => requestCallback<T>(url, 'GET', options),
    post: () => requestCallback<T>(url, 'POST', options),
    put: () => requestCallback<T>(url, 'PUT', options),
    delete: () => requestCallback<T>(url, 'DELETE', options),
});

export const OAuthApi = <T>(
    path: string,
    token: string,
    body?: BodyInit,
    headers?: HeadersInit
): Request<T> => {
    const url = OAUTH_URL + path;
    const options: RequestOptions = {
        token,
        body,
        headers,
        authorizationType: 'Bearer',
    };
    return provideRequestMethods(url, options);
};

export const BaseAuthApi = <T>(
    path: string,
    token: string,
    body?: BodyInit,
    headers?: HeadersInit
): Request<T> => {
    const url = API_BASE_URL + path;
    const options: RequestOptions = {
        token,
        body,
        headers,
        authorizationType: 'Basic',
    };
    return provideRequestMethods(url, options);
};
