import axios from "axios";

const GET_PARTNER_BRIEF_INFO = "GET_PARTNER_BRIEF_INFO";
const GET_PARTNER_DETAIL_INFO = "GET_PARTNER_DETAIL_INFO";
const CREATE_PARTNER = "CREATE_PARTNER";
const CHANGE_PARTNER = "CHANGE_PARTNER";
const DELETE_PARTNER = "DELETE_PARTNER";
const RESET_PARTNER = "RESET_PARTNER";

const url = process.env.REACT_APP_SERVER;

const INIT_PARTNER_STATE = {
  briefPartner: [],
  partnerList: [],
  partnerDetail: {
    partnerId: "",
    partnerName: "",
    partnerDetail: "",
    partnerPhoto: "",
    selectionReason: "",
    relationship: "",
    gender: "",
    partnerBirth: "",
  },
};

//파트너 생성 액션
export const createPartnerHandler = (
  formData
) => async (dispatch) => {
  try {
    const res = await axios
    .post(`${url}/partner/create`, formData, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    alert(res.data.message)

    await dispatch({
      type: CREATE_PARTNER,
    });

  } catch(err) {

  }
};

//파트너 간단한 정보 받아오는 액션
export const getPartnerBriefInfo = (
  stdId
) => async (dispatch) => {
  try {
    const res = await axios
    .get(`${url}/mypage/partnerInfo?stdId=${stdId}`, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}` 
      },
    })
    if (res.data.status === 200) {
      dispatch({
        type: GET_PARTNER_BRIEF_INFO,
        payload: res.data,
      });
    } else if (res.data.code === 204) {
      dispatch({
        type: GET_PARTNER_BRIEF_INFO,
        payload: {
          briefPartner: [],
        },
      });
    }

  } catch(err) {
    if (err.response.data.code === 204) {
      alert(err.response.data.message);
    }
  };
};

//파트너의 상세정보 받아오기
export const getPartnerDetailInfo = (
  partnerId
) => async (dispatch) => {
  try {
    const res = await axios
    .get(`${url}/mypage/partnerInfo/detail?partnerId=${partnerId}`, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}` 
      },
    })
    dispatch({
      type: GET_PARTNER_DETAIL_INFO,
      payload: res.data.data,
    });
  } catch (err) {
    alert(err.response.data.message)
  };
};

//파트너 정보 변경
export const changePartnerHandler = (
  formData
) => async (dispatch) => {
  try {
    const res = await axios
    .post(`${url}/partner/change`, formData, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    await dispatch({
      type: CHANGE_PARTNER,
    });
    return res.status;

  } catch(err) {
    alert(err.response.data.message)
  }
};

//파트너 삭제
export const deletePartnerHandler = (partnerId) => async (dispatch) => {
  try {
    const res = await axios
    .get(`${url}/partner/delete?partnerId=${partnerId}`, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}` 
      },
    })

    if (res.data.status === 200) {
      alert(res.data.message);
    }

    await dispatch({
      type: DELETE_PARTNER,
    });
    
  } catch(err) {
    alert(err.response.data.message);
  }
};

//로그아웃 시 리셋
export const resetPartner = () => async (dispatch) => {
  dispatch({
    type: RESET_PARTNER,
  });
};

//reducer
export default function partner(state = INIT_PARTNER_STATE, action) {
  switch (action.type) {
    case GET_PARTNER_BRIEF_INFO:
      return {
        ...state,
        briefPartner: action.payload,
      };
    case GET_PARTNER_DETAIL_INFO:
      return {
        ...state,
        partnerDetail: action.payload,
      };
    case CHANGE_PARTNER:
      return {
        ...state,
      };
    case CREATE_PARTNER:
      return {
        ...state,
      };
    case DELETE_PARTNER:
      return {
        ...state,
      };
    case RESET_PARTNER:
      return INIT_PARTNER_STATE;
    default:
      return state;
  }
}
