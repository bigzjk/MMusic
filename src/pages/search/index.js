import React from 'react';
// import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import Btn from './Btn'
import './index.scss'

export default class Search extends React.Component {
    constructor(){
        super()
        this.state={
            nowIndex: 0,
            list: [1,2,3,4]
        }
    }
    
    handleClick = (i) => {
        console.log(i)
        const { list } = this.state
        this.setState({
            nowIndex:( list.length != i + 1) ? i + 1 : 0
        })
    }
    render(){
        return( 
            <div className="Search">
                Search
                <p>
                    Search Index11
                    
                </p>
                <Link to="./">goIndex</Link>
                {this.state.list.map((item, i) => (
                    this.state.nowIndex == i ? <Btn key={i} index={i} callback={this.handleClick} /> : null
                ))}
            </div>
        )
    }
}

