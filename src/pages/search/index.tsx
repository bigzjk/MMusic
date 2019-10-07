import React, { useEffect, useContext } from 'react'
import { ReducerBoxContext, ReducerBoxReducer } from 'hooksRudecer'
import { requestHotKeyword, receiveHotKeyword, RECEIVE_HOT_KEYWORD, REQUEST_HOT_KEYWORD } from 'hooksRudecer/hotKeyword'
import request from 'utils/request'
import './index.scss'
import { Link } from 'react-router-dom'

const SearchBox = () => {
    return (
        <ReducerBoxReducer>
            <Hotkeyword />
        </ReducerBoxReducer>
    )
}
const InpBox = () => {
    return (
        <div className="InpBox">
            <div className="left_con">
                <input id="researchBox" placeholder="搜索" type="text" />
                <img alt="" className="search-img" src="http://mcontent.10086.cn/web/fs/media/p/154/353/11161/image/20180627/1341438.png" />
                <span className="submit" >搜索</span>
            </div>
            <div
                className="search-close"
                onClick={() => {
                    window.history.go(-1)
                }}
            >
                取消
            </div>
        </div>
    )
}

const Hotkeyword = () => {
    const {dispatch, state} = useContext(ReducerBoxContext)
    useEffect(() => {
        dispatch(requestHotKeyword())
        request({url: 'cms_list_tag?pageSize=10&nid=24041523&pageNo=0&type=2005'}).then(resp => {
            dispatch(receiveHotKeyword(resp))
        })
    }, [])
    console.log('state', state)
    const { keywordList } = state
    return (
        <div className="Hotkeyword">
            <ul>
                {keywordList.length > 0 ? keywordList.map(item => (
                    <Link key={item.contentId} to={`./searchResult?keyword=${item.txtData.txtCotent}`}>
                        <li
                            onClick={() => {
                                console.log('history', history)
                                // history.push({pathname: '/searchResult', query: {
                                //     keyword: item.txtData.txtCotent,
                                //   }})
                            }}
                        >{item.txtData.txtCotent}</li>
                    </Link>
                )) : null}
            </ul>
        </div>
    )
}
export default function Search() {
    return (
        <div className="Search">
            <InpBox />
            <SearchBox />
        </div>
    )
}
