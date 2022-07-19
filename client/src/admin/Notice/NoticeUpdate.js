import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateNotice, getNoticeList } from "../../modules/notice";
import { debounce } from "lodash";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "../../styles/admin.scss";

const NoticeUpdate = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const notice = useSelector(state => state.noticeReducer.selectedNotice);  //선택된 공지글

  const noticeId = useState(notice.noticeId);
  const [title,setTitle] = useState(notice.title);
  const [content, setContent] = useState(notice.content);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  //취소 시 이전 페이지로 이동
  const cancel = debounce((e) => {
    e.preventDefault();

    const res = window.confirm("취소하시겠습니까?");
    if (res === true) {
      history.goBack();
    }
  }, 800);

  const submit = debounce((e) => {
    e.preventDefault();

    if (content === "") {
      return(alert("내용을 입력해주세요."));
    }

    //create formdata
    const formData = new FormData();

    formData.append("noticeId", noticeId[0]);
    formData.append("title", title);
    formData.append("content", content);

    //files null check
    if (attachedFiles.length !== 0) {
      if (attachedFiles.length === 1) {
        formData.append("attachedFiles", attachedFiles[0]);
      }
      else {
        for (let i = 0; i < attachedFiles.length; i++) {
          formData.append("attachedFiles", attachedFiles[i]);
        }
      }
    }

    if (imageFiles.length !== 0) {
      formData.append("imageFiles", imageFiles[0]);
    }


    //action dispatch
    dispatch(updateNotice(formData))
    getNotice()
  }, 800);

  const getNotice = () => {
    dispatch(getNoticeList(1,null))
    history.push("/admin/notice");
  };

  //editor module and formats
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      [{ 'align': [] }, { 'color': [] }, { 'background': [] }],      // dropdown with defaults from theme
      ['clean']
    ],
  };
  
  const formats = [
    //'font',
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link',
    'align', 'color', 'background',    
  ];

  return (
    <div id="noticeActionForm">
      <form>
        <h4>제목</h4>
        <input type="text" name="title" id="title" value={title} 
        onChange={(e)=>setTitle(e.target.value)} required></input>

        <span id="buttonSet">
          <button onClick={cancel} className="admin_btn_gray">취소</button>
          <button type="button" className="admin_btn_blue" onClick={(e) => submit(e)}>제출</button>
        </span>

        {/*quill editor*/}
        <ReactQuill 
        style={{height: "650px"}} 
        theme="snow" 
        modules={modules} 
        formats={formats} 
        value={content || ''} 
        onChange={(content, delta, source, editor) => setContent(editor.getHTML())} />
        

        <div className="fileInput">
          <h4>대표 이미지</h4>
          <input type="file" accept="image/*" name="imageFiles" onChange={(e)=>setImageFiles(e.target.files)}></input>
        </div>

        <div className="fileInput">
          <h4>첨부파일</h4>
          <input type="file" multiple="multiple" name="attachedFiles" onChange={(e) => setAttachedFiles(e.target.files)}></input>
        </div>

        {/*invisible */}
        <input type="hidden" value={noticeId} name="noticeId"></input>
        <input type="hidden" value={content} name="content"></input>
      </form>
    </div>
  );
};

export default NoticeUpdate;