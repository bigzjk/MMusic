import React, { useEffect, createContext, useContext } from 'react'
import SongItem from 'components/SongItem'
import request from 'utils/request'
import { requestTuijianList, receiveTuijianList } from 'hooksRudecer/tuijian'
import {ReducerBoxContext, ReducerBoxReducer} from 'hooksRudecer'

import './index.less'
export const SongItemListContext = createContext({
    image: '',
    playlistName: '',
})

// useReducer是传入组件的children,所以需要多包一层
export default function SongItemList(props) {
    let title = props.title
    return (
        <ReducerBoxReducer>
            <SongItemListChild title={title} />
        </ReducerBoxReducer>

    )
}
function SongItemListChild(props) {
    const {dispatch, state} = useContext(ReducerBoxContext)

    useEffect(() => {
        // 首先分发一个开始异步获取数据的action
        dispatch(requestTuijianList())
        request({url: 'client_play_list_tag'}).then(resp => {
            // 获取到数据后分发一个action，通知reducer更新状态
            dispatch(receiveTuijianList(resp))
        })
        return () => {
            console.log('---')
        }
    }, [])
    let showList = state.tuijianList || []
    return (
        <div className="SongItemList ">
            <div className="title">{props.title}</div>
            {showList.length > 0 && showList.map((item, i) => (
                <div key={i} className="SongItemBox">
                    <SongItemListContext.Provider value={item}>
                        <SongItem />
                    </SongItemListContext.Provider>
                </div>
            ))}
        </div>
    )
}
