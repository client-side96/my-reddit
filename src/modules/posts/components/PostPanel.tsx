import React from 'react';
import {
    StyledPostPanel,
    StyledPostPanelContent,
    StyledPostPanelHeader,
    StyledPostPanelInfo,
    StyledPostPanelTitle,
} from '../styles/StyledPostPanel';
import { PostData, VoteDirection } from '../types';
import PostPanelActions from './PostPanelActions';

type PostPanelProps = {
    post: PostData;
};

const PostPanel: React.FC<PostPanelProps> = ({ post }) => {
    const handleVote = (direction: VoteDirection) => {
        console.log(direction, post.name);
    };

    return (
        <StyledPostPanel>
            <StyledPostPanelHeader>r/{post.subreddit}</StyledPostPanelHeader>
            <StyledPostPanelTitle>{post.title}</StyledPostPanelTitle>
            {post.selftext.length > 0 && (
                <StyledPostPanelContent>{post.selftext}</StyledPostPanelContent>
            )}
            <StyledPostPanelInfo>
                <p>@{post.author}</p>
                <p>{new Date(post.created_utc * 1000).toLocaleDateString()}</p>
            </StyledPostPanelInfo>
            <PostPanelActions
                ups={post.ups}
                downs={post.downs}
                comments={post.num_comments}
                handleVote={handleVote}
            />
        </StyledPostPanel>
    );
};

export default PostPanel;
