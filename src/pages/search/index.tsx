import React, { useEffect } from 'react'
import './index.scss'
const InpBox = () => {
    
    return (
        <div className="InpBox">
            <div className="left_con">
                <input id="researchBox" placeholder="搜索" type="text" />
                <img alt="" className="search-img" src="http://mcontent.10086.cn/web/fs/media/p/154/353/11161/image/20180627/1341438.png" />
                <span className="submit" >搜索</span>
            </div>
            <div className="search-close">
                取消
            </div>
        </div>
    )
}

export default function Search() {
    // http://m.music.migu.cn/migu/remoting/cms_list_tag?pageSize=10&nid=24041523&pageNo=0&type=2005
    useEffect(() => {
        console.log('search')
    }, [])

    return (
        <div className="Search">
            <InpBox />
            search
            search
        </div>
    )
}
