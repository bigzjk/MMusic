import React, { useContext } from 'react'

import {SongItemListReducer, SongItemListReducerContext} from '../SongItemList/Reducer'

export const Button = props => {
    let hha = useContext(SongItemListReducerContext)
    // console.log('hh111111a', hha)
    return (
        <button>
            点击
        </button>
    )
}