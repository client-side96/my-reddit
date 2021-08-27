import React from 'react';
import { StyledPostPanel } from '../styles/StyledPostPanel';
import { PostData } from '../types';

type PostPanelProps = {
    post: PostData;
};

const PostPanel: React.FC<PostPanelProps> = ({ post }) => {
    console.log(post);
    return <StyledPostPanel>{post.title}</StyledPostPanel>;
};

export default PostPanel;
