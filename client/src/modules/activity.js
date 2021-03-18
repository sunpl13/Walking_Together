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

export const getPartner = async(stdId) => {
    const res = await axios.get(`${url}/activity/create/stdId=${stdId}`)
    .then((response) => {
        console.log(response)
    }).catch((err) => alert(err));

    return {
        type: GETPARTNER,
        payload: res.data
    }
}

export const createActivity = async(stdId, partnerId) => {
    const res = await axios.post(`${url}/activity/create`, {
        stdId: stdId,
        partnerId: partnerId
    }).then((response) => {
        console.log(response)
    }).catch((err) => alert(err));

    return {
        type: CREATEACTIVITY,
        payload: {
            partnerId: partnerId, 
            activityId: res.data
        }
    }
}

export const updatePhoto = async(activityId, startPhoto) => {
    const date = new Date();
    const res = await axios.post(`${url}/activity`, {
        activityId: activityId,
        startPhoto: startPhoto
    }).then((response) => {
        console.log(response)
    }).catch((err) => alert(err));

    return {
        type: UPDATEPHOTO,
        payload: date.now()

    }
}

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

export const finishActivity = async(activityId, map, startTime, finishTime, distance, finishPhoto) => {
    const res = await axios.post(`${url}/activity/finish`, {
        activityId: activityId,
        map: map,
        startTime: startTime,
        finishTime: finishTime,
        distance: distance,
        finishPhoto: finishPhoto,
    }).then((response) => {
        console.log(response)
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