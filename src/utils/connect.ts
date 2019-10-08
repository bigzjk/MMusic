// import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionsLoc from '../redux/actions'

// import getPost from '../redux/actions/getPost'

const isString = (value) => {
    return typeof value === 'string' || value instanceof String
}
const isArray = (value) => {
    return Array.isArray ? Array.isArray(value) : Object.prototype.toString.call(value) === '[object Array]'
}

let pathnameMap = {}
const mapStateToProps = (state, props) => {
    let { pathname } = props.location
    pathname = pathname.replace('/', '')
    const stateNames = pathnameMap[pathname].stateNames || 'homeReducer'

    if (isString(stateNames)) {
        return {
            [stateNames]: state[stateNames],
        }
    }
    if (isArray(stateNames)) {
        let newState = {}
        stateNames.map(item => {
            return newState[item] = state[item]
        })
        return newState
    }
    return state
}

function mapDispatchToProps(dispatch, props) {
    let { pathname } = props.location
    pathname = pathname.replace('/', '')

    const actionNames = pathnameMap[pathname].actionNames
    let newActions = {}
    // tslint:disable-next-line:no-debugger
    // debugger
    if (isString(actionNames)) {
        newActions[actionNames] = actionsLoc[actionNames]
    } else if (isArray(actionNames)) {
        actionNames.map(item => {
            return newActions[item] = actionsLoc[item]
        })
    } else {
        newActions = actionsLoc
    }
    return {
        actions: bindActionCreators(newActions, dispatch),
    }
}

function rconnect(pathname?: string, pageStates?: any, pageActions?: any) {
    if (!pathnameMap[pathname]) {
        pathnameMap[pathname] = {
            stateNames: pageStates,
            actionNames: pageActions,
        }
    }
    // console.log('pathnameMap', pathnameMap)
    return (target) => {
        type ComponentType = typeof target
        const connectV2: ComponentType = connect(mapStateToProps, mapDispatchToProps)(target)
        return connectV2
    }
}

export default rconnect
