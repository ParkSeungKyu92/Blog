import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Editor from '../../components/write/Editor';
import TagBox from '../../components/write/TagBox';
import { initialize, changeField } from '../../modules/write';


const TagBoxContainer = () => {
    const dispatch = useDispatch();
    const { tags } = useSelector(({write}) =>({
        tags : write.tags
    }));

    const onChangeTags = nextTags => {
        dispatch(
            changeField({
                key : 'tags',
                value : nextTags
            })
        );
    }; 
    return (
        <TagBox onChangeTags={onChangeTags} tags={tags}></TagBox>
    );
}

export default TagBoxContainer;