import axios from 'axios'

const initialState = {
    exercise: {},
    dbMessage: '',
    exercises: [],
    currWorkout: {}
}
///////////END initialState declaration/////////////

/////////////////START String Literals//////////////////////
const CREATE_EX = 'CREATE_EX'
const ACKNOWLEDGE = 'ACKNOWLEDGE'
const GET_EXERCISE = 'GET_EXERCISE'
const EDIT_EXERCISE = 'EDIT_EXERCISE'
const CLEAR_EXERCISE = 'CLEAR_EXERCISE'

/////////////////END String Literals//////////////////////


/////////////////Exporting action creators//////////////////////
export function addExToDB(name, type, muscle, video, img) {
    let msg = axios.post('/exercise', { name, type, muscle, img, video }).then(res => {
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

export function getExById(id){
    let ex = axios.get(`/exercise/search/${id}`).then(res => {
        return res.data
    })
    return{
        type: GET_EXERCISE,
        payload: ex
    }
}

export function editExercise(id, name, type, muscle, video, img){
    let msg = axios.put(`/exercise`, { id, name, type, muscle, video, img }).then(res => {
        return res.data.message
    })
    return{
        type: EDIT_EXERCISE,
        payload: msg
    }
}

export function clearExercise(){
    return{
        type: CLEAR_EXERCISE,
        payload: 'cleard'
    }
}


/////////////////END exporting action creators//////////////////////




////////////////BEGIN REDUCER//////////////////////////////
export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_EX + '_FULFILLED':
            return {...state, dbMessage: action.payload}
        case GET_EXERCISE + '_FULFILLED':
            return {...state, exercise: action.payload}
        case EDIT_EXERCISE + '_FULFILLED':
                return {...state, dbMessage: action.payload, exercise: {}}
        case CLEAR_EXERCISE:
                return {...state, exercise: {}}
        case ACKNOWLEDGE:
            return {...state, dbMessage: ''}
        default:
            return state
    }
}