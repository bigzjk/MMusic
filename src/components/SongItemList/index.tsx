import React, {useState, useEffect, createContext, useContext} from 'react'
import SongItem from 'components/SongItem'
// import request from 'utils/request'
import {SongItemListReducer, SongItemListReducerContext} from './Reducer'

import './index.scss'
export const SongItemListContext = createContext({
    image: '',
    playlistName: ''
})
export default function SongItemList(props){
    const info = useContext(SongItemListReducerContext)
    console.log('info', info)


    const [list, setList] = useState([])
    useEffect(() => {
        // const getResp = async () => {
        //     let res: any = await request({url:'client_play_list_tag'})
        //     let newlist = res.data.msg
        //     setList(newlist)
        //   };
        // getResp()
        // dispatch({
        //     type:'SHOUYE',
        //     apiName:"client_play_list_tag"
        // })

        return () => {
        }
    }, [])
    return (
        <SongItemListReducer>
            <div className="SongItemList ">
                <div className="title">{props.title}</div>
                {list.length > 0 && list.map((item, i) =>(
                    <div key={i} className="SongItemBox">
                        <SongItemListContext.Provider value={item}>
                            <SongItem />
                        </SongItemListContext.Provider>
                    </div>
                ))}
            </div>
        </SongItemListReducer>

    )
}
