import * as types from '../constants/constants'
const homeReducer =function (state = {bannerList: []}, action) {
    switch(action.type) {
        case types.RECEIVE_HOME_BANNER: 
            let bannerList = action.postInfo && action.postInfo.data && action.postInfo.data.result && action.postInfo.data.result.results || []
            return {
                ...state,
                bannerList
            }
        default: 
            return state
    }
}
export default homeReducer 