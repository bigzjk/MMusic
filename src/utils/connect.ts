// import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionsLoc from '../redux/actions'

// import getPost from '../redux/actions/getPost'

const isString = (value) => {
    return typeof value === 'string' || value instanceof String
}
const isArray = (value) => {
    return Array.isArray ? Array.isArray(value) : Object.prototype.toString.call(value) === '[object array]'
}

let hashMap = {}
const mapStateToProps = (state, props) => {
    const { hash } = props.location
    const stateNames = hashMap[hash].stateNames || 'homeReducer'

    if (isString(stateNames)) {
        return {
            [stateNames]: state[stateNames],
        }
    }
    if (isArray(stateNames)) {
        let newState = {}
        stateNames.map(item => {
            return newState[stateNames] = item
        })
        return newState
    }
    return state
}

function mapDispatchToProps(dispatch, props) {
    const { hash } = props.location
    const actionNames = hashMap[hash].actionNames
    let newActions = {}

    if (isString(actionNames)) {
        newActions[actionNames] = actionsLoc[actionNames]
    } else if (isArray(actionNames)) {
        actionNames.map(item => {
            return newActions[item] = item
        })
    } else {
        newActions = actionsLoc
    }

    return {
        actions: bindActionCreators(newActions, dispatch),
    }
}

function rconnect(hash?: string, pageStates?: any, pageActions?: any) {
// function rconnect(hash, pageStates, pageActions) {
    if (!hashMap[hash]) {
        hashMap[hash] = {
            stateNames: pageStates,
            actionNames: pageActions,
        }
    }
    return (target) => {
        return connect(mapStateToProps, mapDispatchToProps)(target)
    }
}

export default rconnect
