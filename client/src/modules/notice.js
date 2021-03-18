import axios from 'axios';

//initial state
const INIT_NOTICE_STATE = {
    pageInfo:{
        page: '1',
        totalPage: '',
        start: '',
        end: '',
        prev: '',
        next: '',
        pageList: ''
    },
    list: [],
    selectedNotice:{
        noticeId: '',
        title: '',
        content: '',
        createTime: "",
        imageFiles: "",
        attachedFiles: ""
    }
};


//action type
const INSERTNOTICE = 'INSERTNOTICE';
const UPDATENOTICE = 'UPDATENOTICE';
const DELETENOTICE = 'DELETENOTICE';
const SELECTNOTICE = 'SELECTNOTICE';
const GETLIST = 'GETLIST';


//action
export const insertNotice = async(title, content, imageFiles, attachedFiles) => {
    const res = await axios.post(`${url}/admin/createpost`, {
        title: title,
        content: content,
        imageFiles: imageFiles,
        attachedFiles: attachedFiles
    }).then((response) => {
        console.log(response)
    }).catch((err) => alert(err));

    return {
        type: INSERTNOTICE,
    }
}

export const updateNotice = async(noticeId, title, content, imageFiles, attachedFiles) => {  //data는 수정할 요소들 객체
    const res = await axios.post(`${url}/admin/update`, {
        noticeId: noticeId,
        title: title,
        content: content,
        imageFiles: imageFiles,
        attachedFiles: attachedFiles
    }).then((response) => {
        console.log(response)
    }).catch((err) => alert(err));

    return {
        type: UPDATENOTICE,
        title,
        content,
        imageFiles,
        attachedFiles
    }
}

export const deleteNotice = async(noticeId) => {
    const res = await axios.post(`${url}/admin/delete`, noticeId)

    return {
        type: DELETENOTICE
    }
}

export const selectNotice = async(noticeId) => {
    const res = await axios.get(`${url}/notice?noticeId=${noticeId}`)
    
    return {
        type: SELECTNOTICE,
        payload: res.data
    }
}

export const getNoticeList = async(page) => {
    const res = await axios.post(`${url}/notice?`, page)

    return {
        type: GETLIST,
        payload: res.data
    }
}


//reducer
const url = process.env.REACT_APP_URL;

const noticeReducer = (state = INIT_NOTICE_STATE, action) => {
    switch(action.type) {

        case INSERTNOTICE:
            return {

            }

        case UPDATENOTICE:
            return {
                ...state, 
                selectedNotice: {
                    title: action.title,
                    content: action.content,
                    imageFiles: action.imageFiles,
                    attachedFiles: action.attachedFiles
                }}

        case DELETENOTICE:
            return {
                ...state,
                selectedNotice: {}
            }

        case SELECTNOTICE:
            return {
                ...state, 
                selectedNotice: action.payload
            }

        case GETLIST:
            return {
                ...state, 
                list: action.payload.data,
                pageInfo: action.payload.pageInfo
            }
            
        default:
            return state
    }
}

export default noticeReducer;