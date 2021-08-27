import styled from 'styled-components';

export const StyledPostPanel = styled.div`
    width: 600px;
    max-width: 600px;
    min-height: 150px;
    margin-bottom: 0.8em;
    padding: 1.8em;
    border: 1px solid #ebebeb;
    border-radius: 0.5em;
`;

export const StyledPostPanelTitle = styled.h3`
    font-size: 1.1em;
    font-weight: 500;
    margin-top: 0;
`;

export const StyledPostPanelContent = styled.p`
    font-size: 0.8em;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;
