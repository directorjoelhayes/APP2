import {SET_USER, SET_MTYPE, SET_LAMBDA, SET_MLIST, SET_LAYER, SET_LAYERLIST, SET_UPDATEU, SET_MATERIAL, SET_DELETE} from '../types'

export const identifyUser = (data) => (dispatch) => {
    console.log('action')
    dispatch({
        type: SET_USER,
        payload: data
    })
}

export const choseMType = (data) => (dispatch) => {
    console.log('action')
    dispatch({
        type: SET_MTYPE,
        payload: data
    })
}

export const setMaterialList = (url) => async (dispatch) => {   
    console.log('action setMaterialDatabase')   
    const response = await fetch(url) ;
    const data = await response.json();
    let totalList = []; 
    
    data.forEach((element) => {
        totalList.push(element) 
    })
    console.log('totalList fetched:', totalList)
    dispatch({
        type: SET_MLIST,
        payload: totalList
    })
}

export const getLambda = (data) => (dispatch) => {
    console.log('action')
    dispatch({
        type: SET_LAMBDA,
        payload: data
    })
}





//LAYER

export const saveCurrentLayer = (data) => (dispatch) => {
    console.log('action: setting current layer')
    dispatch({
        type: SET_LAYER,
        payload: data
    })
}

//LAYERLIST

export const saveLayerList = (data) => (dispatch) => {
    console.log('action: saving layerlist')
    dispatch({
        type: SET_LAYERLIST,
        payload: data
    })
}


// To save function to update Uvalue

export const updateU = (data) => (dispatch) => {
    dispatch({
        type: SET_UPDATEU,
        payload: data
    })
}

export const setMaterial = (data) => (dispatch) => {
    dispatch({
        type: SET_MATERIAL,
        payload: data
    })
}

export const saveDelete = (data) => (dispatch) => {
    dispatch({
        type: SET_DELETE,
        payload: data
    })
}