import axios from 'axios';

//initial state
const INIT_ACTIVITY_STATE = {
    partner:[],
    activity:{
        partner:[],
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

//파트너 정보 받아오기
export const getPartner = (
    stdId
    ) => async(dispatch) => {
    await axios.get(`/activity/create?stdId=${stdId}`)
    .then((res) => {
        if(res.data.status===400) {
            return alert(res.data.message);
        } else {
            dispatch({
                type: GETPARTNER,
                payload: res.data.partners
            })
        }
    }).catch((err) => alert(err));
}

//활동 생성
export const createActivity = (
    formData //stdId, partnerId, startPhoto formdate로 묶어서 보내기
) => async(dispatch) => {
    const res = await axios.post(`/activity/createActivity`, formData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }).then((res) => {
        alert(res.data.message)
    }).catch((err) => alert(err))

    dispatch({
        type: CREATEACTIVITY,
        payload: {
            partnerId: formData.get('partnerId'),
            activityId: res.data.activityId
        }
    })
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
        })
}

//활동 종료
export const finishActivity = (
    formData,  //activityId, map, endTime, distance, endPhoto
    ) => async(dispatch) => {
        await axios.post(`/activity/finish`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then((res) => {
            alert(res.data.message);
        }).catch((err) => alert(err));

    dispatch({
        type: FINISHACTIVITY
    })
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