export const REQUEST_DETAIL = 'REQUEST_DETAIL'
export const RECEIVER_DETAIL = 'RECEIVER_DETAIL'

export const requestDetail = () => ({
    type: REQUEST_DETAIL,
})
export const receiverDetail = (detailState) => ({
    type: RECEIVER_DETAIL,
    detailState,
})
