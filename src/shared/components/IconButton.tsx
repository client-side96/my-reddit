import React from 'react';
import styled from 'styled-components';

type IconButtonProps = React.HTMLAttributes<HTMLAnchorElement> & {
    onClick?: (event: React.MouseEvent) => void;
};

const IconButton: React.FC<IconButtonProps> = ({ children, ...rest }) => {
    return <StyledIconButton {...rest}>{children}</StyledIconButton>;
};

const StyledIconButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export default IconButton;
