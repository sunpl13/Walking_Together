import axios from "axios";
const url = process.env.REACT_APP_SERVER;

//initial state
const INIT_ADMIN_STATE = {
  selected_activity: {}
};


//action type
const GETACTIVITYDETAIL = "GETACTIVITYDETAIL";
const RESETADMIN = "RESETADMIN";


//활동 세부사항 받아오기
export const getAdminActivityDetail = (
  activityId
) => async(dispatch) => {
  try {
    const res = await axios
    .get(`${url}/admin/activityInfo/detail?activityId=${activityId}`, {
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })

    dispatch({
      type: GETACTIVITYDETAIL,
      payload: res.data.data
    });
  } catch(err) {
    alert(err.response.data.message)
  };
};

//로그아웃 시 리셋
export const resetAdmin = () => async(dispatch) => {
  dispatch({
    type: RESETADMIN
  });
};


//reducer
const adminReducer = (state = INIT_ADMIN_STATE, action) => {
  switch(action.type) {
    case GETACTIVITYDETAIL:
      return {
        ...state,
        selected_activity: action.payload
      };

    case RESETADMIN:
      return INIT_ADMIN_STATE;

    default:
      return state;
  };
};

export default adminReducer;