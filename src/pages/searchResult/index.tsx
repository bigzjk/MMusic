import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { ReducerBoxReducer, ReducerBoxContext } from 'hooksRudecer'
import './index.less'
// interface IProps {
//     a: any
// }
function SearchResultBox(props) {

    return (
        <ReducerBoxReducer>
            {SearchResult(props)}
        </ReducerBoxReducer>
    )
}

function SearchResult(props) {
    const {state, dispatch} = useContext(ReducerBoxContext)

    // console.log(a)
    console.log(state, '---------',  dispatch)
    return (
        <div className="SearchResult">
            SearchResult
        </div>
    )
}

export default withRouter(SearchResultBox)
