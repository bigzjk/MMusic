export const REQUEST_DETAIL = 'REQUEST_DETAIL'
export const RECEIVER_DETAIL = 'RECEIVER_DETAIL'

export const requestDetail = () => ({
    type: REQUEST_DETAIL,
})
export const receiverDetail = (detailList) => ({
    type: RECEIVER_DETAIL,
    detailList,
})
