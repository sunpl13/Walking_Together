import axios from "axios";

//initial state
const INIT_FEED_STATE = {
  list: [
    {
      activityStatus: '',
      distance: '',
      partnerName: "",
      activityDate: ""
    }
  ],
  certification: {
    data: [],
    totalTime: "",
    ordinaryTimes: "",
    careTimes: ""
  },
  selectedFeed: {
    activityId: 0,
    activityDate: "",
    partnerName: "",
    startTime: "",
    endTime: "",
    review: "",
    mapPicture: []
  }
};


//action type
const GETFEEDLIST = "GETFEEDLIST";
const GETCERTIFICATION = "GETCERTIFICATION";
const UPDATEFEED = "UPDATEFEED";
const SELECTFEED = "SELECTFEED";
const SELECTERROR = "SELECTERROR";
const RESETFEED = "RESETFEED";

const url = process.env.REACT_APP_SERVER;


//action
export const getFeedList = (
  stdId, 
  sort
) => async(dispatch) => {
  try {
    const res = await axios
    .get(`${url}/feed?stdId=${stdId}&sort=${sort}`, {
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })
  
    dispatch({
      type: GETFEEDLIST,
      payload: res.data
    });

  } catch(err) {
    alert(err.response.data.message)
  }
};

export const getCertification = (
  stdId, 
  from, 
  to
) => async(dispatch) => {
  try {
    const res = await axios
    .post(`${url}/feed/certification?stdId=${stdId}&from=${from}&to=${to}`, {}, {
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })
  
    dispatch({
      type: GETCERTIFICATION,
      payload: res.data
    });

  } catch(err) {
    alert(err.response.data.message)
  }
};

export const updateFeed = (
  activityId, 
  review
) => async(dispatch) => {
  try {
    axios
    .post(`${url}/feed/detail/review?activityId=${activityId}&review=${review}`, {}, {
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })
  
    dispatch({
      type: UPDATEFEED,
      payload: {
        activityId: activityId,
        review: review
      }
    });

  } catch(err) {
    alert(err.response.data.message)
  }
};

export const selectFeed = (
  activityId
) => async(dispatch) => {
  try {
    const res = await axios
    .get(`${url}/feed/detail?activityId=${activityId}`, {
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })
  
    dispatch({
      type: SELECTFEED,
      activityId,
      payload: res.data
    });

  } catch(err) {
    alert(err.response.data.message)
  }
};

//activitystatus ==1 일때
export const selectErrorFeed = (
  activityId
) => async(dispatch) => {
  try {
    const res = await axios
    .get(`${url}/feed/detail?activityId=${activityId}`, {
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })
  
    dispatch({
      type: SELECTERROR,
      activityId,
      payload: res.data
    });
    
  } catch(err) {
    alert(err.response.data.message)
  }
};

//로그아웃 시 리셋
export const resetFeed = () => async(dispatch) => {
  dispatch({
    type: RESETFEED
  });
};

const feedReducer = (state = INIT_FEED_STATE, action) => {
  switch(action.type) {
    
    case GETFEEDLIST:
      return {
        ...state,
        list: action.payload
      };

    case GETCERTIFICATION:
      return {
        ...state,
        certification: action.payload
      };

    case UPDATEFEED:
      return {
        ...state,
        selectedFeed: {
          ...state.selectedFeed,
          review: action.payload.review
        }
      };

    case SELECTFEED:
      return {
        ...state,
        selectedFeed: {
          activityId: action.activityId,
          activityDate: action.payload.activityDate,
          partnerName: action.payload.partnerName,
          startTime: action.payload.startTime,
          endTime: action.payload.endTime,
          review: action.payload.review,
          mapPicture: action.payload.mapPicture
        }
      };
    
    case SELECTERROR:
      return {
        ...state,
        selectedFeed: {
          activityId: action.activityId,
          activityDate: action.payload.activityDate,
          partnerName: action.payload.partnerName,
          startTime: action.payload.startTime,
          endTime: "알 수 없음",
          review: action.payload.review,
          mapPicture: []
        }
      };

    case RESETFEED:
      return INIT_FEED_STATE;

    default:
      return state;
  }
}

export default feedReducer;