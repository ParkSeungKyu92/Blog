import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';

const TagBoxBlock = styled.div`
    width : 100%;
    border-top : 1px solid ${palette.gray[2]};
    padding-top : 2rem;
    h4 {
        color : ${palette.gray[8]};
        maring-top : 0;
        maring-bottom : 0.5rem;
    }
`;

const TagForm = styled.form`
    border-radius : 4px;
    overflow : hidden;
    display  : flex;
    width : 256px;
    border : 1px solid ${palette.gray[9]};
    input,
    button {
        outline : none;
        border : none;
        font-size : 1rem;
    }
    input {
        padding : 0.5rem;
        flex : 1;
        min-width : 0;
    }
    button {
        cursor : pointer;
        padding-right: 1rem;
        padding-left : 1rem;
        border : none;
        background : ${palette.gray[8]};
        color : white;
        font-weight : bold;
        &:hover {
            background : ${palette.gray[6]}
        }
    }
`;

const Tag = styled.div`
    maring-right : 0.5rem;
    color : ${palette.gray[6]};
    cursor : pointer;
    &:hover {
        opacity : 0.5;
    }
`;

const TagListBlock = styled.div`
    display : flex;
    maring-top : 0.5rem;
`;

//React.memo를 이용하여 tag 값이 바뀔 때만 리렌더링 되도록 처리
const TagItem = React.memo(({tag, onRemove})=> (<Tag onClick={() => onRemove(tag)}>#{tag}</Tag>));

// tags값이 바뀔 때만 리렌더링 되도록 처리
const TagList = React.memo(({tags, onRemove}) => (
    <TagListBlock>
        {tags.map(tag => (
            <TagItem key={tag} tag={tag} onRemove={onRemove}></TagItem>
        ))}
    </TagListBlock>
));

const TagBox = () => {
    const [input, setInput] = useState('');
    const [localTags, setLocalTags] = useState([]);

    const insertTag = useCallback(
        (tag) => {
            if (!tag) return; //공백 처리
            if (localTags.includes(tag)) return; //이미 존재함
            setLocalTags([...localTags, tag]);
        },
        [localTags]
    );

    const onRemove = useCallback(
        (tag) => {
            setLocalTags(localTags.filter(t => t !==tag));
        }, 
        [localTags]
    );

    const onChange = useCallback(
        (e) => {
            setInput(e.target.value);
        },
        []
    );

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            insertTag(input.trim()); //앞뒤 공백제거
            setInput('');
        },
        [input, insertTag]

    )

    return(
        <TagBoxBlock>
            <h4>태그</h4>
            <TagForm onSubmit={onSubmit}>
                <input 
                    placeholder='태그를 입력하세요'
                    value={input}
                    onChange={onChange}
                ></input>
                <button type='submit'>추가</button>
            </TagForm>
            <TagList tags={localTags} onRemove={onRemove}></TagList>
        </TagBoxBlock>
    );
};

export default TagBox;