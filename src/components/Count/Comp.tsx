import React, {useContext} from 'react'
import { CounterContext } from './index'
const Comp = () => {
    // ()
    let count = useContext(CounterContext)
    return (
        <div>
            comp{count}
        </div>
    )
}

export default Comp
