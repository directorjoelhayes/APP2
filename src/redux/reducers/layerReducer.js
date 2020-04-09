import {SET_LAYER} from '../types'

export default function(state= {}, action){
    switch(action.type){
        case SET_LAYER:
            console.log('set current layer')
            
            return{
                ...state,
                layer: action.payload
            }
        default:
            return state;
    }
}