import React, { useContext, useEffect } from 'react'
import querystring from 'querystring'
import { ReducerBoxContext, ReducerBoxReducer } from 'components/ReducerBox'
import { receiverDetail, requestDetail } from 'hooksRudecer/detail'
import request from 'utils/request'
import './index.scss'
import { Item } from 'antd-mobile/lib/tab-bar';
interface IProps {

}

const MusicListBox = () => {
    return (
        <ReducerBoxReducer>
            <MusicList />
        </ReducerBoxReducer>
    )
}
const HeadDetail = () => {
    return (
        <div className="HeadDetail">
            <div className="imgInfo"></div>
            <div className="textInfo"></div>
        </div>
    )
}
const MusicList = () => {
    const { dispatch, state } = useContext(ReducerBoxContext)
    let hash = location.hash
    let playListId = hash.split('?playListId=')[1]

    useEffect(() => {
        dispatch(requestDetail())
        request({
            url: `playlistcontents_query_tag?playListType=2&playListId=${playListId}&contentCount=29`,
        }).then( resp => {
            dispatch(receiverDetail(resp))
        })

        return () => {
            // cleanup
        };
    }, [])
    const { musicList } = state
    return (
        <div className="MusicList">
            <ul>
                {musicList.length > 0 && musicList.map(item => (
                    <li key={item.songId}>
                        <p className="musicName">{item.contentName}</p>
                        <p className="singername">{item.singerName}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default function Detail() {
    return (
        <div className="Detail">
            <HeadDetail />
            <MusicListBox />
        </div>
    )
}
