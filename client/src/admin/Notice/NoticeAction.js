import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { insertNotice, updateNotice } from '../../modules/notice';

const NoticeAction = ({match}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const type = match.params.type;

    const notice = useSelector(state => state.noticeReducer.selectedNotice)  //선택된 공지글

    const [title,setTitle] = useState(notice.title);
    const [content, setContent] = useState(notice.content);
    const [imageFiles, setImageFiles] = useState(notice.imageFiles);  //** */
    const [attachedFiles, setAttachedFiles] = useState(notice.attachedFiles);

    const cancel = (e) => {    //취소 시 이전 페이지로 이동
        e.preventDefault();
        const res = window.confirm("취소하시겠습니까?")
        if(res == true) {
            history.goBack();
        }else{
            console.log("cancel");
        }
    }

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        //formData.append("title", title);
        //formData.append("content", content);
        attachedFiles.forEach((file) => formData.append("attachedFiles", file))
        imageFiles.forEach((file) => formData.append("imageFiles", file))

        if(title=="") {
            return(alert("제목을 입력해주세요."))         
        } else if(content=="") {
            return(alert("내용을 입력해주세요."))
        } else if(type=="insert") {       //insert
            //return(dispatch(insertNotice(formData)))
            //return(dispatch(insertNotice(formData, title, content)))
            return(dispatch(insertNotice(title, content, formData)))
        } else if(type=="update") {        //update
            return(dispatch(updateNotice(notice.noticeId, title, content, imageFiles, attachedFiles)))
        } else {
            return(console.log("fail"))
        }
    }

    const attach = (e) => {  //파일 첨부
        const files = e.target.files;
        setAttachedFiles([files]);
    }
    console.log(content)
    return (
        <div>
            <form onSubmit={submit} enctype="multipart/form-data">
                <button onClick={cancel}>취소</button>
                <button type="submit">완료</button>

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

                <input type="file" multiple="multiple" onChange={(e) => attach(e)} files={attachedFiles}></input>
            </form>
        </div>
    );
};

export default NoticeAction;