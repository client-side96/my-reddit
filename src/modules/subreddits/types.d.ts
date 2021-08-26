export type SubredditData = {
    display_name: string;
    title: string;
    name: string; // fullname id
};

export type Subreddit = {
    data: SubredditData;
};
