//initial state
const INIT_TOPBAR_STATE = {
    left: "",
    center: {title:"", data:""},
    right: "", 
    lfunc: null, 
    rfunc: null, 
    size: ""
};


//action type
const CHANGEBAR = "CHANGEBAR";

//파트너 정보 받아오기
export const changeBar = (
    left, center, right, lfunc, rfunc, size
    ) => ({
        type: CHANGEBAR,
        left: left,
        center: center,
        right: right,
        lfunc: lfunc,
        rfunc: rfunc,
        size: size
    });


//reducer
const topbar = (state = INIT_TOPBAR_STATE, action) => {
    switch(action.type) {

        case CHANGEBAR:
            return { 
                ...state, 
                left: action.left,
                center: action.center,
                right: action.right,
                lfunc: action.lfunc,
                rfunc: action.rfunc,
                size: action.size
            };
       
        default:
            return state;
    };
};

export default topbar;