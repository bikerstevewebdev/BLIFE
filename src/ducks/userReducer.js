const axios = require('axios')

/////////////////START initial state declaration////////////////////
const initialState = {
    userData: {},
    user: {
        username: '',
        user_id: 0,
        profile_pic: '',
        current_protein: 0,
        current_carbs: 0,
        current_fat: 0,
        current_weight: 0,
        current_height: 0,
        current_bf: 0,
        progress_pics: []
    },
    curr_mes: { 
        waist: 0,
        neck: 0,
        chest: 0,
        weight: 0,
        height: 0,
        bf: 0,
        mes_id: 0,
        date_taken: ''
    },
    isLoggedIn: false,
    userWorkouts: [],
    userMenus: [],
    assignedMenus: [],
    assignedWorkouts: [],
    warningMsg: '',
    sideNavOpen: false,
    mezHistory: {
        weights: [],
        bfs: [],
        necks: [],
        waists: [],
        chests: [],
        dates: []
    }
}
/////////////////END initial state declaration////////////////////


/////////////////START String Literals//////////////////////
const GET_USER = 'GET_USER'
const UPDATE_STATS = 'UPDATE_STATS'
const MACRO_CALCED = 'MACRO_CALCED'
const UPDATE_MES = 'UPDATE_MES'
const GET_USER_WORKOUTS = 'GET_USER_WORKOUTS'
const GET_USER_MENUS = 'GET_USER_MENUS'
const UPDATE_USERNAME = 'UPDATE_USERNAME'
const UPDATE_FULLNAME = 'UPDATE_FULLNAME'
const UPDATE_PROFILE_PIC = 'UPDATE_PROFILE_PIC'
const REQ_COACH_ACCESS = 'REQ_COACH_ACCESS'
const ADD_WORKOUT_TO_USER = 'ADD_WORKOUT_TO_USER'
const ADD_MENU_TO_USER = 'ADD_MENU_TO_USER'
const GET_ASSIGNED_WORKOUTS = 'GET_ASSIGNED_WORKOUTS'
const GET_ASSIGNED_MENUS = 'GET_ASSIGNED_MENUS'
const UPLOAD_PHOTO = 'UPLOAD_PHOTO'
const DEPRECATE_PHOTO = 'DEPRECATE_PHOTO'
const GET_ALL_PROGRESS_PICS = 'GET_ALL_PROGRESS_PICS'
const GET_CURRENT_PICS = 'GET_CURRENT_PICS'
const CLEAR_USER_MESSAGE = 'CLEAR_USER_MESSAGE'
const TOGGLE_SIDE_NAV = 'TOGGLE_SIDE_NAV'
const GET_PAST_MEASUREMENTS = 'GET_PAST_MEASUREMENTS'
const ARCHIVE_WORKOUT = 'ARCHIVE_WORKOUT'
const ARCHIVE_MENU = 'ARCHIVE_MENU'

/////////////////END String Literals//////////////////////

/////////////////Exporting action creators//////////////////////
export function toggleSideNav(bool) {
    return {
        type: TOGGLE_SIDE_NAV,
        payload: bool
    }
}

export function clearUserMessage() {
    return {
        type: CLEAR_USER_MESSAGE,
        payload: ''
    }
}

export function getUserData() {
    let data = axios.get('/userInfo').then(res => {
        console.log(`data from backend: ${res.data.message} ${res.data.dBUser},${res.data.currMes} is here`)
        return res.data
    })
    return {
        type: GET_USER,
        payload: data
    }
}

export function getUserMenus() {
    let menus = axios.get('/userMenus').then(res => {
        return res.data
    })
    return {
        type: GET_USER_MENUS,
        payload: menus
    }
}

export function uploadPhoto(picObj) {
    let photos = axios.post('/user/uploadPhoto', picObj).then(res => {
        return res.data
    })
    return {
        type: UPLOAD_PHOTO,
        payload: photos
    }
}

export function deprecatePhoto(photo_id) {
    let photos = axios.put('/user/progressPic/decurrentize', { photo_id }).then(res => {
        return res.data
    })
    return {
        type: DEPRECATE_PHOTO,
        payload: photos
    }
}

export function getAllProgressPics() {
    let photos = axios.get('/user/progressPics').then(res => {
        return res.data
    })
    return {
        type: GET_ALL_PROGRESS_PICS,
        payload: photos
    }
}

export function getCurrentPhotos() {
    let photos = axios.get('/user/currentPics').then(res => {
        return res.data
    })
    return {
        type: GET_CURRENT_PICS,
        payload: photos
    }
}

export function archiveMenu(user_menu_id) {
    let menus = axios.put('/user/menus/archive', { user_menu_id }).then(res => {
        return res.data
    })
    return {
        type: ARCHIVE_MENU,
        payload: menus
    }
}


export function addMenuToUser(menu_id) {
    let menus = axios.post('/userMenus', { menu_id }).then(res => {
        return res.data
    })
    return {
        type: ADD_MENU_TO_USER,
        payload: menus
    }
}

export function archiveWorkout(user_workout_id) {
    let workouts = axios.put('/user/workouts/archive', { user_workout_id }).then(res => {
        return res.data
    })
    return {
        type: ARCHIVE_WORKOUT,
        payload: workouts
    }
}

export function addWorkoutToUser(workout_id) {
    let menus = axios.post('/userWorkouts', { workout_id }).then(res => {    
        return res.data        
    })            
    return {                
        type: ADD_WORKOUT_TO_USER,                    
        payload: menus                        
    }                            
}                                
                                    
export function getUserWorkouts() {
    let workouts = axios.get('/userWorkouts').then(res => {
        return res.data
    })
    return {
        type: GET_USER_WORKOUTS,
        payload: workouts
    }
}

export function getAssignedWorkouts() {
    let workouts = axios.get('/client/assigned/workouts').then(res => {
        return res.data
    })
    return {
        type: GET_ASSIGNED_WORKOUTS,
        payload: workouts
    }
}

export function getAssignedMenus() {
    let menus = axios.get('/client/assigned/menus').then(res => {
        return res.data
    })
    return {
        type: GET_ASSIGNED_MENUS,
        payload: menus
    }
}

export function updateUserStats(p, c, f, wt, ht, bf, waist, chest, neck) {
    let data = axios.put('/user/stats', { p, c, f, ht, wt, bf, waist, chest, neck }).then(res => {
        return res.data
    })    
    return {
        type: UPDATE_STATS,
        payload: data
    }
}

export function updateUsername(username) {
    let user = axios.put('/user/username', { username }).then(res => {
        return res.data
    })    
    return {
        type: UPDATE_USERNAME,
        payload: user
    }
}

export function updateFullname(fullname) {
    let user = axios.put('/user/fullname', { fullname }).then(res => {
        return res.data
    })    
    return {
        type: UPDATE_FULLNAME,
        payload: user
    }
}

export function requestCoachAccess() {
    // might get error because not sending any req.body or params
    let user = axios.put('/coach/request').then(res => {
            return res.data
    })    
    return {
        type: REQ_COACH_ACCESS,
        payload: user
    }
}

export function updateProfilePic(profile_pic) {
    let user = axios.put('/user/profilePic', { profile_pic }).then(res => {
        return res.data
    })    
    return {
        type: UPDATE_PROFILE_PIC,
        payload: user
    }
}

export function addMeasurement(wt, ht, bf, waist, chest, neck, date) {
    let newStats = axios.post('/user/mez', { ht, wt, bf, waist, chest, neck, date }).then(res => {
        return res.data
    })    
    return {
        type: UPDATE_MES,
        payload: newStats
    }
}

export function addMacrosToState(p, c, f, bf, wt, ht, currMes_id){
    return {
        type: MACRO_CALCED,
        payload: { p, c, f, bf, wt, ht, currMes_id }
    }
}

export function getPastMeasurements(){
    let measurements = axios.get('/history/user/measurements').then(res => {
        return res.data
    })
    return {
        type: GET_PAST_MEASUREMENTS,
        payload: measurements
    }
}

/////////////////END exporting action creators//////////////////////




////////////////BEGIN REDUCER//////////////////////////////
export default function(state = initialState, action) {
    switch(action.type){
        case CLEAR_USER_MESSAGE:
                return { ...state, warningMsg: action.payload }
        case GET_PAST_MEASUREMENTS + '_FULFILLED':
                return { ...state, mezHistory: action.payload }
        case UPDATE_STATS + '_FULFILLED':
                let { waist, neck, chest, weight, height, bf, mes_id } = action.payload.newMez
                return { ...state,
                    userData: action.payload.user,
                    curr_mes: { waist, neck, chest, weight, height, bf, mes_id }
                     }
        case UPDATE_MES + '_FULFILLED':
        /////////// Prior declaration might cause a problem with this destructuring
                return { ...state,
                    userData: action.payload.user,
                    curr_mes: { waist: action.payload.newMez.waist,
                        neck: action.payload.newMez.neck,
                        chest: action.payload.newMez.chest,
                        weight: action.payload.newMez.weight,
                        height: action.payload.newMez.height,
                        bf: action.payload.newMez.bf,
                        mes_id: action.payload.newMez.mes_id,
                        date_taken: action.payload.date_taken
                        },
                        user: {
                            ...state.user,
                            current_weight: action.payload.newMez.weight,
                            current_height: action.payload.newMez.height,
                            current_bf: action.payload.newMez.bf,
                            profile_pic: action.payload.user.profile_pic
                            }
                    }
        case TOGGLE_SIDE_NAV:
                     return { ...state, sideNavOpen: action.payload }
        case GET_USER_MENUS + '_FULFILLED':
                     return { ...state, userMenus: action.payload }
        case GET_ASSIGNED_MENUS + '_FULFILLED':
                     return { ...state, assignedMenus: action.payload }
        case GET_USER_WORKOUTS + '_FULFILLED':
                     return { ...state, userWorkouts: action.payload }
        case GET_ASSIGNED_WORKOUTS + '_FULFILLED':
                     return { ...state, assignedWorkouts: action.payload }
        case REQ_COACH_ACCESS + '_REJECTED':
                     return { ...state, warningMsg: action.payload.response.data.message }
        case REQ_COACH_ACCESS + '_FULFILLED':
                     return { ...state, userData: action.payload }
        case GET_USER + '_FULFILLED':
            console.log('begin getuser success', action.payload)

            if(action.payload.currMes ){
                // const { waist, neck, chest, weight, height, bf, mes_id } = action.payload.currMes
            const { curr_pro, curr_carb, curr_fat, username, user_id, profile_pic } = action.payload.dBUser
            console.log('userreducer', action.payload)
            return { ...state,
                    userData: action.payload.dBUser,
                    curr_mes: {
                        waist: action.payload.currMes.waist,
                        neck: action.payload.currMes.neck,
                        chest: action.payload.currMes.chest,
                        weight: action.payload.currMes.weight,
                        height: action.payload.currMes.height,
                        bf: action.payload.currMes.bf,
                        mes_id: action.payload.currMes.mes_id
                    },
                    isLoggedIn: true,
                    user: {
                        username,
                        user_id,
                        profile_pic,
                        current_protein: curr_pro,
                        current_carbs: curr_carb,
                        current_fat: curr_fat,
                        current_weight: action.payload.currMes.weight,
                        current_height: action.payload.currMes.height,
                        current_bf: action.payload.currMes.bf,
                        progress_pics: action.payload.pics
                        }
                    }
                } else{
                    return { ...state, userData: action.payload, isLoggedIn: true }
                }
        case MACRO_CALCED:
                console.log('macros sent to be updated on user state')
            return {...state, 
                // Users info not changed on backend yet; userData has original macros.mes_id
                    user: {
                        ...state.user,
                        current_protein: action.payload.p,
                        current_carbs: action.payload.c,
                        current_fat: action.payload.f,
                        current_bf: action.payload.bf,
                        current_weight: action.payload.wt,
                        current_height: action.payload.ht
                    },
                    curr_mes: {
                        ...state.curr_mes,
                        mes_id: action.payload.currMes_id
                        }
                }
            case GET_CURRENT_PICS +'_FULFILLED':
                return { ...state, user: {...state.user, progress_pics: action.payload}}
            case GET_ALL_PROGRESS_PICS +'_FULFILLED':
                return { ...state, user: {...state.user, progress_pics: action.payload}}
            case UPLOAD_PHOTO +'_FULFILLED':
                return { ...state, user: {...state.user, progress_pics: action.payload}}
            case DEPRECATE_PHOTO +'_FULFILLED':
                return { ...state, user: {...state.user, progress_pics: action.payload}}
            case UPDATE_USERNAME +'_FULFILLED':
                return { ...state, user: {...state.user, username: action.payload.username}, userData: action.payload}
            case UPDATE_FULLNAME +'_FULFILLED':
                return { ...state, userData: action.payload}
            case UPDATE_PROFILE_PIC +'_FULFILLED':
                return { ...state, user: {...state.user, profile_pic: action.payload.profile_pic}, userData: action.payload}
            case ADD_WORKOUT_TO_USER +'_FULFILLED':
                return { ...state, userWorkouts: action.payload}
            case ARCHIVE_WORKOUT +'_FULFILLED':
                return { ...state, userWorkouts: action.payload}
            case ADD_MENU_TO_USER +'_FULFILLED':
                return { ...state, userMenus: action.payload}
            case ARCHIVE_MENU +'_FULFILLED':
                return { ...state, userMenus: action.payload}
        default:
            return state
    }
}