import axios from 'axios';
const url = process.env.REACT_APP_SERVER;

//initial state
const INIT_ADMIN_STATE = {
    selected_activity: {}
};


//action type
const GETACTIVITYDETAIL = "GETACTIVITYDETAIL";


//활동 세부사항 받아오기
export const getAdminActivityDetail = (
    activityId
) => async(dispatch) => {
    await axios.get(`${url}/admin/activityInfo/detail?activityId=${activityId}`, {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => {
        dispatch({
            type: GETACTIVITYDETAIL,
            payload: res.data.data
        });
    }).catch((err) => alert(err.response.data.message));
};


//reducer
const adminReducer = (state = INIT_ADMIN_STATE, action) => {
    switch(action.type) {
        case GETACTIVITYDETAIL:
            return {
                ...state,
                selected_activity: action.payload
            };

        default:
            return state;
    };
};

export default adminReducer;