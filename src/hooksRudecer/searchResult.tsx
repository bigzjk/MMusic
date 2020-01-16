
export const REQUEST_SEARCHWORD = 'REQUEST_SEARCHWORD'
export const RECEIVE_SEARCHWORD = 'RECEIVE_SEARCHWORD'

export const requestSearchWord = () => ({
    type: REQUEST_SEARCHWORD,
})

export const receiveSearchWord = (searchList: any[]) => ({
    type: RECEIVE_SEARCHWORD,
    searchList,
})
