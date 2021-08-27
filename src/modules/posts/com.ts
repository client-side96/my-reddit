import { Listing } from '../../globalTypes';
import { OAuthApi } from '../../shared/api';
import { Post } from './types';

export const getTopPersonalPosts = (
    token: string,
    subreddits: string[]
): Promise<Listing<Post>[]> => {
    const getTopPostsBySubreddit: Promise<Listing<Post>>[] = subreddits.map((subreddit: string) =>
        OAuthApi<Listing<Post>>(`/r/${subreddit}/top`, token).get()
    );
    return Promise.all(getTopPostsBySubreddit);
};
