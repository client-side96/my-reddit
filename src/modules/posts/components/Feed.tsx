import React from 'react';
import { AuthenticationContext } from '../../auth';
import { useSubscribedSubreddits } from '../../subreddits/hooks';
import { useTopPersonalPosts } from '../hooks';

const Feed: React.FC = () => {
    const token = React.useContext(AuthenticationContext);

    const subscribedSubreddits = useSubscribedSubreddits(token);
    const topPersonalPosts = useTopPersonalPosts(token, subscribedSubreddits);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {topPersonalPosts &&
                topPersonalPosts.map((post, index) => (
                    <div key={`sr-${index}`} style={{ marginBottom: 10 }}>
                        {post.title}
                    </div>
                ))}
        </div>
    );
};

export default Feed;
