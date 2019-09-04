import React, {useContext} from 'react'
import { SongItemListContext } from 'components/SongItemList'
import './index.scss'
import { Link } from 'react-router-dom';
interface IProps {
    image: string
    playlistName: string
    playlistId?: string
}

export default function SongItem() {
    let itemInfo: IProps = useContext(SongItemListContext)
    return (
        <div className="SongItem">
            <Link to={`/detail?playListId=${itemInfo.playlistId}`}>
                <div className="imgBox">
                    <img src={itemInfo.image} alt="" />
                </div>
                <p>{itemInfo.playlistName}</p>
            </Link>

        </div>
    )
}
