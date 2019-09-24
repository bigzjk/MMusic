import React, { useContext, useEffect } from 'react'
import { ReducerBoxContext, ReducerBoxReducer } from 'hooksRudecer'
import { receiverDetail, requestDetail } from 'hooksRudecer/detail'
import request from 'utils/request'
import './index.scss'
interface IProps {

}

const MusicListBox = () => {
    return (
        <ReducerBoxReducer>
            <HeadDetail />
            <MusicList />
        </ReducerBoxReducer>
    )
}
const HeadDetail = () => {
    const { state } = useContext(ReducerBoxContext)
    let detailHead = state.detailState.detailHead[0]

    return (
        detailHead && detailHead.image ? <div className="HeadDetail">
            <div className="imgInfo">
                <img src={detailHead.image} alt="" />
            </div>
            <div className="textInfo">
                <p>{detailHead.playListName}</p>
                <div className="tabBox">
                    {detailHead.tagLists.map(v => (
                        <span key={v.tagid}>{v.tagName}</span>
                    ))}
                </div>
            </div>
        </div> : null
    )
}
const MusicList = () => {
    const { dispatch, state } = useContext(ReducerBoxContext)
    let hash = location.hash
    let playListId = hash.split('?playListId=')[1]

    useEffect(() => {
        dispatch(requestDetail())
        request([{
            url: `playlistcontents_query_tag?playListType=2&playListId=${playListId}&contentCount=29`,
        }, {
            url: `playlist_query_tag?onLine=1&queryChannel=0&createUserId=221acca8-9179-4ba7-ac3f-2b0fdffed356&contentCountMin=5&playListId=${playListId}`,
        },
        ]).then( resp => {
            dispatch(receiverDetail(resp))
        })

        return () => {
            // cleanup
        };
    }, [])
    const { detailState } = state
    const { detailList } = detailState
    return (
        <div className="MusicList">
            <ul>
                {detailList.length > 0 && detailList.map(item => (
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
            <MusicListBox />
        </div>
    )
}
