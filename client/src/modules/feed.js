import axios from 'axios';

//initial state
const INIT_FEED_STATE = {
    list:[{
        activityStatus: '',
        distance: '',
        partnerName: "",
        activityDate: ""
    }],
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
        review: '',
        mapPicture: ""
    }
};


//action type
const GETFEEDLIST = "GETFEEDLIST";
const GETCERTIFICATION = "GETCERTIFICATION";
const UPDATEFEED = "UPDATEFEED";
const SELECTFEED = "SELECTFEED";

const url = process.env.REACT_APP_SERVER;


//action
export const getFeedList = (stdId, sort) => async(dispatch) => {
    const res = await axios.get(`${url}/feed?stdId=${stdId}&sort=${sort}`,
    {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    })
    .then((response) => response.data)
    .catch((err) => alert(err.response.data.message));

    dispatch({
        type: GETFEEDLIST,
        payload: res.data
    });
};

export const getCertification = (stdId, from, to) => async(dispatch) => {
    const res = await axios.post(`${url}/feed/certification?stdId=${stdId}&from=${from}&to=${to}`, {}, {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => res)
    .catch((err) => alert(err.response.data.message));

    dispatch({
        type: GETCERTIFICATION,
        payload: res.data
    });
};

export const updateFeed = (activityId, review) => async(dispatch) => {
    await axios.post(`${url}/feed/detail/review?activityId=${activityId}&review=${review}`, {}, {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    }).then((res) => res)
    .catch((err) => alert(err.response.data.message));

    dispatch({
        type: UPDATEFEED,
        payload: {
            activityId: activityId,
            review: review
        }
    });
};

export const selectFeed = (activityId) => async(dispatch) => {
    const res = await axios.get(`${url}/feed/detail?activityId=${activityId}`, {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
    })
    .then((res) => res.data)
    .catch((err) => alert(err.response.data.message));

    dispatch({
        type: SELECTFEED,
        activityId,
        payload: res.data
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

        default:
            return state;
    }
}

export default feedReducer;