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
): [PostData[], boolean] => {
    const [topPersonalPostsLoading, setTopPersonalPostsLoading] = React.useState(true);
    const topPersonalPosts = useRecoilValue(withTopPersonalPosts);
    const setTopPersonalPosts = useSetRecoilState(withTopPersonalPosts);

    React.useEffect(() => {
        async function handleFetchTopPersonalPosts(accessToken: string, subreddits: string[]) {
            const response = flattenMultiplePostListings(
                await getTopPersonalPosts(accessToken, subreddits)
            );
            setTopPersonalPosts(response);
            setTopPersonalPostsLoading(false);
        }

        if (token && subscribedSubreddits.length > 0) {
            const subreddits = subscribedSubreddits.map((subreddit) => subreddit.data.display_name);
            handleFetchTopPersonalPosts(token, subreddits);
        }
    }, [token, subscribedSubreddits, setTopPersonalPosts]);

    return [topPersonalPosts, topPersonalPostsLoading];
};

export default useTopPersonalPosts;
