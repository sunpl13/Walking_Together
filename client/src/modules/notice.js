import axios from 'axios';

//initial state
const INIT_NOTICE_STATE = {
    pageInfo: {             //페이지 정보
        page: 0,
        totalPage: 0,
        start: 0,
        end: 0,
        prev: false,
        next: false,
        pageList: []
    },
    list: [],    //공지사항 목록
    selectedNotice: {    //공지사항 세부내용
        noticeId: '',
        title: '',
        content: '',
        createTime: '',
        imageFiles: null,
        attachedFiles: null
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
export const insertNotice = (       //공지글 등록 (==>form에서 직접 submit해야 파일 전송돼서 사용 안 했음 ㅠ)
    formData
    ) => async(dispatch) => {
        await axios.post('/admin/createpost' ,formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((res) => {
            alert(res.data.message);
        }).catch((err) => console.log(err));

        dispatch({
            type: INSERTNOTICE
        })
    }

export const updateNotice = (       //공지글 수정
    formData
    ) => async(dispatch) => { 
        await axios.post('/admin/update', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then((res) => {
            alert(res.data.message);
        }).catch((err) => console.log(err));

        dispatch({
            type: UPDATENOTICE,
            title: formData.get("title"),
            content: formData.get("content"),
            imageFiles: formData.get("imageFiles"),
            attachedFiles: formData.get("attachedFiles")
        })
    }

export const deleteNotice = (           //공지글 삭제
    noticeId
    ) => async(dispatch) => {   
        await axios.get(`/admin/delete?noticeId=${noticeId}`)
        .then((res) => {
            alert(res.data.message);
        }).catch((err) => console.log(err));

        dispatch({
            type: DELETENOTICE
        })
}

export const selectNotice = (          //공지글 세부내용 조회
    noticeId
    ) => async(dispatch) => { 
        await axios.get(`/notice`, {
            params: {
                noticeId: noticeId
            }
        })
        .then((res) => {
            dispatch({
                type: SELECTNOTICE,
                payload: res.data
            })
        })
}

export const getNoticeList = (          //공지사항 목록 가져오기
    page,
    keyword
    ) => async(dispatch) => {
        if(keyword!=null) {
            await axios.post(`/noticeList`,{
                page: page,
                keyword: keyword
            }).then((res) => {
                if(res.status===200) {
                    dispatch({
                        type: GETLIST,
                        payload: res.data
                    })
                } else {
                    alert(res.message);
                }
            })
        }else {
            await axios.post(`/noticeList`, {
                page: page
            }).then((res) => {
                if(res.status===200) {
                    dispatch({
                        type: GETLIST,
                        payload: res.data
                    })
                } else {
                    alert(res.message);
                }
            })
        }
}

export const initSelectedNotice = () => async(dispatch) => {        //redux selectedNotice 초기화
    dispatch({
        type: INITSELECTEDNOTICE
    })
}


//reducer
const noticeReducer = (state = INIT_NOTICE_STATE, action) => {
    switch(action.type) {

        case INSERTNOTICE:
            return {
                state
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
                selectedNotice: {
                    noticeId: '',
                    title: '',
                    content: '',
                    createTime: '',
                    imageFiles: null,
                    attachedFiles: null
                }
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
                selectedNotice: {
                    noticeId: '',
                    title: '',
                    content: '',
                    createTime: '',
                    imageFiles: null,
                    attachedFiles: null
                }
            }
            
        default:
            return state
    }
}

export default noticeReducer;