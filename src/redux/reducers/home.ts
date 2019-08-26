import * as types from '../constants/constants'
const homeReducer =function (state = {bannerList: []}, action) {
    switch(action.type) {
        case types.RECEIVE_HOME_BANNER: 
            let bannerList = action.postInfo.result.results
            return {
                ...state,
                bannerList
            }
        default: 
            return state
    }
}
export default homeReducer 