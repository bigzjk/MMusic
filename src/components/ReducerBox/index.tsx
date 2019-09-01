import React, { createContext, useReducer } from 'react'
import { RECEIVE_TUIJIANLIST } from 'hooksRudecer/tuijian'

// 初始化state值
let initState = {
    tuijianList: [],
}
export const ReducerBoxContext = createContext({
    state: initState,
    // tslint:disable-next-line:no-empty
    dispatch: (info: any) => {},
})

export const ReducerBoxReducer =  props => {

    // tslint:disable-next-line:no-shadowed-variable
    const reducer = (state = initState, action) => {
        switch (action.type) {
            // 首页推荐歌单
            case RECEIVE_TUIJIANLIST: {
                return Object.assign({}, state, {
                    tuijianList: action.tuijianList,
                })
            }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initState)

    return (
        <ReducerBoxContext.Provider value={{dispatch, state}}>
            {props.children}
        </ReducerBoxContext.Provider>
    )
}
