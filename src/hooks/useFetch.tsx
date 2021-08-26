import React from 'react';

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

export default useFetch;
