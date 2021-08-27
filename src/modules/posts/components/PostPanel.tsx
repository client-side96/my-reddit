import React from 'react';
import {
    StyledPostPanel,
    StyledPostPanelContent,
    StyledPostPanelTitle,
} from '../styles/StyledPostPanel';
import { PostData } from '../types';

type PostPanelProps = {
    post: PostData;
};

const PostPanel: React.FC<PostPanelProps> = ({ post }) => {
    return (
        <StyledPostPanel>
            <StyledPostPanelTitle>{post.title}</StyledPostPanelTitle>
            {post.selftext.length > 0 && (
                <StyledPostPanelContent>{post.selftext}</StyledPostPanelContent>
            )}
        </StyledPostPanel>
    );
};

export default PostPanel;
