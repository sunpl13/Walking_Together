import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { insertNotice, updateNotice } from '../../modules/notice';

<button onClick={updateAction}>완료</button>
    const updateAction = () => {
        const res = dispatch(updateNotice(noticeId, notice.title, notice.content, notice.file))
    }

const NoticeAction = ({match}) => {
    const dispatch = useDispatch();
    const type = match.props.type;
    const [fileState, setFileState] = useState(false);

    const notice = useSelector(state => state.notice.selectedNotice)

    const [title,setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageFiles, setImageFiles] = useState([]);  //** */
    const [attachedFiles, setAttachedFiles] = useState([]);

    useEffect(() => {
        setAttachedFiles(notice.attachedFiles)
    }, [notice])

    const cancel = () => {
        //이전 detail로 이동
    }

    const submit = () => {
        if(type=="update"){     //update
            if((title=="")&&(content=="")&&(fileState==true)){
                alert("변경된 내용이 없습니다.")
                break;
            } else {
                const res = dispatch(updateNotice(title, content, imageFiles, attachedFiles))
                break;
            }
        } else {    //insert
            if((content!="")&&(title!="")) {
                const res = dispatch(insertNotice(title, content, imageFiles, attachedFiles))
                break;
            } else if((title=="")) {
                alert("제목을 입력해주세요.");
                break;
            } else {
                alert("내용을 입력해주세요.");
                break;
            }
        }
    }

    //change action
    const attach = (e) => {
        setAttachedFiles(...attachedFiles, e.target.value);
        setFileState(true);
    }

    return (
        <div>
            <button onClick={cancel}>취소</button>
            <button onClick={submit(type)}>완료</button>

            <h4>제목</h4>
            <input type="text" id="title" value={notice.title} onChange={(e)=>setTitle(e.target.value)} />
            
            <CKEditor
                config={{ckfinder: {
                    uploadUrl: ''  //업로드 위치(storage) 지정해주기
                }}}
                editor={ClassicEditor}
                data={notice.content}
                onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
                }}
            />

            <h4>첨부파일</h4>
            {notice.attachedFiles.map((file, index) => {
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