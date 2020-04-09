import {SET_UPDATEU} from '../types'

export default function(state= {}, action){
    switch(action.type){
        case SET_UPDATEU:
            return{
                ...state,
                update: action.payload
            }
        default:
            return state;
    }
}