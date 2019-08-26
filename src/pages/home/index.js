import React from 'react';
// import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import {Toast, Carousel} from 'antd-mobile'
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
        Toast.loading('加载中...')
        this.props.actions.getBanner().then(resp=>{
            console.log('resp', resp)
            Toast.hide()
        })
    }
    render(){
        let { homeReducer } = this.props
        let banner = homeReducer.bannerList
        return( 
            <div className="home">
                <Carousel
                    autoplay={false}
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                    >
                    {banner.map(val => (
                        <a
                        key={val}
                        href={val.linkData.linkUrl}
                        >
                        <img
                            src={val.linkData.linkPicUrl}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                            }}
                        />
                        </a>
                    ))}
                    </Carousel>
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