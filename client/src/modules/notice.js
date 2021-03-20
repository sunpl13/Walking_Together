import axios from 'axios';

//initial state
const INIT_NOTICE_STATE = {
    pageInfo: {             //페이지 정보
        page: '1',
        totalPage: '',
        start: '',
        end: '',
        prev: 'false',
        next: 'flase',
        pageList: ''
    },
    list: [{noticeId:'', title:'', date:''}],    //공지사항 목록
    selectedNotice: {    //공지사항 세부내용
        noticeId: '',
        title: '',
        content: '',
        createTime: '',
        imageFiles: [],
        attachedFiles: []
    }
};


//action type
const INSERTNOTICE = 'INSERTNOTICE';
const UPDATENOTICE = 'UPDATENOTICE';
const DELETENOTICE = 'DELETENOTICE';
const SELECTNOTICE = 'SELECTNOTICE';
const GETLIST = 'GETLIST';
const INITSELECTEDNOTICE = 'INITSELECTEDNOTICE';


//action
export const insertNotice = (       //공지글 등록
    title, 
    content, 
    imageFiles, 
    attachedFiles
    ) => async() => {
        await axios.post(`${url}/admin/createpost`, {
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

export const updateNotice = (       //공지글 수정
    noticeId, 
    title, 
    content, 
    imageFiles, 
    attachedFiles
    ) => async() => { 
        await axios.post(`${url}/admin/update`, {
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

export const deleteNotice = (           //공지글 삭제
    noticeId
    ) => async() => {   
        await axios.post(`${url}/admin/delete`, noticeId)

        return {
            type: DELETENOTICE
        }
}

export const selectNotice = (          //공지글 세부내용 조회
    noticeId
    ) => async() => { 
    const res = await axios.get(`${url}/notice?noticeId=${noticeId}`)
    
    return {
        type: SELECTNOTICE,
        payload: res.data
    }
}

export const getNoticeList = (          //공지사항 목록 가져오기
    page
    ) => async() => {
    const res = await axios.post(`${url}/notice?`, page)

    return {
        type: GETLIST,
        payload: res.data
    }
}

export const initSelectedNotice = () => async() => {
    return {
        type: INITSELECTEDNOTICE
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
        
        case INITSELECTEDNOTICE:
            return {
                ...state,
                selectNotice: {
                    noticeId: '',
                    title: '',
                    content: '',
                    createTime: '',
                    imageFiles: [],
                    attachedFiles: []
                }
            }
            
        default:
            return state
    }
}

export default noticeReducer;