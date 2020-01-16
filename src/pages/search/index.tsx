import React, { useState, useEffect, useContext } from 'react'
import { ReducerBoxContext, ReducerBoxReducer } from 'hooksRudecer'
import { requestHotKeyword, receiveHotKeyword, RECEIVE_HOT_KEYWORD, REQUEST_HOT_KEYWORD } from 'hooksRudecer/hotKeyword'
import request from 'utils/request'
import './index.less'

const SearchBox = (props) => {
    return (
        <ReducerBoxReducer>
            <Hotkeyword {...props}/>
        </ReducerBoxReducer>
    )
}
const InpBox = () => {
    let [searchVal, setSearchVal] = useState('')
    const handleChange = (e) => {
        let val = e.target.value
        setSearchVal(val)
    }

    const handleSubmit = () => {
        console.log(searchVal);
        searchVal = encodeURIComponent(searchVal)
        console.log('searchVal', searchVal)
        request({
            url: '/scr_search_tag?rows=20&type=2&keyword=' + searchVal,
        })
    }

    return (
        <div className="InpBox">
            <div className="left_con">
                <input id="researchBox" placeholder="输入收缩" value={searchVal} onChange={handleChange} type="text" />
                <img alt="" className="search-img" src="http://mcontent.10086.cn/web/fs/media/p/154/353/11161/image/20180627/1341438.png" />
                <span className="submit" onClick={handleSubmit} >搜索</span>
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

const Hotkeyword = (props) => {
    console.log('propspropsprops', props)
    const {dispatch, state} = useContext(ReducerBoxContext)
    useEffect(() => {
        dispatch(requestHotKeyword())
        request({url: 'cms_list_tag?pageSize=10&nid=24041523&pageNo=0&type=2005'}).then(resp => {
            dispatch(receiveHotKeyword(resp))
        })
    }, [])
    const { keywordList } = state
    return (
        <div className="Hotkeyword">
            <ul>
                {keywordList.length > 0 ? keywordList.map(item => (
                    <li
                        key={item.contentId}
                        onClick={() => {
                            props.history.push({pathname: '/searchResult', query: {
                                keyword: item.txtData.txtCotent,
                                }})
                        }}
                    >{item.txtData.txtCotent}</li>
                )) : null}
            </ul>
        </div>
    )
}
export default function Search(props) {
    return (
        <div className="Search">
            <InpBox />
            <SearchBox {...props} />
        </div>
    )
}
