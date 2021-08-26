export type PostData = {
    id: string;
    subreddit: string;
    selftext: string;
    author_fullname: string;
    author: string;
    title: string;
    name: string; // fullname id
    visited: boolean;
    pinned: boolean;
    ups: number;
    created_utc: number;
};

export type Post = {
    data: PostData;
};
