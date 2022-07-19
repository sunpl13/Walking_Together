import axios from "axios";

//initial state
const INIT_ACTIVITY_STATE = {
  partner: [],
  activity: {
    partner: [],
    activity: 0,
    activityId: 0,
    partnerId: 0,
    startTime: 0,
  },
  location: [
    { lat: 0.0, lng: 0.0 }
  ]
};


//action type
const GETPARTNER = "GETPARTNER";
const CREATEACTIVITY = "CREATEACTIVITY";
const UPDATEPHOTO = "UPDATEPHOTO";
const GETLOCATION = "GETLOCATION";
const FINISHACTIVITY = "FINISHACTIVITY";
const DLELTEACTIVITY = "DLELTEACTIVITY";
const RESETACTIVITY = "RESETACTIVITY";

const url = process.env.REACT_APP_SERVER;

//파트너 정보 받아오기
export const getPartner = (
  stdId, 
  history
) => async(dispatch) => {
  try {
    const res = await axios
    .get(`${url}/activity/create?stdId=${stdId}`, {
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })

    if (res.data.status === 400) {
      alert("파트너 정보가 존재하지 않습니다.");
      history.replace("/user/partner");
    } else {
      dispatch({
      type: GETPARTNER,
      payload: res.data.partners
      });
      history.replace("/user1/createactivity");
    }
  } catch(err) {
    alert(err.response.data.message)
  }
};

//활동 생성
export const createActivity = (
  formData
) => async(dispatch) => {
  try {
    const res = await axios
    .post(`${url}/activity/createActivity`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })
    dispatch({
      type: CREATEACTIVITY,
      payload: {
        partnerId: formData.get('partnerId'),
        activityId: res.data.data.activityId
      }
    });
    alert(res.data.message);
  } catch(err) { 
    alert(err.response.data.message)
  };
};

//활동 삭제
export const deleteActivity = (
  activityId
) => async(dispatch) => {
  try {
    const data = await axios
    .post(`${url}/activity/delete?activityId=${activityId}`, null, {
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })

    dispatch({
      type : DLELTEACTIVITY
    })
    return data;

  } catch(err) {
    alert(err.response.data.data)  //console
  }
}

//위치 정보 업데이트
export const getLocation = (
  latitude, 
  longitude, 
  time
  ) => async(dispatch) => {
  dispatch({
    type: GETLOCATION,
    payload: {
    lat: latitude,
    lng: longitude,
    time: time
    }
  });
};

//활동 종료
export const finishActivity = (
  formData
) => async(dispatch) => {
  try {
    const data = await axios
    .post(`${url}/activity/end`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })
  
    dispatch({
      type: FINISHACTIVITY
    });
  
    return data;

  } catch(err) {
    console.log(err.response.data)
  }
};

//강제종료된 활동 처리
export const quitActivity = (
  activityId, 
  endTime, 
  distance
  ) => async(dispatch) => {
    try {
      const res = await axios
      .post(`${url}/activity/quit`, {
        activityId,
        endTime,
        distance
      }, {
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }
      })
      
      alert(res.data.message);

      dispatch({
        type: FINISHACTIVITY
      });

    } catch(err) {
      alert(err)
    }
};

//로그아웃 시 리셋
export const resetActivity = () => async(dispatch) => {
  dispatch({
    type: RESETACTIVITY
  });
};


//reducer
const activityReducer = (state = INIT_ACTIVITY_STATE, action) => {
  switch(action.type) {

  case GETPARTNER:
    return { 
      ...state, 
      partner: action.payload 
    };
  
  case CREATEACTIVITY:
    return {
      ...state,
      activity: {
        partnerId: action.payload.partnerId,
        activityId: action.payload.activityId
      }
    };

  case UPDATEPHOTO:
    return {
      ...state,
      activity: {
        startTime: action.payload,
        activity: 1
      }
    };

  case DLELTEACTIVITY:
    return {
      ...state
    };
  
  case GETLOCATION:
    return {
      ...state,
      location: [
        ...state.location, {
          lat: action.payload.lat,
          lng: action.payload.lng,
          time: action.payload.time
        }
      ]
    };

  case FINISHACTIVITY:
    return INIT_ACTIVITY_STATE;

  case RESETACTIVITY:
    return INIT_ACTIVITY_STATE;

  default:
    return state;
  };
};

export default activityReducer;