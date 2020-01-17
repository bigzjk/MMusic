import React, { useEffect, useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import { ReducerBoxReducer, ReducerBoxContext } from 'hooksRudecer'
import { requestSearchWord, receiveSearchWord } from '../../hooksRudecer/searchResult'
import request from 'utils/request'
import './index.less'

function SearchResultBox(props) {
    return (
        <ReducerBoxReducer>
            <SearchResult {...props} />
        </ReducerBoxReducer>
    )
}

function SearchResult(props) {
    const {dispatch, state} = useContext(ReducerBoxContext)
    let [isload, setIsload] = useState(false)
    let url = props.location.search
    let queryInfo = queryString.parse(url)
    let { keyword } = queryInfo

    useEffect(() => {
        dispatch(requestSearchWord)
        request({
            url: '/scr_search_tag?rows=20&type=2&keyword=' + keyword,
        }).then((resp: any) => {
            setIsload(true)
            let keyList = resp.data.musics
            dispatch(receiveSearchWord(keyList))
        })

    }, [])
    const { searchList } = state
    console.log('searchLi1111st', searchList);
    return (
        <div className="SearchResult">
            {
            isload ?
                searchList && searchList.length > 0 ? searchList.map(item => (
                    <li className="item flex-wrap " key={item.copyrightId}>
                        <div className="item-box"><img src={item.cover} alt=""/></div>
                        <div className="flex1 item-info">
                            <h3>{item.songName}</h3>
                            <p>{item.singerName}</p>
                        </div>
                    </li>
                )) :
                <div>暂无数据。。。。</div>
                : null
            }
        </div>
    )
}

export default withRouter(SearchResultBox)
