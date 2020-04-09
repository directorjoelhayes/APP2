import {SET_LAMBDA} from '../types'

export default function(state= {}, action){
    switch(action.type){
        case SET_LAMBDA:
            console.log('set type')
            


            return{
                ...state,
                result: action.payload
            }
        default:
            return state;
    }
}