import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostList from '../containers/post/PostList';
import PostViewerContainer from '../containers/post/PostViewerContainer';

const PostPageList = () => {
    return (
        <div>
            <HeaderContainer/>
            <PostList/>
        </div>
    );
};

export default PostPageList;