import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Responsive from '../../components/common/Responsive';
import SubInfo from '../../components/common/SubInfo';
import Tags from '../../components/common/Tags';
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

const PostItem = ({post}) => {
    return (
        <PostItemBlock>
            <h2>
                <Link to={`/@${post.user.username}/${post._id}`}>
                    {post.title}
                </Link>
            </h2>
            <SubInfo username={post.user.username} publishedDate={post.publishedDate}></SubInfo>
            <Tags tags={post.tags}/>
            <p>{post.body}</p>
        </PostItemBlock>
    );
}


const PostList = ({ posts, error, loading, showWriteButton }) => {
    if (error) {
        if (error.response && error.response.status === 404) {
            return <PostListBlock>존재하지 않는 포스트입니다.</PostListBlock>;
        }
        return <PostListBlock>오류 발생!</PostListBlock>;
    }

    return (
        <PostListBlock>
            <WritePostButtonWrapper>
                {showWriteButton && (<Button cyan to="write">새 포스트</Button>)
                }
            </WritePostButtonWrapper>
            <div>
            {
                !loading && posts &&
                (posts.map((post) => (<PostItem key={post._id} post={post}></PostItem>)))
            }
            </div>
        </PostListBlock>
    );
}

export default PostList;