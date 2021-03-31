import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import '../../styles/notice_action.scss';

const NoticeAction = ({match}) => {
    const history = useHistory();

    const type = match.params.type;  //createpost or update

    const notice = useSelector(state => state.noticeReducer.selectedNotice)  //선택된 공지글

    const noticeId = notice.noticeId;
    const [title,setTitle] = useState(notice.title);
    const [content, setContent] = useState(notice.content);

    //취소 시 이전 페이지로 이동
    const cancel = (e) => {
        e.preventDefault();
        const res = window.confirm("취소하시겠습니까?")
        if(res === true) {
            history.goBack();
        }else{
            console.log("cancel");
        }
    }

    //editor module and formats
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link'],
          [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          ['clean']
        ],
      }
    
    const formats = [
        //'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link',
        'align', 'color', 'background',        
      ]

    return (
        <div>
            <form action={`/admin/${type}`} enctype="multipart/form-data" target="iframe" method="post">
                <button onClick={cancel}>취소</button>
                <button type="submit">제출</button>

                <h4>제목</h4>
                <input type="text" name="title" id="title" value={title} 
                onChange={(e)=>setTitle(e.target.value)} required></input>


                {/*quill editor*/}
                <ReactQuill 
                style={{height: "400px"}} 
                theme="snow" 
                modules={modules} 
                formats={formats} 
                value={content || ''} 
                onChange={(content, delta, source, editor) => setContent(editor.getHTML())} />
                

                <h4>대표 이미지</h4>
                {type==="update" ? 
                <input type="file" accept="image/*" name="imageFiles"></input>
                : <input type="file" accept="image/*" name="imageFiles"></input>}

                <h4>첨부파일</h4>
                {type==="update" ? 
                <input type="file" multiple="multiple" name="attachedFiles" ></input>
                : <input type="file" multiple="multiple" name="attachedFiles" ></input>}

                {/*invisible */}
                <input type="hidden" value={noticeId} name="noticeId"></input>
                <input type="hidden" value={content} name="content"></input>
                <iframe src="#" name="iframe"></iframe>
            </form>
        </div>
    );
};

export default NoticeAction;