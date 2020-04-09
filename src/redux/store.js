import {combineReducers, createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import mtypeReducer from './reducers/mtypeReducer'
import lambdaReducer from './reducers/lambdaReducer'
import mlistReducer from './reducers/mlistreducer'

import layerReducer from './reducers/layerReducer'
import layerListReducer from './reducers/layerlistReducer'
import updateUReducer from './reducers/updateUReducer'




const initialState = {}
const middleware = [thunk]

//to acces your this.reduxstate.user.data
const reducers = combineReducers({
    user: userReducer,
    type: mtypeReducer,
    lambda: lambdaReducer,
    mList: mlistReducer,

    layer: layerReducer,
    layerList: layerListReducer,
    update: updateUReducer,

})


const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware)))

export default store