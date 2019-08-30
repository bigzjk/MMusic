import React, {useContext} from 'react'
import { CounterContext } from './index'
const Comp = () => {
    // ()
    let count = useContext(CounterContext)
    console.log('count', count)
    return (
        <div>
            comp{count}
        </div>
    )
}

export default Comp
