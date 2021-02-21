import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostList from './PostList';
import qs from 'qs';
import { listPosts } from '../../modules/posts';

const PostListContainer = ({ location, match }) => {
    const dispatch = useDispatch();
    //첫 마운트 될 때 포스트 읽기 API 요청
    const { posts, error, loading, user } = useSelector(({posts, loading, user})=>({
        posts : posts.posts,
        error : posts.error,
        loading : loading['post/READ_POSTS'],
        user : user.user
    }));

    useEffect(()=> {
        const { username } = match.params;
        const { tag, page } = qs.parse(location.search, {
            ignoreQueryPrefix : true
        });
        dispatch(listPosts({username, tag, page}));
    }, [dispatch, location.search]);
    
    return(
        <PostList posts={posts} error={error} loading={loading} showWriteButton={user}></PostList>
    );
}

export default withRouter(PostListContainer);