import axios from 'axios'
import {Toast} from 'antd-mobile'
/* tslint:disable */
const request = (opt) => {
    // Toast.hide()
    let obj = {
        baseURL: 'http://127.0.0.1:3456/',
        url: opt.url,
    }
    opt.data && (obj.data = opt.data)
    // Toast.loading('加载中。。。', 60)
    return new Promise((resolve, reject) => {
        axios(obj).then(function(respp): void {
            Toast.hide()
            resolve(respp)
        })
    })
}

export default request
