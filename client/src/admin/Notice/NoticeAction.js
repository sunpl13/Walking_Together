import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { insertNotice, updateNotice, initSelectedNotice } from '../../modules/notice';

const NoticeAction = ({match}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const type = match.params;

    const notice = useSelector(state => state.noticeReducer.selectedNotice)  //선택된 공지글

    const [title,setTitle] = useState(notice.title);
    const [content, setContent] = useState(notice.content);
    const [imageFiles, setImageFiles] = useState(notice.imageFiles);  //** */
    const [attachedFiles, setAttachedFiles] = useState(notice.attachedFiles);

    const [changeState, setChangeState] = useState(false);  //공지글 내용 변경 여부
    const [updateState, setUpdateState] = useState(false);  //공지글 내용 변경 감지될 경우 update 가능해짐

    useEffect(() => {
        return (
            dispatch(initSelectedNotice())
        )
    }, [notice])

    const cancel = () => {    //취소 시 이전 페이지로 이동
        history.goBack();
    }

    const submit = () => {
        if(type==="update"){                        //update
            if(updateState===false) {
                alert("변경된 내용이 없습니다.");
            } else {
                dispatch(updateNotice(notice.noticeId, title, content, imageFiles, attachedFiles))
            }
        } else {                                    //insert
            if((content!=="")&&(title!=="")) {
                dispatch(insertNotice(title, content, imageFiles, attachedFiles))
            } else if((title==="")) {
                alert("제목을 입력해주세요.");
            } else {
                alert("내용을 입력해주세요.");
            }
        }
    }

    //change action
    useMemo(() => setChangeState(true), [title, content, imageFiles, attachedFiles, updateState])

    useMemo(() => setUpdateState(true), [changeState])

    const attach = (e) => {  //파일 첨부
        setAttachedFiles(...attachedFiles, e.target.value);
    }

    return (
        <div>
            <button onClick={cancel}>취소</button>
            <button onClick={() => submit(type)}>완료</button>

            <h4>제목</h4>
            <input type="text" id="title" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
            
            <CKEditor
                config={{ckfinder: {
                    uploadUrl: ''  //업로드 위치(storage) 지정해주기
                }}}
                editor={ClassicEditor}
                data={content}
                onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
                }}
            />

            <h4>첨부파일</h4>
            {attachedFiles.map((file, index) => {
                return (
                    <div id={index}>
                        <a href={file}>첨부파일다운</a>
                        <button onClick={() => setAttachedFiles(attachedFiles.filter(attachedFiles => attachedFiles !== file))}>삭제</button>
                    </div>
                )
             })}
            <input type="file" onChange={attach}></input>
        </div>
    );
};

export default NoticeAction;