import React from 'react';
import PostViewer from '../components/post/PostViewer';
import HeaderContainer from '../containers/common/HeaderContainer';

const PostPageList = () => {
    return (
        <div>
            <HeaderContainer/>
            <PostViewer/>
        </div>
    );
};

export default PostPageList;