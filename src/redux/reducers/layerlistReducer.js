import {SET_LAYERLIST} from '../types'

export default function(state= {}, action){
    switch(action.type){
        case SET_LAYERLIST:
            console.log('layerlist saved')
            
            return{
                ...state,
                layerList: action.payload
            }
        default:
            return state;
    }
}
