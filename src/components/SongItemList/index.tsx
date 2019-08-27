import React, {useState, useEffect, createContext} from 'react'
import SongItem from 'components/SongItem'
import request from 'utils/request'
import './index.scss'
export const SongItemListContext = createContext({
    image: '',
    playlistName: ''
})
export default function SongItemList(props){
    console.log('props', props)
    const [list, setList] = useState([])
    useEffect(() => {
        const getResp = async () => {
            let res: any = await request({url:'client_play_list_tag'})
            let newlist = res.data.msg
            setList(newlist)
          };
      
        getResp()
        return () => {
            console.log(1)
        }
    }, [])
    console.log(1233131)
    return (
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
    )
}
