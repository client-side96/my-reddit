import { Listing } from '../../globalTypes';
import { OAuthApi } from '../../shared/api';
import { Subreddit } from './types';

export const getSubscribedSubreddits = (token: string): Promise<Listing<Subreddit>> => {
    return OAuthApi<Listing<Subreddit>>('/subreddits/mine/subscriber', token).get();
};
