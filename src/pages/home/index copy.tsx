import * as React from 'react';
// import ReactDOM from 'react-dom'
// import { Link } from 'react-router-dom'
import {Toast, Carousel} from 'antd-mobile'
import connect from 'utils/connect'
import SongItemList from 'components/SongItemList'
// import SongItemListBox from 'components/SongItemListBox'

import './index.scss'
import { ChangeEvent } from 'react';
interface IProps {
    homeReducer: any
    actions: IConnectProps
}

interface IState {
    val: string
    focusInp: boolean
}
/* TODO：此处类型待修改，因为目前还没有重整connect和request，没法给太具体的类型定义 */
/* 关联redux之后的类型 */
export interface IConnectProps {
    actions?: {
        [index: string]: (...args: any[]) => (Promise<any> | any | void);
    }
    [index: string]: any
}

// @connect('', 'homeReducer', 'getBanner')
class Home extends React.Component<IProps, IState> {

    public state: IState = {
        val: '',
        focusInp: false,
    }

    private inpRef: HTMLInputElement;

    public componentDidMount() {
        Toast.loading('加载中...')
        this.props.actions.getBanner().then((resp: any) => {
            // console.log('resp', resp)
            Toast.hide()
        })
    }

    private onChangeInp = (event: ChangeEvent<HTMLInputElement>): void => {
        let val = event.target.value.trim()
        this.setState({
            val,
        })

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
                <div className="index-search">
                    <input
                        type="text"
                        onChange={this.onChangeInp}
                        ref={(e) => this.inpRef = e}
                        value={val}
                        />
                    {val ? null : <div className="search-prompt" onClick={() => this.inpRef.focus()}>
                        <img alt="" className="prompt-img" src="http://mcontent.10086.cn/web/fs/media/p/154/353/11161/image/20180627/1341438.png" />
                        <span className="prompt-text">搜索</span>
                    </div>}
                </div>
                {banner.length > 0 && <SongItemList title="推荐歌单" />}
            </div>
        )
    }
}
export default Home
