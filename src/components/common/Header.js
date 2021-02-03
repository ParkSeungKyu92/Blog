import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
    position : fixed;
    width : 100%;
    background : lightgreen;
    box-shadow : 0px 2px 4px rgba(0, 0, 0, 0,1);
`;

const Wrapper = styled(Responsive)`
    height : 4rem;
    display : flex;
    align-items : center;
    justify-content : space-between; 
    .logo {
        font-size : 1.25rem;
        font-weight : 800;
        letter-spacing : 2px;
    }
    .right {
        display :flex;
        align-items : center;
    }
`;

//Header position이 fixed이기 때문에..
const Spacer = styled.div`
    height : 4rem;
`;

const Header = () => {
    return(
        <>
            <HeaderBlock>
                <Wrapper>
                    <Link className='logo' to='/'>
                        안녕하세요 박승규님의 블로그입니다.
                    </Link>
                    <div className='right'></div>
                    <Button to='/login'>로그인</Button>
                </Wrapper>
            </HeaderBlock>
            <Spacer></Spacer>
        </>
    );
};

export default Header;