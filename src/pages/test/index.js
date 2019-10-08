import React, { useEffect } from 'react'

import connect from 'utils/connect'


// console.log(connect)
function Test(props) {
    useEffect(() => {
        props.actions.addAction(1)
    }, [])
    return (
        <div>
            adaa{props.numReducer.num}
            <p
                onClick={() => {
                    props.actions.addAction()
                }}
            >+1</p>
        </div>
    )
}


export default connect('test', ['numReducer', 'homeReducer'], ['getBanner', 'addAction'])(Test)