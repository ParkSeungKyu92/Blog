import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';

const EditorBlock = styled(Responsive)`
    /*페이지 위아래 여백 지정*/
    padding-top : 5rem;
    padding-bottom : 5rem;
`;

const TitleInput = styled.input`
    font-size :3rem;
    outline : none;
    padding-bottom : 0.5rem;
    border : none;
    border-bottom : 1px solid ${palette.gray[4]};
    margin-bottom : 2rem;
    width : 100%;
`;

const QuillWrapper = styled.div`
    /*최소크기 지정 및 padding 제거*/
    .ql-editor {
        padding : 0;
        min-height : 320px;
        font-size : 1.125rem;
        line-height : 1.5;
    }
    .ql-editor.ql-blank::before {
        left : 0px;
    }
`;
const Editor = () => {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme : 'bubble',
            placeholder : '내용을 작성하세요..',
            modules : {
                //더 많은 옵션
                //https://quilljs.com/docs/modules/toolbar
                toolbar : [
                    [{ header : '1'}, {header : '2'}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list : 'ordered'}, { list : 'bullet'}],
                    [{ color : ['Aqua', 'Aquamarine', 'black', 'BlueViolet', 'Chartreuse', 'DarkGoldenRod', 'DarkMagenta', 'DeepPink'] }, { background: ['Aqua', 'Aquamarine', 'black', 'BlueViolet', 'Chartreuse', 'DarkGoldenRod', 'DarkMagenta', 'DeepPink'] }],
                    ['blockquote', 'code-block', 'link', 'image'],
                ]
            }
        });
    }, []);

    return (
        <EditorBlock>
            <TitleInput placeholder='제목을 입력하세요'></TitleInput>
            <QuillWrapper>
                <div ref={quillElement}></div>
            </QuillWrapper>
        </EditorBlock>
    );
}

export default Editor;