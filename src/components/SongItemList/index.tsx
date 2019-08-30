import React, {useState, useEffect, createContext, useContext} from 'react'
import SongItem from 'components/SongItem'
import request from 'utils/request'
import {ReducerBoxContext, ReducerBoxReducer} from 'components/ReducerBox'

import './index.scss'
export const SongItemListContext = createContext({
    image: '',
    playlistName: ''
})

export default function SongItemList(props){
    let title = props.title
    return (
        <ReducerBoxReducer>
            <SongItemListChild title={title} />
        </ReducerBoxReducer>

    )
}
function SongItemListChild(props){
    const {dispatch, state = []} = useContext(ReducerBoxContext)
    console.log('statestate', state)

    const [list, setList] = useState([])
    useEffect(() => {
        // const getResp = async () => {
        //     let res: any = await request({url:'client_play_list_tag'})
        //     let newlist = res.data.msg
        //     setList(newlist)
        //   };
        // getResp()
        
        // dispatch({
        //     type:'INDEX_TUIJIAN',
        //     // apiName:"client_play_list_tag"
        // })
        console.log('state', state)
        setList(state)
        return () => {
        }
    }, list)
    
    return (
        <div className="SongItemList ">
            <div className="title">{props.title}</div>
            {state.length > 0 && state.map((item, i) =>(
                <div key={i} className="SongItemBox">
                    <SongItemListContext.Provider value={item}>
                        <SongItem />
                    </SongItemListContext.Provider>
                </div>
            ))}
            <div onClick={() => {
                dispatch({
                    type:'INDEX_TUIJIAN',
                    // apiName:"client_play_list_tag"
                })
            }}>dianji </div>
        </div>
    )
}
