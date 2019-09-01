import React, { useState, useEffect, createContext, useReducer } from 'react';
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Comp from './Comp'
import './index.scss'
function Index() {
    useEffect(() => {
        console.log('进来了,Index')
        return () => {
            console.log('出去了,Index')
        }
    }, [])
    return <h1>IndexPage</h1>
}

function List() {
    useEffect(() => {
        console.log('进来了m List')
        return () => {
            console.log('出去了， List')
        }
    })
    return <h1>ListPage</h1>
}

export const CounterContext = createContext(99)
function Counter() {

    let [count, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'add':
                return state + 1;
            case 'sub':
                return state - 1;
            default:
                return state
        }
    }, 10)
    // const [count, setCount] = useState(1)
    useEffect(() => {
        console.log('进来了')
        return () => {
            console.log('出去了')
        }
    })
    return (
        <div>
            <h3>点击了{count}次</h3>
            <div
                onClick={() => dispatch({type: 'add'})}
            >增加</div>
            <div
                onClick={() => dispatch({type: 'sub'})}

            >减少</div>
            <li><Link to="/list">列表页</Link></li>
            <li><Link to="/">首页</Link></li>

            {/* <Router>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/list">列表页</Link></li>
                </ul>
                <p>==================================</p>
                <Route path="/" exact component={Index} />
                <Route path="/list" component={List} />
            </Router> */}
            <CounterContext.Provider value={count}>
                <Comp />
            </CounterContext.Provider>
        </div>
    );
}
export default Counter;
