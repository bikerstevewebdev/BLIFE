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
        current_bf: 0
    },
    curr_mes: { 
        waist: 0,
        neck: 0,
        chest: 0,
        weight: 0,
        height: 0,
        bf: 0,
        mes_id: 0
    },
    isLoggedIn: false,
    userWorkouts: [],
    userMenus: []
    
}
/////////////////END initial state declaration////////////////////


/////////////////START String Literals//////////////////////
const GET_USER = 'GET_USER'
const UPDATE_STATS = 'UPDATE_STATS'
const MACRO_CALCED = 'MACRO_CALCED'
const UPDATE_MES = 'UPDATE_MES'
const GET_USER_WORKOUTS = 'GET_USER_WORKOUTS'
const GET_USER_MENUS = 'GET_USER_MENUS'
/////////////////END String Literals//////////////////////

/////////////////Exporting action creators//////////////////////
export function getUserData() {
    let data = axios.get('/userInfo').then(res => {
        console.log(`data from backend: ${res.data.dBUser},${res.data.currMes} is here`)
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

export function getUserWorkouts() {
    let workouts = axios.get('/userWorkouts').then(res => {
        return res.data
    })
    return {
        type: GET_USER_WORKOUTS,
        payload: workouts
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

export function addMeasurement(wt, ht, bf, waist, chest, neck) {
    let newStats = axios.post('/user/mez', { ht, wt, bf, waist, chest, neck }).then(res => {
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
// user: {
//     ...state.user,
//     current_protein: action.payload.p,
//     current_carbs: action.payload.c,
//     current_fat: action.payload.f,
//     current_bf: action.meta.bf,
//     current_weight: action.meta.weight,
//     current_height: action.meta.height
//     }
/////////////////END exporting action creators//////////////////////




////////////////BEGIN REDUCER//////////////////////////////
export default function(state = initialState, action) {
    switch(action.type){
        case UPDATE_STATS + '_FULFILLED':
                let { waist, neck, chest, weight, height, bf, mes_id } = action.payload.newMez
                return { ...state,
                    userData: action.payload.user,
                    curr_mes: { waist, neck, chest, weight, height, bf, mes_id }
                     }
        case UPDATE_MES + '_FULFILLED':
        /////////// Prior declaration might cause a problem with this destructuring
                let { waist, neck, chest, weight, height, bf, mes_id } = action.payload.newMez
                return { ...state,
                    userData: action.payload.user,
                    curr_mes: { waist, neck, chest, weight, height, bf, mes_id }
                     }
        case GET_USER_MENUS + '_FULFILLED':
                     return { ...state, userMenus: action.payload }
        case GET_USER_WORKOUTS + '_FULFILLED':
                     return { ...state, userWorkouts: action.payload }
        case GET_USER + '_FULFILLED':
            console.log('begin getuser success', action.payload)

            // if(action.payload.currMes){
                // const { waist, neck, chest, weight, height, bf, mes_id } = action.payload.currMes
            const { curr_pro, curr_carb, curr_fat } = action.payload.dBUser
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
                        ...state.user,
                        current_protein: curr_pro,
                        current_carbs: curr_carb,
                        current_fat: curr_fat,
                        current_weight: action.payload.currMes.weight,
                        current_height: action.payload.currMes.height,
                        current_bf: action.payload.currMes.bf,
                        profile_pic: action.payload.dBUser.profile_pic
                        }
                    }
                // } else{
                    // return { ...state, userData: action.payload, isLoggedIn: true }
                // }
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
        default:
            return state
    }
}