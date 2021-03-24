import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

//import { insertNotice, updateNotice } from '../../modules/notice';

import '../../styles/notice_action.scss';

const NoticeAction = ({match}) => {
    const history = useHistory();
    //const dispatch = useDispatch();  //react-redux useDispatch 추가
    const [st, setSt] = useState(false);

    const type = match.params.type;

    const notice = useSelector(state => state.noticeReducer.selectedNotice)  //선택된 공지글

    const [noticeId, setNoticeId] = useState(notice.noticeId);
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

    /*const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);

        if(attachedFiles[0]!=undefined) {
            formData.append("attachedFiles", attachedFiles)
        }
        if(imageFiles[0]!=undefined) {
            imageFiles.forEach((file) => formData.append("imageFiles", file))
        }

        if(title=="") {
            return(alert("제목을 입력해주세요."))         
        } else if(content=="") {
            return(alert("내용을 입력해주세요."))
        } else if(type=="insert") {       //insert
            return(dispatch(insertNotice(formData)))
        } else if(type=="update") {        //update
            return(dispatch(updateNotice(notice.noticeId, title, content, imageFiles, attachedFiles)))
        } else {
            return(console.log("fail"))
        }
    }*/

    const attach = (e) => {  //파일 첨부
        setAttachedFiles([])
        const files = e.target.files;
        setAttachedFiles(files);
    }

    console.log(content)

    return (
        <div>
            {/*<form onSubmit={submit} enctype="multipart/form-data">*/}
            <form action={`/admin/${type}`} enctype="multipart/form-data" target="iframe" method="post">
                <button onClick={cancel}>취소</button>
                <button type="submit">제출</button>
                {/*<button type="submit">완료</button>*/}

                <h4>제목</h4>
                <input type="text" name="title" id="title" value={title} 
                onChange={(e)=>setTitle(e.target.value)} required></input>
                
                <CKEditor
                    config={{ckfinder: {
                        uploadUrl: '/'  //업로드 위치(storage) 지정해주기
                    }}}
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                    }}
                />
                <input type="file" name="imageFiles"></input>
            
                <h4>첨부파일</h4>

                <input type="file" multiple="multiple" name="attachedFiles" onChange={(e) => attach(e)} files={attachedFiles}></input>
               
                {/*invisible */}
                <input type="hidden" value={noticeId} name="noticeId"></input>
                <input type="hidden" value={content} name="content"></input>
                <iframe src="#" name="iframe"></iframe>
            </form>
        </div>
    );
};

export default NoticeAction;