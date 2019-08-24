import * as types from '../constants/constants'
const numReducer = (state = {num: 1}, action) =>{
    switch(action.type) {
        case types.RECEIVE_ADD: 
            return {
                ...state,
                num: state.num +1
            }
        case types.RECEIVE_LOW: 
            return {
                ...state,
                num: state.num -1
            }
        default: 
            return state
    }
}
export default numReducer 