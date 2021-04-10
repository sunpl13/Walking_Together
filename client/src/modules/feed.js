import axios from 'axios';

//initial state
const INIT_FEED_STATE = {
    list:[{
        activityStatus: '',
        distance: '',
        partnerName: "",
        activityDate: ""
    }],
    certification: {},
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


//action
export const getFeedList = async(stdId, sort) => {
    const res = await axios.get(`/feed?stdId=${stdId}&sort=${sort}`)
    .then((response) => 
        response.data
    )
    .catch((err) => alert(err));

    return {
        type: GETFEEDLIST,
        payload: res
    }
}

export const getCertification = async(activityId) => {
    const res = await axios.get(`/feed/certification?activityId=${activityId}`)
    .then((response) => response.data)
    .catch((err) => alert(err));

    return {
        type: GETCERTIFICATION,
        payload: res
    }
}

export const updateFeed = async(activityId, review) => {
    const res = await axios.post(`/feed/detail`, {
        activityId: activityId,
        review: review
    }).then((response) => response.data)
    .catch((err) => alert(err));

    return {
        type: UPDATEFEED,
        payload: {
            activityId: activityId,
            review: review
        }
    }
}

export const selectFeed = async(activityId) => {
    const res = await axios.get(`/feed/detail?activityId=${activityId}`)
    .then((response) => response.data)
    .catch((err) => alert(err));

    return {
        type: SELECTFEED,
        activityId,
        payload: res
    }
}


//reducer
const url = process.env.REACT_APP_URL;

const feedReducer = (state = INIT_FEED_STATE, action) => {
    switch(action.type) {
        
        case GETFEEDLIST:
            return {
                ...state,
                list: action.payload
            }

        case GETCERTIFICATION:
            return {
                ...state,
                certification: action.payload
            }

        case UPDATEFEED:
            return {
                ...state,
                selectedFeed: {
                    ...state.selectedFeed,
                    review: action.payload.review
                }
            }

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
            }

        default:
            return state
    }
}

export default feedReducer;