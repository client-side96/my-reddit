import { ExpandLessOutlined, ExpandMoreOutlined, ForumOutlined } from '@material-ui/icons';
import React from 'react';
import IconButton from '../../../shared/components/IconButton';
import { StyledPostPanelActions, StyledLikeButtonWrapper } from '../styles/StyledPostPanelActions';
import { VoteDirection } from '../types';

type PostPanelActionProps = {
    ups: number;
    downs: number;
    comments: number;
    handleVote: (direction: VoteDirection) => void;
};

const PostPanelActions: React.FC<PostPanelActionProps> = ({ ups, downs, comments, handleVote }) => {
    const upvotePost = () => {
        handleVote(1);
    };

    const downvotePost = () => {
        handleVote(-1);
    };

    return (
        <StyledPostPanelActions>
            <StyledLikeButtonWrapper>
                <IconButton id='upvote-btn' onClick={upvotePost} style={{ marginRight: 10 }}>
                    <ExpandLessOutlined />
                    {ups}
                </IconButton>
                <IconButton id='downvote-btn' onClick={downvotePost}>
                    <ExpandMoreOutlined />
                    {downs}
                </IconButton>
            </StyledLikeButtonWrapper>
            <IconButton id='comment-btn'>
                <ForumOutlined />
                {comments}
            </IconButton>
        </StyledPostPanelActions>
    );
};

export default PostPanelActions;
