import {SET_MTYPE} from '../types'

export default function(state= {}, action){
    switch(action.type){
        case SET_MTYPE:
            console.log('set type')
            return{
                ...state,
                chosen: action.payload
            }
        default:
            return state;
    }
}