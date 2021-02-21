import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostList from '../containers/post/PostList';
import PostListContainer from '../containers/post/PostListContainer';
import PostViewerContainer from '../containers/post/PostViewerContainer';

const PostPageList = () => {
    return (
        <div>
            <HeaderContainer/>
            <PostListContainer/>
        </div>
    );
};

export default PostPageList;