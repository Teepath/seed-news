import { GET_DATA, GET_DATA_BYIDS } from "../action/action";

const initialState = {
    storiesIds: [],
    story:{}
}


const News = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_BYIDS:
            return {
                ...state,
                storyIds:action.payload
            }
        case GET_DATA:
            return {
                ...state,
                story:action.payload
            }
        default:
            return state
    }
}

export default News;