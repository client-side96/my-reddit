import { atom } from 'recoil';
import { Subreddit } from './types';

export const withSubscribedSubreddits = atom<Subreddit[]>({
    key: 'SubscribedSubreddits',
    default: [],
});
