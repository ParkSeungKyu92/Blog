import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import { isPlaceholderType } from '../../../../../../AppData/Local/Microsoft/TypeScript/4.1/node_modules/@babel/types/lib/index';

const PostViewerBlock = styled(Responsive)`
    margin-top : 4rem;
`;

const PostHead = styled.div`
    border-bottom : 1px solid ${palette.gray[2]};
    padding-bottom : 3rem;
    margin-bottom : 3rem;
    h1 {
        font-size : 3rem;
        line-height : 1.5;
        maring : 0;
    }
`;

const SubInfo = styled.div`
    margin-top : 1rem;
    color : ${palette.gray[6]};

    /** span 사이의 가운뎃점 문자 보여주기 */
    span + span:before {
        color : ${palette.gray[5]};
        padding-left : 0.25rem;
        paddingright : 0.25rem;
        content : '\\B7';
    }
`;

const Tags = styled.div`
    margin-top : 0.5rem;
    .tag {
        display : inline-block;
        color : ${palette.cyan[7]};
        text-decoration : none;
        margin-right : 0.5rem;
        &:hover {
            color : ${palette.cyan[6]};
        }
    }
`;

const PostContent = styled.div`
    font-size : 1.3125rem;
    color : ${palette.gray[8]};
`;

const PostViewer = () => {
    return (
        <PostViewerBlock>
            <PostHead>
                <h1>제목</h1>
                <SubInfo>
                    <span>
                        <b>Test</b>
                    </span>
                    <span>{new Date().toLocaleDateString()}</span>
                </SubInfo>
                <Tags>
                    <div className='tag'>태그1</div>
                    <div className='tag'>태그2</div>
                    <div className='tag'>태그3</div>
                </Tags>
            </PostHead>
            <PostContent dangerouslySetInnerHTML={{ __html:'<p>  HTML <b> 내용</b> 입니다.</p>'} }>
            </PostContent>
        </PostViewerBlock>
    );
}

export default PostViewer;

