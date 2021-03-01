import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostActionButtons from '../../components/post/PostActionButtons';
import PostViewer from '../../components/post/PostViewer';
import { readPost, unloadPost } from '../../modules/post';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = ({ match, history }) => {
    const dispatch = useDispatch();
    //첫 마운트 될 때 포스트 읽기 API 요청
    console.log(match);
    const { postId } = match.params ? match.params : null;
    const { post, error, loading, user } = useSelector(({post, loading, user})=>({
        post : post.post,
        error : post.error,
        loading : loading['post/READ_POST'],
        user : user.user
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

    const onRemove = async () => {
        try {
            await removePost(postId);
            history.push('/');
        } catch (e) {
            console.log(e);
        }
    }
    const onEdit = () => {
        dispatch(setOriginalPost(post));
        history.push('/write');
    }
    const ownPost = (user && user._id) === (post && post.user._id);
    return (
        <PostViewer post={post} error={error} loading={loading} actionButtons={ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove}/>}></PostViewer>
    );
}
export default withRouter(PostViewerContainer);