import React from 'react';
import _ from 'lodash';
import { AuthenticationContext } from '../../auth';
import { useSubscribedSubreddits } from '../../subreddits/hooks';
import { useTopPersonalPosts } from '../hooks';
import PostPanel from './PostPanel';

const Feed: React.FC = () => {
    const token = React.useContext(AuthenticationContext);

    const subscribedSubreddits = useSubscribedSubreddits(token);
    const [topPersonalPosts, topPersonalPostsLoading] = useTopPersonalPosts(
        token,
        subscribedSubreddits
    );

    return (
        <div
            style={{
                maxWidth: 1440,
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1em',
            }}
        >
            {!topPersonalPostsLoading ? (
                topPersonalPosts &&
                _.orderBy(topPersonalPosts, 'ups', 'desc').map((post) => (
                    <PostPanel key={`post-${post.id}`} post={post} />
                ))
            ) : (
                <p>Loading ...</p>
            )}
        </div>
    );
};

export default Feed;
