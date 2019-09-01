// 首页推荐模块
// client_play_list_tag
export const REQUEST_TUIJIANLIST = 'REQUEST_TUIJIANLIST'
export const RECEIVE_TUIJIANLIST = 'RECEIVE_TUIJIANLIST'
// 初始化
export const requestTuijianList = () => ({
    type: REQUEST_TUIJIANLIST,
})
// 接受后
export const receiveTuijianList = (state) => ({
    type: RECEIVE_TUIJIANLIST,
    tuijianList: state.data.msg,
})
