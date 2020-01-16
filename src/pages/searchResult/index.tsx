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

    let url = props.location.search
    let queryInfo = queryString.parse(url)
    let { keyword } = queryInfo

    useEffect(() => {
        dispatch(requestSearchWord)
        request({
            url: '/scr_search_tag?rows=20&type=2&keyword=' + keyword,
        }).then((resp: any) => {
            let keyList = resp.data.musics
            dispatch(receiveSearchWord(keyList))
        })

    }, [])
    const { searchList } = state
    console.log('searchLi1111st', searchList);
    return (
        <div className="SearchResult">
            {searchList.length > 0 ? searchList.map(item => (
                <li key={item.copyrightId}>{item.albumName}</li>
            )) : null}
        </div>
    )
}

export default withRouter(SearchResultBox)
