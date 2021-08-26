import React from 'react';
import { Listing } from '../../../globalTypes';
import { useFetch } from '../../../hooks';
import { AuthenticationContext } from '../../auth';
import { Subreddit, getSubscribedSubreddits } from '../../subreddits';

const Feed: React.FC = () => {
    const token = React.useContext(AuthenticationContext);
    const mySubreddits = useFetch<Listing<Subreddit>>(getSubscribedSubreddits, token);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {mySubreddits &&
                mySubreddits.data.children.map((r, index) => (
                    <div key={`sr-${index}`} style={{ marginBottom: 10 }}>
                        {r.data.title}
                    </div>
                ))}
        </div>
    );
};

export default Feed;
