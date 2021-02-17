import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostViewer from '../../components/post/PostViewer';
import { readPost, unloadPost } from '../../modules/post';


const PostViewerContainer = ({ match }) => {
    const dispatch = useDispatch();
    //첫 마운트 될 때 포스트 읽기 API 요청
    console.log(match);
    const { postId } = match.params ? match.params : null;
    const { post, error, loading } = useSelector(({post, loading})=>({
        post : post.post,
        error : post.error,
        loading : loading['post/READ_POST']
    }));

    useEffect(()=> {
        if (postId) {
            dispatch(readPost(postId));
        }

        //unmount시 포스트 데이터 비우기
        return () => {
            dispatch(unloadPost());
        };
    }, [dispatch, postId])
    return (
        <PostViewer post={post} error={error} loading={loading}></PostViewer>
    );
}
export default withRouter(PostViewerContainer);