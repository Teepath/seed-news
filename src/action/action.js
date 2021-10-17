import { setUserData, getUserData, getStoriesIds,getStory } from "../utils/api_data";

export const SET_USER_NAME = "SET_USER_NAME";
export const GET_AUTHEDUSER ="GET_AUTHEDUSER";

export const GET_DATA = "GET_DATA";
export const GET_DATA_BYIDS = "GET_DATA_BYIDS"


export const authUser = (user) => {
    return {
        type: SET_USER_NAME,
        user
    }
}
export const getUserAction = (user) => {
    return {
        type: GET_AUTHEDUSER,
        user
    }
}

export const getData = (data) => {
    return {
        type: GET_DATA,
        data
    }
}

export const setUserActionCreator =  (user,navigation) => dispatch => {
    setUserData(user).then((name) => {
        dispatch(authUser(name))
        navigation.navigate('Home')
    })
  
}


 
export const getUserHandle = (nav) => dispatch => {
    return getUserData().then((user) => {
        console.log(user);
            dispatch(getUserAction(user));
       nav.navigate('Home')
    })
 
   
}

export const newIdsCreator = (data) => {
    return {
        type: GET_DATA_BYIDS,
        payload: data
    }
}

export const newsCreator = (res) => {
    return {
        type: GET_DATA,
        payload: res
    }
}

export const handleStoryIds = (st, lim) => dispatch => {
    return getStoriesIds(st, lim).then((result) => {
        dispatch(newIdsCreator(result))
    })
}

export const handleStory = (ids) => dispatch => {
    return getStory(ids).then((data) => {
        dispatch(newsCreator(data))
    })
}