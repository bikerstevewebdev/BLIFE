import axios from 'axios'

const initialState = {
    dbMessage: '',
    exercises: [],
    currWorkout: {}
}
///////////END initialState declaration/////////////

/////////////////START String Literals//////////////////////
const CREATE_EX = 'CREATE_EX'
const ACKNOWLEDGE = 'ACKNOWLEDGE'

/////////////////END String Literals//////////////////////


/////////////////Exporting action creators//////////////////////
export function addExToDB(user_id, name, type, videoURL, imgURL) {
    let msg = axios.post('/exercise').then(res => {
        return res.data.message
    })
    return{
        type: CREATE_EX,
        payload: msg
    }
}
export function acknowledge() {
    return{
        type: ACKNOWLEDGE,
        payload: 'acknowledged'
    }
}


/////////////////END exporting action creators//////////////////////




////////////////BEGIN REDUCER//////////////////////////////
export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_EX + '_FULFILLED':
            return {...state, dbMessage: action.payload}
        case ACKNOWLEDGE:
            return {...state, dbMessage: ''}
        default:
            return state
    }
}