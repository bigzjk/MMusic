/* tslint:disable:rule1 rule2 rule3... */
import * as React from 'react';
import {Toast, Carousel} from 'antd-mobile'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import connect from 'utils/connect'
import SongItemList from 'components/SongItemList'

import './index.scss'

interface IProps {
    actions: any
    homeReducer: any
}

interface IState {
    val: string
}

@connect('', 'homeReducer', 'getBanner')
class Home extends React.Component<IProps, IState> {
    // constructor() {
    //     super()
    //     this.state = {
    //         val: '',
    //         focusInp: false,
    //     }
    // }
    // static contextTypes = {
    //     // router: PropTypes.object.isRequired,
    // }
    public state: IState = {
        val: '',
    }

    public componentDidMount() {
        Toast.loading('加载中...')
        this.props.actions.getBanner().then((resp) => {
            // console.log('resp', resp)
            Toast.hide()
        })
    }

    private onHandleInp = () => {
        // console.log(this.context)
        // console.log(1234)
    }

    public render() {
        const { val } = this.state
        let { homeReducer } = this.props
        let banner = homeReducer.bannerList
        return(
            <div className="home">
                <Carousel
                    autoplay={false}
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                    dotActiveStyle={{
                        background: '#e40077',
                    }}
                >
                    {banner.map( item => (
                        <a
                        key={item}
                        href={item.linkData.linkUrl}
                        >
                        <img
                            src={item.linkData.linkPicUrl}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            }}
                        />
                        </a>
                    ))}
                </Carousel>
                <Link className="index-search" to="./search">
                    <div
                        className="inpBox"
                        onClick={this.onHandleInp}
                    >
                    </div>
                    {val ? null : <div className="search-prompt" onClick={this.onHandleInp}>
                        <img alt="" className="prompt-img" src="http://mcontent.10086.cn/web/fs/media/p/154/353/11161/image/20180627/1341438.png" />
                        <span className="prompt-text">搜索</span>
                    </div>}
                </Link>
                {banner.length > 0 && <SongItemList title="推荐歌单" />}
                <Link className="index-search" to="./test">
                   test
                </Link>
            </div>
        )
    }
}
export default Home
