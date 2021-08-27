import { Listing } from 'globalTypes';
import { Post, PostData } from './types';

export const flattenMultiplePostListings = (listings: Listing<Post>[]): PostData[] => {
    const posts: PostData[] = [];
    for (const listing of listings) {
        for (const child of listing.data.children) {
            posts.push(child.data);
        }
    }

    return posts;
};
