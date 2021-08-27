import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Subreddit } from '../../subreddits';
import { getTopPersonalPosts } from '../com';
import { withTopPersonalPosts } from '../atoms';
import { flattenMultiplePostListings } from '../helpers';
import { PostData } from '../types';

const useTopPersonalPosts = (
    token: string | null,
    subscribedSubreddits: Subreddit[]
): PostData[] => {
    const topPersonalPosts = useRecoilValue(withTopPersonalPosts);
    const setTopPersonalPosts = useSetRecoilState(withTopPersonalPosts);

    React.useEffect(() => {
        async function handleFetchTopPersonalPosts(accessToken: string, subreddits: string[]) {
            const response = flattenMultiplePostListings(
                await getTopPersonalPosts(accessToken, subreddits)
            );
            setTopPersonalPosts(response);
        }

        if (token && subscribedSubreddits.length > 0) {
            const subreddits = subscribedSubreddits.map((subreddit) => subreddit.data.display_name);
            handleFetchTopPersonalPosts(token, subreddits);
        }
    }, [token, subscribedSubreddits, setTopPersonalPosts]);

    return topPersonalPosts;
};

export default useTopPersonalPosts;
