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
const InpBox = (props) => {
    let [searchVal, setSearchVal] = useState('')
    const handleChange = (e) => {
        let val = e.target.value
        setSearchVal(val)
    }

    const handleSubmit = () => {
        searchVal = encodeURIComponent(searchVal)
        props.history.push(`/searchResult?keyword=${searchVal}`)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    return (
        <div className="InpBox">
            <div className="left_con">
                <input id="researchBox" placeholder="输入搜索词~" value={searchVal} onChange={handleChange} onKeyDown={handleKeyDown} type="text" />
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
    console.log('keywordList', keywordList);
    return (
        <div className="Hotkeyword">
            <ul>
                {keywordList.length > 0 ? keywordList.map(item => (
                    <li
                        key={item.contentId}
                        onClick={() => {
                            let keyword = encodeURIComponent(item.txtData.txtCotent)
                            props.history.push(`/searchResult?keyword=${keyword}`)
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
            <InpBox {...props} />
            <SearchBox {...props} />
        </div>
    )
}
