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
const RESETNOTICE = 'RESETNOTICE';

const url = process.env.REACT_APP_SERVER;


//action
export const insertNotice = (       //공지글 등록
    formData
    ) => async(dispatch) => {
        await axios.post(`${url}/admin/createpost` ,formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => {
            alert(res.data.message);
        }).catch((err) => alert(err.response.data.message));

        dispatch({
            type: INSERTNOTICE
        });
};

export const updateNotice = (       //공지글 수정
    formData
    ) => async(dispatch) => { 
        await axios.post(`${url}/admin/update`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            alert(res.data.message);
        }).catch((err) => alert(err.response.data.message));

        dispatch({
            type: UPDATENOTICE,
            title: formData.get("title"),
            content: formData.get("content"),
            imageFiles: formData.get("imageFiles"),
            attachedFiles: formData.get("attachedFiles")
        });
};

export const deleteNotice = (           //공지글 삭제
    noticeId
    ) => async(dispatch) => {   
        await axios.get(`${url}/admin/delete?noticeId=${noticeId}`, {
            headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
        })
        .then((res) => {
            alert(res.data.message);
        }).catch((err) => alert(err.response.data.message));

        dispatch({
            type: DELETENOTICE
        });
};

export const selectNotice = (          //공지글 세부내용 조회
    noticeId
    ) => async(dispatch) => { 
        await axios.get(`${url}/notice`, {
            params: {
                noticeId: noticeId
            },
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            dispatch({
                type: SELECTNOTICE,
                payload: res.data.data
            })
        }).catch((err) => alert(err.response.data.message));
};

export const getNoticeList = (          //공지사항 목록 가져오기
    page,
    keyword
    ) => async(dispatch) => {
        if(keyword!=null) {
            await axios.post(`${url}/noticeList`,{
                page: page,
                keyword: keyword
            },{
                headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
            }).then((res) => {
                if(res.data.code === 400) {
                    dispatch({
                        type: GETLIST,
                        payload: {
                            data: [],
                            pageInfo: {             //페이지 정보
                                page: 0,
                                totalPage: 0,
                                start: 0,
                                end: 0,
                                prev: false,
                                next: false,
                                pageList: []
                            }
                        }
                    })
                } else if(res.status === 200) {
                    dispatch({
                        type: GETLIST,
                        payload: res.data
                    })
                }
            }).catch (err => {console.log(err.response.data.message)})
        }else {
            await axios.post(`${url}/noticeList`, {
                page: page
            }, {
                headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
            }).then((res) => {
                if(res.data.code === 400) {
                    dispatch({
                        type: GETLIST,
                        payload: {
                            data: [],
                            pageInfo: {             //페이지 정보
                                page: 0,
                                totalPage: 0,
                                start: 0,
                                end: 0,
                                prev: false,
                                next: false,
                                pageList: []
                            }
                        }
                    })
                } else if(res.status === 200) {
                    dispatch({
                        type: GETLIST,
                        payload: res.data
                    })
                }
            }).catch (err => {console.log(err.response.data.message)})
        }
};

export const initSelectedNotice = () => async(dispatch) => {        //redux selectedNotice 초기화
    dispatch({
        type: INITSELECTEDNOTICE
    });
};

//로그아웃 시 리셋
export const resetNotice = () => async(dispatch) => {
    dispatch({
        type: RESETNOTICE
    });
};


//reducer
const noticeReducer = (state = INIT_NOTICE_STATE, action) => {
    switch(action.type) {

        case INSERTNOTICE:
            return {
                state
            };

        case UPDATENOTICE:
            return {
                ...state, 
                selectedNotice: {
                    title: action.title,
                    content: action.content,
                    imageFiles: action.imageFiles,
                    attachedFiles: action.attachedFiles
            }};

        case DELETENOTICE:
            return {
                ...state,
                selectedNotice: {
                    noticeId: '',
                    title: '',
                    content: '',
                    createTime: '',
                    imageFiles: [],
                    attachedFiles: []
                }
            };

        case SELECTNOTICE:
            return {
                ...state, 
                selectedNotice: action.payload
            };

        case GETLIST:
            return {
                ...state,
                list: action.payload.data,
                pageInfo: action.payload.pageInfo
            };
        
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
            };

        case RESETNOTICE:
            return {
                pageInfo: INIT_NOTICE_STATE.pageInfo,
                list: INIT_NOTICE_STATE.list,
                selectedNotice: INIT_NOTICE_STATE.selectedNotice
            };
            
        default:
            return state;
    };
};

export default noticeReducer;
