import styled from 'styled-components';

export const StyledPostPanel = styled.div`
    width: 100%;
    max-width: 600px;
    min-height: 150px;
    margin: 0.4em auto;
    padding: 1.2em 1.8em;
    border: 1px solid #ebebeb;
    border-radius: 0.5em;
    background: #fff;
`;

export const StyledPostPanelHeader = styled.p`
    font-size: 0.7em;
    color: blue;
    cursor: pointer;
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

export const StyledPostPanelInfo = styled.div`
    font-size: 0.7em;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
