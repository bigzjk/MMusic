import React, {useContext} from 'react'
import { SongItemListContext } from 'components/SongItemList'
import './index.scss'
interface Props {
    image: string
    playlistName: string
}

export default function SongItem() {
    let itemInfo:Props = useContext(SongItemListContext)
    return (
        <div className="SongItem">
            <div className="imgBox">
                <img src={itemInfo.image} alt="" />
            </div>
            <p>{itemInfo.playlistName}</p>        
        </div>
    )
}
