import axios from 'axios';

//initial state
const INIT_ACTIVITY_STATE = {
    partner:[],
    activity:{
        activity: 0,
        activityId: 0,
        partnerId: 0,
        startTime: 0,
    },
    location:[{lat:0.0, lng:0.0}]
};


//action type
const GETPARTNER = "GETPARTNER";
const CREATEACTIVITY = "CREATEACTIVITY";
const UPDATEPHOTO = "UPDATEPHOTO";
const GETLOCATION = "GETLOCATION";
const FINISHACTIVITY = "FINISHACTIVITY";


//action
const url = process.env.REACT_APP_URL;

//파트너 정보 받아오기
export const getPartner = (stdId) => async(dispatch) => {
    const res = await axios.get(`/activity/create?stdId=${stdId}`)
    .then((response) => response.data).catch((err) => alert(err));

    dispatch({
        type: GETPARTNER,
        payload: res
    })
}

//활동 생성
export const createActivity = async(
    formData //stdId, partnerId, startPhoto formdate로 묶어서 보내기
) => {
    const res = await axios.post(`/activity/createActivity`, formData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }).then((res) => {
        alert(res.data.message)
    }).catch((err) => alert(err))

    return {
        type: CREATEACTIVITY,
        payload: {
            //partnerId: partnerId,
            activityId: res.data.activityId
        }
    }
}

//위치 정보 업데이트
export const getLocation = async(latitude, longitude, time) => {
    return {
        type: GETLOCATION,
        payload: {
            lat: latitude,
            lng: longitude,
            time: time
        }
    }
}

//활동 종료
export const finishActivity = async(activityId, map, endTime, distance, finishPhoto) => {
    await axios.post(`${url}/activity/finish`, {
        activityId: activityId,
        map: map,
        endTime: endTime,
        distance: distance,
        finishPhoto: finishPhoto,
    }).then((res) => {
        alert(res.data.message);
    }).catch((err) => alert(err));

    return {
        type: FINISHACTIVITY
    }
}


//reducer
const activityReducer = (state = INIT_ACTIVITY_STATE, action) => {
    switch(action.type) {
        
        case GETPARTNER:
            return { 
                ...state, 
                partner: action.payload 
            }

        case CREATEACTIVITY:
            return {
                ...state,
                activity: {
                    partnerId: action.payload.partnerId,
                    activityId: action.payload.activityId
                }
            }

        case UPDATEPHOTO:
            return {
                ...state,
                activity: {
                    startTime: action.payload,
                    activity: 1
                }
            }
        
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
            }

        case FINISHACTIVITY:
            return {
                ...state,
                activity: {
                    activity: 0,
                    activityId: 0,
                    partnerId: 0,
                    startTime: 0,
                },
                location: {}
            }

        default:
            return state
    }
}

export default activityReducer;