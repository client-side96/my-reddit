export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type RequestOptions = {
    token?: string;
    method?: RequestMethod;
    authorizationType?: AuthorizationType;
    headers?: HeadersInit;
    body?: BodyInit;
};

export type Request<T> = {
    get: () => Promise<T>;
    post: () => Promise<T>;
    put: () => Promise<T>;
    delete: () => Promise<T>;
};

export type AuthorizationType = 'Basic' | 'Bearer';

export type ListingData<T> = {
    children: Array<T>;
};
export type Listing<T> = {
    kind: 'Listing';
    data: ListingData<T>;
};
