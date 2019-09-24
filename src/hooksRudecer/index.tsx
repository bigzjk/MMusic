import React, { createContext, useReducer } from 'react'
import { RECEIVE_TUIJIANLIST } from './tuijian'
import { RECEIVE_HOT_KEYWORD } from './hotKeyword'
import { RECEIVER_DETAIL } from './detail'

// 初始化state值
let initState = {
    tuijianList: [],
    keywordList: [],
    detailState: {
        detailList: [],
        detailHead: [],
    },
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
            // 热搜词
            case RECEIVE_HOT_KEYWORD: {
                let keywordList = action.keywordList.data.result.results
                return Object.assign({}, state, {
                    keywordList: keywordList,
                })
            }
            // 详情
            case RECEIVER_DETAIL: {
                console.log('action', action)
                let detailList = action.detailState[0].data.contentList
                let detailHead = action.detailState[1].data.playlist
                let detailState = {
                    detailList,
                    detailHead,
                }
                return Object.assign({}, state, {
                    detailState,
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
