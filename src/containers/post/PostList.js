import React from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Responsive from '../../components/common/Responsive';
import palette from '../../lib/styles/palette';


const PostListBlock = styled(Responsive)`
    margin-top : 3rem;
`;


const WritePostButtonWrapper = styled.div`
    display : flex;
    justify-content : flex-end;
    margin-bottom : 3rem;
`;

const PostItemBlock = styled.div`
    padding-top : 3rem;
    padding-bottom:3rem;
    
    /*첫번째 포스트는 padding Top이 없음*/
    &:first-child {
        padding-top :0 ;
    }

    & + & {
        border-top : 1px solid ${palette.gray[2]};
    }

    h2 {
        font-size : 2rem;
        margin-bottom : 0;
        margin-top : 0;
        &:hover {
            color : ${palette.gray[6]};
        }
    }

    p {
        margin-top : 2rem;
    }
`;

const SubInfo = styled.div`
    color : ${palette.gray[6]};

    /* Span 사이의 가운뎃점 문자 보여주기*/

    span + span {
        color : ${palette.gray[4]};
        padding-left : 0.25rem;
        padding-right : 0.25rem;
        content : '\\B7';
    }
`;

const Tags = styled.div`
    margin-top : 0.5rem;
    .tag {
        display : inline-block;
        color : ${palette.cyan[7]};
        text-decoration : none;
        margin-right : 0.5rem;
        &:hover {
            color : ${palette.cyan[6]};
        }
    }
`;


const PostItem = () => {
    return (
        <PostItemBlock>
            <h2>제목</h2>
            <SubInfo>
                <span>
                    <b>USERNAME</b>
                </span>
                <span>{new Date().toLocaleDateString()}</span>
            </SubInfo>
            <Tags>
                <div className='tag'>#태그1</div>
            </Tags>
            <p>포스트 일부분...</p>
        </PostItemBlock>
    );
}


const PostList = () => {
    return (
        <PostListBlock>
            <WritePostButtonWrapper>
                <Button cyan to="write">새 포스트</Button>
            </WritePostButtonWrapper>
            <div>
                <PostItem></PostItem>
                <PostItem></PostItem>
                <PostItem></PostItem>
            </div>
        </PostListBlock>
    );
}

export default PostList;