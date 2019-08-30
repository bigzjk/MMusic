import React from 'react';
// import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import './index.scss'

export default class Btn extends React.Component {
    
    render(){
        return( 
            <div className="Search" onClick={index => this.props.callback(this.props.index)} >
               点击{this.props.index}
            </div>
        )
    }
}

