import axios from 'axios'

const initialState = {
    exercise: {},
    dbMessage: '',
    exSearchResults: [],
    workout: {},
    workoutExs: [],
    workoutSearchResults: []
}
///////////END initialState declaration/////////////

/////////////////START String Literals//////////////////////
const CREATE_EX = 'CREATE_EX'
const ACKNOWLEDGE = 'ACKNOWLEDGE'
const GET_EXERCISE = 'GET_EXERCISE'
const EDIT_EXERCISE = 'EDIT_EXERCISE'
const CLEAR_EXERCISE = 'CLEAR_EXERCISE'
const CREATE_WORKOUT = 'CREATE_WORKOUT'
const EDIT_WORKOUT = 'EDIT_WORKOUT'
const GET_WORKOUT = 'GET_WORKOUT'
const CLEAR_WORKOUT = 'CLEAR_WORKOUT'
const SEARCH_EXERCISES = 'SEARCH_EXERCISES'
const SEARCH_WORKOUTS = 'SEARCH_WORKOUTS'
// const CLEAR_EX_SEARCH = 'CLEAR_EX_SEARCH'
const ADD_EX_TO_WORKOUT = 'ADD_EX_TO_WORKOUT'
const END_FITNESS_SEARCH = 'END_FITNESS_SEARCH'
const UPDATE_WORKOUT_EX = 'UPDATE_WORKOUT_EX'
const REMOVE_EX_FROM_WORKOUT = 'REMOVE_EX_FROM_WORKOUT'

/////////////////END String Literals//////////////////////


/////////////////Exporting action creators//////////////////////
export function searchExercises(name){
    console.log('Searching exercises with: ', name)
    let exs = axios.get(`/exercise/search?name=${name}`).then(res => {
        return res.data
    })
    return{
        type: SEARCH_EXERCISES,
        payload: exs
    }
}

export function endFitnessSearch() {
    return {
        type: END_FITNESS_SEARCH,
        payload: 'ended'
    }
}

export function searchWorkouts(title){
    console.log('Searching workouts with: ', title)
    let workouts = axios.get(`/workout/search?title=${title}`).then(res => {
        return res.data
    })
    return{
        type: SEARCH_WORKOUTS,
        payload: workouts
    }
}

export function addWorkoutToDB(title, type, img) {
    let newWorkout = axios.post('/workout', { title, type, img }).then(res => {
        return res.data
    })    
    return{
        type: CREATE_WORKOUT,
        payload: newWorkout
    }    
}    

export function addExToDB(name, type, muscle, video, img) {
    let msg = axios.post('/exercise', { name, type, muscle, img, video }).then(res => {
        return res.data.message
    })    
    return{
        type: CREATE_EX,
        payload: msg
    }    
}    

export function addExToWorkout(workout_id, ex_id, ex_order) {
    let exercises = axios.post('/workout/exercise', { workout_id, ex_id, ex_order }).then(res => {
        return res.data
    })    
    return{
        type: ADD_EX_TO_WORKOUT,
        payload: exercises
    }    
}    

export function updateWorkoutEx(workout_ex_id, workout_id, reps, sets, restTime, weight, ex_order, notes) {
    let exs = axios.put('/workout/exercise', { workout_ex_id, workout_id, reps, sets, restTime, weight, ex_order, notes }).then(res => {
        return res.data
    })    
    return{
        type: UPDATE_WORKOUT_EX,
        payload: exs
    }    
}    

export function acknowledge() {
    return{
        type: ACKNOWLEDGE,
        payload: 'acknowledged'
    }    
}    

export function getExById(id){
    let ex = axios.get(`/exercise/${id}`).then(res => {
        return res.data
    })
    return{
        type: GET_EXERCISE,
        payload: ex
    }
}

export function getWorkoutById(id){
    let workout = axios.get(`/workout/${id}`).then(res => {
        return res.data
    })
    return{
        type: GET_WORKOUT,
        payload: workout
    }
}

export function updateExercise(id, name, type, muscle, video, img){
    let msg = axios.put(`/exercise`, { id, name, type, muscle, video, img }).then(res => {
        return res.data.message
    })
    return{
        type: EDIT_EXERCISE,
        payload: msg
    }
}

export function updateWorkout(id, title, type, img){
    let msg = axios.put(`/workout`, { id, title, type, img }).then(res => {
        return res.data.message
    })
    return{
        type: EDIT_WORKOUT,
        payload: msg
    }
}

export function clearExercise(){
    return{
        type: CLEAR_EXERCISE,
        payload: 'cleard'
    }
}

export function removeExFromWorkout(workout_ex_id, workout_id){
    let exercises = axios.put(`/workout/removeExercise/${workout_ex_id}`, { workout_id }).then(res => {
        return res.data
    })
    return {
        type: REMOVE_EX_FROM_WORKOUT,
        payload: exercises
    }
}

// export function clearExerciseSearch(){
//     return{
//         type: CLEAR_EX_SEARCH,
//         payload: 'cleard'
//     }
// }

export function clearWorkout(){
    return{
        type: CLEAR_WORKOUT,
        payload: 'cleard'
    }
}


/////////////////END exporting action creators//////////////////////




////////////////BEGIN REDUCER//////////////////////////////
export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_EX + '_FULFILLED':
            return {...state, dbMessage: action.payload}
        case CREATE_WORKOUT + '_FULFILLED':
            return {...state, workout: action.payload}
        case GET_EXERCISE + '_FULFILLED':
            return {...state, exercise: action.payload}
        case ADD_EX_TO_WORKOUT + '_FULFILLED':
            return {...state, workoutExs: action.payload, exSearchResults: []}
        case REMOVE_EX_FROM_WORKOUT + '_FULFILLED':
            return {...state, workoutExs: action.payload}
        case GET_WORKOUT + '_FULFILLED':
            return {...state, workout: action.payload.workout, workoutExs: action.payload.exercises}
        case SEARCH_EXERCISES + '_FULFILLED':
            return {...state, exSearchResults: action.payload}
        case SEARCH_WORKOUTS + '_FULFILLED':
            return {...state, workoutSearchResults: action.payload}
        case EDIT_EXERCISE + '_FULFILLED':
                return {...state, dbMessage: action.payload}
        case EDIT_WORKOUT + '_FULFILLED':
                return {...state, dbMessage: action.payload}
        case UPDATE_WORKOUT_EX + '_FULFILLED':
                return {...state, workoutExs: action.payload}
        case CLEAR_EXERCISE:
                return {...state, exercise: {}}
        case CLEAR_WORKOUT:
                return {...state, workout: {}}
        case END_FITNESS_SEARCH:
                return {...state, exSearchResults: [], workoutSearchResults: []}
        // case CLEAR_EX_SEARCH:
        //         return {...state, exSearchResults: []}
        case ACKNOWLEDGE:
            return {...state, dbMessage: ''}
        default:
            return state
    }
}