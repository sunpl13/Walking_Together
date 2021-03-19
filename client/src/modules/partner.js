import axios from 'axios';


const GET_PARTNER = 'GET_PARTNER';
const CREATE_PARTNER = 'CREATE_PARTNER';
const CHANGE_PARTNER = 'CHANGE_PARTNER';
const DELETE_PARTNER = 'DELETE_PARTNER';

//파트너 생성 액션
export const createPartnerHandler = (
  stdId,                        //학번
  partnerName,                  //파트너 이름
  partnerDivision,              //파트너 구분
  partnerPhoto,                 //파트너 사진
  selectionReason,              //선정이유
  relation,                     //파트너와의 관계
  gender,                       //성별
  partnerBirth                 //파트너 생년월일
) => async(dispatch) => {
    const data = await axios.post();
}

//파트너 정보 받아오는 액션
export const getPartnerHandler = (stdId) => async(dispatch) => {
    const data = await axios.get();
}

//파트너 정보 변경
export const changePartnerHandler = (
    stdId,
    partnerName,
    partnerDivision,
    partnerPhoto,
    selectionReason,
    relation,
    gender,
    partnerBirth,
) => async(dispatch) => {
    const data = await axios.post();
}

//파트너 삭제
export const deletePartnerHandler = (partnerId) => async(dispatch) => {
    const data = await axios.post();
}



const initialstate = {
    partner : []
}

//reducer
export default function partner (state = initialstate, action) {
    switch (action.type) {
        case GET_PARTNER :
            return {};
        case CHANGE_PARTNER :
            return {};
        case CREATE_PARTNER :
            return {};
            case DELETE_PARTNER :
                return {};
    }
}