import React, { createContext, useReducer } from 'react'
import request from 'utils/request'
export const ReducerBoxContext = createContext({
    state: [],
    dispatch:(info?:any) => {}
})

export const ReducerBoxReducer = props => {

    const reducer = (state, action) => {
        switch(action.type){
            case 'INDEX_TUIJIAN': {
                const getResp = async () => {
                    let res: any = await request({url:'client_play_list_tag'})
                    let newlist = res.data.msg
                    // setList(newlist)
                    return newlist
                };
                let state = getResp()
                // console.log('1111222')
                return state

            }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, [])
    console.log('state-----', state)
    return (
        <ReducerBoxContext.Provider value={{dispatch,state}}>
            {props.children}
        </ReducerBoxContext.Provider>
    )
}