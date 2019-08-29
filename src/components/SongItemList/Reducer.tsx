import React, { createContext, useReducer } from 'react'

export const SongItemListReducerContext = createContext({})

export const SongItemListReducer = props => {

    const reducer = (state, action) => {
        switch(action.type){
            case 'SHOUYE': {
                return action.apiName
            }
            default:
                return state
        }
    }
    const [apiName, dispatch] = useReducer(reducer, {apiName: 'client_play_list_tag'})
    console.log(apiName, dispatch)
    return (
        <SongItemListReducerContext.Provider value={{dispatch,apiName}}>
            {props.children}
        </SongItemListReducerContext.Provider>
    )
}