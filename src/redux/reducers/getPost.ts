import * as types from '../constants/constants'
const postReducer =function (state = {postInfo: {}}, action) {
    switch(action.type) {
        case types.RECEIVE_GETPOST: 
            return {
                ...state,
                postInfo: action.postInfo
            }
        default: 
            return state
    }
}
export default postReducer 