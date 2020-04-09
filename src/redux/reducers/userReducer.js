import {SET_USER, SET_DATA} from '../types'

export default function(state= {}, action){
    switch(action.type){
        case SET_USER:
            console.log('set user')
            return{
                ...state,
                message: action.payload
            }
        case SET_DATA:
                return{
                    ...state,
                    data: action.payload
                }
        default:
            return state;
    }
}