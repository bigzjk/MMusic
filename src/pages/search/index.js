import React from 'react';
// import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import './index.scss'

export default class Search extends React.Component {

    render(){
        return( 
            <div className="Search">
                Search
                <p>
                    Search Index11
                    
                </p>
                <Link to="./">goIndex</Link>
            </div>
        )
    }
}

