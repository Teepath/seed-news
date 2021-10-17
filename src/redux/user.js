import { SET_USER_NAME, GET_DATA, GET_AUTHEDUSER } from "../action/action";


const initialState = {
    authentication: false,
    data: []
}


function userReducer(state = initialState, action){
    switch (action.type) {
        case SET_USER_NAME:
            return {
                ...state,
                user: action.user,
                authentication:true
            };
        case GET_AUTHEDUSER:
            return {
                ...state,
                user: action.user,
                authentication:true
            };

        case GET_DATA:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state


    }
}

export default userReducer;