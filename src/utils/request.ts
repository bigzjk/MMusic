import axios, {AxiosRequestConfig} from 'axios'
import {Toast} from 'antd-mobile'
// /* tslint:disable */
// const request = (opt) => {
//     // Toast.hide()
//     let obj = {
//         // baseURL: 'http://127.0.0.1:3456/',
//         baseURL: 'http://mapi.alkun.top',
//         url: opt.url,
//     }
//     // Toast.loading('加载中。。。', 60)
//     return new Promise((resolve, reject) => {
//         axios(obj).then(function(respp): void {
//             Toast.hide()
//             resolve(respp)
//         })
//     })
// }

// export default request

// Lib a.d.ts
// interface IParamsInfo {
//     method: string,
//     baseURL: string,
//     url: string,
//     // params: IParams,
//     data?: any,
//     params?: any,
// }

const request = (paramInfo: any) => {
    function getDataFn(obj) {
        let getData: AxiosRequestConfig = {
            url: obj.url,
            method: obj.method || 'get',
            // baseURL: 'http://127.0.0.1:3456/',
            baseURL: 'http://mapi.alkun.top',
        }
        if (getData.method === 'get') {
            getData.params = obj.data
        } else {
            getData.data = obj.data
        }
        return getData
    }

    if (!Array.isArray(paramInfo)) {
        return new Promise((resolve, reject) => {
            axios(getDataFn(paramInfo)).then(resp => {
                let result = {
                    data: resp.data,
                    statusInfo: {
                        code: resp.status,
                        msg: resp.statusText,
                    },
                }
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    } else {
        let fetchArray = paramInfo.map(v => {
            return axios(getDataFn(v))
        })
        return new Promise((resolve, reject) => {
            axios.all(fetchArray)
            .then(axios.spread(function (...arg) {
                // 多个请求现在都执行完成
                resolve(arg)
            })).catch(err => {
                console.log(err)
            })
        })

    }
}

export default request
