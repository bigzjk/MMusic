import React, {useContext} from 'react'
import { SongItemListContext } from 'components/SongItemList'
import './index.scss'
interface IProps {
    image: string
    playlistName: string
}

export default function SongItem() {
    let itemInfo: IProps = useContext(SongItemListContext)
    return (
        <div className="SongItem">
            <div className="imgBox">
                <img src={itemInfo.image} alt="" />
            </div>
            <p>{itemInfo.playlistName}</p>
        </div>
    )
}
