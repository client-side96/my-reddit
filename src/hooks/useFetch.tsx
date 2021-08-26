import React from 'react';
import { RequestMethod } from '../globalTypes';
import { API_BASE_URL, CLIENT_ID, CLIENT_SECRET } from '../shared/constants';

const useFetchBaseAuth = <T extends unknown>(
    path: string,
    body?: BodyInit,
    method: RequestMethod = 'GET',
    headers?: HeadersInit
): (() => Promise<T>) => {
    const url = API_BASE_URL + path;
    const options: RequestInit = React.useMemo(
        () => ({
            method: method,
            headers: {
                Authorization: `Basic ${btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`,
                ...headers,
            },
            body: body,
        }),
        [method, headers, body]
    );

    const retrieve = React.useCallback(async (): Promise<T> => {
        try {
            const response = await fetch(url, options);
            return await response.json();
        } catch (err) {
            console.error(`Request to ${url} failed: `, err);
            throw err;
        }
    }, [options, url]);

    return retrieve;
};

const useFetch = <T extends unknown>(
    _fetch: (token: string, body?: BodyInit) => Promise<T>,
    token: string | null,
    body?: BodyInit
): T | null => {
    const [response, setResponse] = React.useState<T | null>(null);

    React.useEffect(() => {
        if (token) {
            _fetch(token, body).then((res) => {
                setResponse(res);
            });
        }
    }, [_fetch, token, body]);

    return response;
};

export { useFetchBaseAuth, useFetch };
