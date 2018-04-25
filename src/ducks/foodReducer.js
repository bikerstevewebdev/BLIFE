const initialState = {
    nameIn: '',
    pIn: 0,
    cIn: 0,
    fIn: 0,
    fibIn: 0,
    imgIn: ''
}

const UPDATE_PIN = 'UPDATE_PIN'
const UPDATE_CIN = 'UPDATE_CIN'
const UPDATE_FIN = 'UPDATE_FIN'
const UPDATE_FIBIN = 'UPDATE_FIBIN'
const UPDATE_IMGIN = 'UPDATE_IMGIN'

export function updateCIn(val) {
    return {
        type: UPDATE_CIN,
        payload: val
    }
}

export function updatePIn(val) {
    return {
        type: UPDATE_PIN,
        payload: val
    }
}

export function updateFIn(val) {
    return {
        type: UPDATE_FIN,
        payload: val
    }
}

export function updateFibIn(val) {
    return {
        type: UPDATE_FIBIN,
        payload: val
    }
}

export function updateImgIn(val) {
    return {
        type: UPDATE_IMGIN,
        payload: val
    }
}





export default function(state = initialState, action) {
    switch(action.type){
        case UPDATE_CIN:
            return { ...state, cIn: action.payload}
        case UPDATE_PIN:
            return { ...state, pIn: action.payload}
        case UPDATE_FIN:
            return { ...state, fIn: action.payload}
        case UPDATE_FIBIN:
            return { ...state, fibIn: action.payload}
        case UPDATE_IMGIN:
            return { ...state, imgIn: action.payload}
        default:
            return state
    }
}