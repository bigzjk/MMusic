
import {cmsListTag} from '../fetchs/cms_list_tag'

export default function getPost (dispatch) {
    return (dispatch) =>cmsListTag().then(resp => {
        dispatch({
            type: 'RECEIVE_GETPOST',
            postInfo: resp.data
        })
    })
}
