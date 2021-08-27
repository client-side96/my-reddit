import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getSubscribedSubreddits } from '..';
import { withSubscribedSubreddits } from '../atoms';
import { Subreddit } from '../types';

const useSubscribedSubreddits = (token: string | null): Subreddit[] => {
    const subscribedSubreddits = useRecoilValue(withSubscribedSubreddits);
    const setSubscribedSubreddits = useSetRecoilState(withSubscribedSubreddits);

    React.useEffect(() => {
        async function handleFetchSubscribedSubreddits(accessToken: string) {
            const response = await getSubscribedSubreddits(accessToken);
            setSubscribedSubreddits(response.data.children);
        }

        if (token) {
            handleFetchSubscribedSubreddits(token);
        }
    }, [token, setSubscribedSubreddits]);

    return subscribedSubreddits;
};

export default useSubscribedSubreddits;
