// import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionsLoc from '../redux/actions'

// import getPost from '../redux/actions/getPost'

const mapStateToProps = (state) =>{
    return {
        // props: state
        homeReducer: state.homeReducer
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

function rconnect(pathname?: string, pageStates?: any, pageActions?: any) {
    // if (!routeMap[pathname]) {
    //     routeMap[pathname] = {
    //         stateNames: pageStates,
    //         actionNames: pageActions
    //     }
    // }
    console.log(pathname, pageStates, pageActions)
    return (target) => connect(mapStateToProps, mapDispatchToProps)(target)
}

export default rconnect