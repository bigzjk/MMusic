import React from 'react';
// import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import connect from '../../utils/connect'
import Demo from './demo'

import './index.scss'
@connect()
class Home extends React.Component {
    constructor(props){
        super(props)
        // console.log('props', this.props)
    }
    componentDidMount() {
        console.log('this.props.actions', this.props.actions)
        this.props.actions.postAction()
    }
    render(){
        // console.log('=====', this.props)
        return( 
            <div className="home">
                react
                <Demo />
                <p >
                    goback Index11
                </p>
                <img src='https://asset-stage.yit.com/SECOND_FLOOR/IMAGE/01f6e3a1a275ae2564d9c651d81d3ad2_600X600.jpeg?x-oss-process=image/resize,m_mfit,limit_1,w_200,h_200' />
                <Link to="./search">gosearch</Link>
            </div>
        )
    }
}
export default Home