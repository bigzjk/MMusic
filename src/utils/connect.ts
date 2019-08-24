// import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionsLoc from '../redux/actions'

// import getPost from '../redux/actions/getPost'

const mapStateToProps = (state) =>{
    return {
        // props: state
        postReducer: state.postReducer
    }
}

// function mapDispatchToProps(dispatch) {
//     return { actions: bindActionCreators(actionsLoc, dispatch) }
// }
function mapDispatchToProps(dispatch, props) {
    return {
        actions: bindActionCreators(actionsLoc, dispatch)
    }
}


// export default connect(mapStateToProps, mapDispatchToProps)(Home)

function rconnect(pathname, pageStates, pageActions) {
    // if (!routeMap[pathname]) {
    //     routeMap[pathname] = {
    //         stateNames: pageStates,
    //         actionNames: pageActions
    //     }
    // }

    return (target) => connect(mapStateToProps, mapDispatchToProps)(target)
}

export default rconnect