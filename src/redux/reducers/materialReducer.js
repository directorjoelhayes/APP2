import {SET_MATERIAL} from '../types'

export default function(state={}, action){
    switch(action.type){
        case SET_MATERIAL:
            return{
                ...state,
                material: action.payload
            }
        default:
            return state;
    }
}