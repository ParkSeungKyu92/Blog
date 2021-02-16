import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Editor from '../../components/write/Editor';
import { initialize, changeField } from '../../modules/write';


const EditorContainer = () => {
    const dispatch = useDispatch();
    const { title, body, tags } = useSelector(({write}) => ({
        title : write.title,
        body : write.body,
    }));

    const onChangeField = useCallback(
        (payload) => {
            dispatch(changeField(payload));
        }, [dispatch]
    );

    //unmount시
    useEffect(()=> {
        return () => {
            dispatch(initialize());
        }
    }, []);

    return (
        <Editor onChangeField={onChangeField} title={title} body={body}></Editor>
    );
};

export default EditorContainer;