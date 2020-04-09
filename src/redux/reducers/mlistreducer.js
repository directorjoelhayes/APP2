import {SET_MLIST} from '../types'

export default function(state= {}, action){
    switch(action.type){
        case SET_MLIST:
            console.log('set material list')
            return{
                ...state,
                mlist: action.payload
            }
        default:
            return state;
    }
}