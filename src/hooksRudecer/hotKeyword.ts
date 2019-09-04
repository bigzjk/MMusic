export const REQUEST_HOT_KEYWORD = 'REQUEST_HOT_KEYWORD'
export const RECEIVE_HOT_KEYWORD = 'RECEIVE_HOT_KEYWORD'

export const requestHotKeyword = () => ({
    type: REQUEST_HOT_KEYWORD,
})
export const receiveHotKeyword = (keywordList) => ({
    type: RECEIVE_HOT_KEYWORD,
    keywordList,
})
