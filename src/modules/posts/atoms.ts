import { atom } from 'recoil';
import { PostData } from './types';

// top 25 posts for every subreddit the user is subscribed to
export const withTopPersonalPosts = atom<PostData[]>({
    key: 'TopPersonalPosts',
    default: [],
});
