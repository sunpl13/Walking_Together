import axios from 'axios';


const GET_PARTNER_BRIEF_INFO = 'GET_PARTNER_BRIEF_INFO';
const GET_PARTNER_DETAIL_INFO = 'GET_PARTNER_DETAIL_INFO';
const CREATE_PARTNER = 'CREATE_PARTNER';
const CHANGE_PARTNER = 'CHANGE_PARTNER';
const DELETE_PARTNER = 'DELETE_PARTNER';

//파트너 생성 액션
export const createPartnerHandler = (
  stdId,                        //학번
  partnerName,                  //파트너 이름
  partnerDetail,                //파트너 세부정보
  partnerPhoto,                 //파트너 사진
  selectionReason,              //선정이유
  relationship,                     //파트너와의 관계
  gender,                       //성별
  partnerBirth                 //파트너 생년월일
) => async(dispatch) => {
     await axios.post('/partner/create',{
        stdId: stdId,
        partnerName : partnerName,
        partnerDetail : partnerDetail,
        partnerPhoto : partnerPhoto,
        selectionReason : selectionReason,
        relationship : relationship,
        gender : gender,
        partnerBirth : partnerBirth
    })
    .then(res => res.data)
    .catch(err => console.log(err));

    await dispatch({
        type : CREATE_PARTNER,
    })
}

//파트너 간단한 정보 받아오는 액션
export const getPartnerBriefInfo = (stdId) => async(dispatch) => {
    const data = await axios.get(`/mypage/partnerinfo?${stdId}`)
    .then(res => res.data)
    .catch(err => console.log(err));

    await dispatch({
        type : GET_PARTNER_BRIEF_INFO,
        payload : data
    })
}

//파트너의 상세정보 받아오기
export const getPartnerDetailInfo = (partnerId) => async(dispatch) => {
    const data = await axios.get(`/mypage/partnerInfo/detail?${partnerId}`)
    .then(res => res.data)
    .catch(err => console.log(err));

    await dispatch({
        type : GET_PARTNER_DETAIL_INFO,
        payload : data
    })
}

//파트너 정보 변경
export const changePartnerHandler = (
    stdId,
    partnerName,
    partnerDetail,
    partnerPhoto,
    selectionReason,
    relationship,
    gender,
    partnerBirth,
) => async(dispatch) => {
    const data = await axios.post('/partner/change',{
        stdId : stdId,
        partnerName : partnerName,
        partnerDetail : partnerDetail,
        partnerPhoto : partnerPhoto,
        selectionReason : selectionReason,
        relationship : relationship,
        gender : gender,
        partnerBirth : partnerBirth
    })
    .then(res => res.data)
    .catch(err => console.log(err));

    await dispatch({
        type : CHANGE_PARTNER,
        payload : data
    })
}

//파트너 삭제
export const deletePartnerHandler = (partnerId) => async(dispatch) => {
    await axios.post('/partner/delete', {
        partnerId : partnerId
    })
    .then(res => res.data)
    .catch(err => console.log(err))

    await dispatch({
        type : DELETE_PARTNER
    })
}



const initialstate = {
    briefPartner : {},
    partnerDetail : {},
};

//reducer
export default function partner(state = initialstate, action) {
    switch (action.type) {
        case GET_PARTNER_BRIEF_INFO :
            return {
                ...state,
                briefPartner : action.payload
            };
        case GET_PARTNER_DETAIL_INFO :
            return {
                ...state,
                partnerDetail : action.payload
            };
        case CHANGE_PARTNER :
            return {
                ...state,
                partnerDetail : action.payload
            };
        case CREATE_PARTNER :
            return {
                ...state
            };
        case DELETE_PARTNER :
            return {
                ...state
            }
        default :
        return state;
    }
}