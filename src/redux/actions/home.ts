
import {cmsListTag} from '../fetchs/cms_list_tag'

export default function getBanner () {
    return (dispatch) =>cmsListTag().then(resp => {
        dispatch({
            type: 'RECEIVE_HOME_BANNER',
            postInfo: resp
        })
        return resp
    })
}
