import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
    padding-left : 1rem;
    padding-right : 1rem;
    width : 1024px;
    maring : 0 auto;

    @media (max-width : 1920px) {
        width : 100%;
    }
    @media (max-width : 1024px) { 
        width : 100%;
    }

    @media (max-width : 768px) {
        width : 100%;
    }
`;


const Responsive = ({ children, ...rest }) => {
    // ...rest는 style, className, onCLick, 등의 props를 사용할수 있도록 전달
    return (
        <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>
    );
};

export default Responsive;