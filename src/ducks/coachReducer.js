const axios = require('axios')

/////////////////START initial state declaration////////////////////
const initialState = {
    currentClient: {
        current_macros: {
            pro: 0,
            carb: 0,
            fat: 0
        },
        current_stats: {
            waist: 0,
            neck: 0,
            chest: 0,
            height: 0,
            weight: 0,
            bf: 0,
            date_taken: ''
        },
        last_login: '',
        workouts: [],
        menus: []
    },
    potentialClient: {},
    clients: [],
    coaches: [],
    coachReqs: [],
    activeCoaches: [],
    warningMsg: ''
    
}
/////////////////END initial state declaration////////////////////


/////////////////START String Literals//////////////////////
const GET_CLIENTS = 'GET_CLIENTS'
const GET_CLIENT_BY_ID = 'GET_CLIENT_BY_ID'
const SEARCH_FOR_CLIENT = 'SEARCH_FOR_CLIENT'
const GET_ADMIN_INFO = 'GET_ADMIN_INFO'
const APPROVE_COACH_ACCESS = 'APPROVE_COACH_ACCESS'
const DENY_COACH_ACCESS = 'DENY_COACH_ACCESS'
const ASSIGN_MENU = 'ASSIGN_MENU'
const ASSIGN_WORKOUT = 'ASSIGN_WORKOUT'
/////////////////END String Literals//////////////////////

/////////////////Exporting action creators//////////////////////
export function getClientData() {
    let data = axios.get('/clientInfo').then(res => {
        return res.data
    })
    return {
        type: GET_CLIENT_BY_ID,
        payload: data
    }
}

export function getClients() {
    let clients = axios.get(`/coach/clients/${coach_id}`).then(res => {
        return res.data
    })
    return {
        type: GET_CLIENTS,
        payload: clients
    }
}

export function searchForClient(email) {
    let client = axios.get(`/search/clients/${email}`).then(res => {
        return res.data
    })
    return {
        type: SEARCH_FOR_CLIENT,
        payload: client
    }
}

export function assignWorkoutToClient(workout_id, client_coach_id, client_id) {
    let clients = axios.post(`/client/workouts`, { client_coach_id, client_id, workout_id }).then(res => {
        return res.data
    })
    return {
        type: ASSIGN_WORKOUT,
        payload: clients
    }
}

export function assignMenuToClient(menu_id, client_coach_id, client_id) {
    let clients = axios.post(`/client/menus`, { client_coach_id, client_id, menu_id }).then(res => {
        return res.data
    })
    return {
        type: ASSIGN_MENU,
        payload: clients
    }
}

export function getAdminInfo() {
    let adminData = axios.get('/adminInfo').then(res => {
        return res.data
    })
    return {
        type: GET_ADMIN_INFO,
        payload: adminData
    }
}

export function approveCoach() {
    let adminData = axios.put('/coach/approve').then(res => {
        return res.data
    })
    return {
        type: APPROVE_COACH_ACCESS,
        payload: adminData
    }
}

export function denyCoach() {
    let requests = axios.put('/coach/deny').then(res => {
        return res.data
    })
    return {
        type: DENY_COACH_ACCESS,
        payload: requests
    }
}


////////////////BEGIN REDUCER//////////////////////////////
export default function(state = initialState, action) {
    switch(action.type){
        case GET_CLIENT_BY_ID + '_FULFILLED':
            return { ...state,
                    client: {
                        current_macros: {
                            pro: action.payload.client.curr_pro,
                            carb: action.payload.client.curr_carb,
                            fat: action.payload.client.curr_fat
                        },
                        current_stats: {
                            waist: action.payload.mes.waist,
                            neck: action.payload.mes.neck,
                            chest: action.payload.mes.chest,
                            height: action.payload.mes.height,
                            weight: action.payload.mes.weight,
                            bf: action.payload.mes.bf,
                            date_taken: action.payload.mes.date_taken
                        },
                        last_login: action.payload.last_login
                    }}
        case GET_CLIENTS + '_FULFILLED': 
                return { ...state, clients: action.payload }
        case SEARCH_FOR_CLIENT + '_FULFILLED': 
                const { message } = action.payload
                if(message){
                    return { ...state, warningMsg: message }
                } else{
                    return { ...state, potentialClient: action.payload }
                }
        case ASSIGN_MENU + '_FULFILLED': 
                const { message } = action.payload
                if(message){
                    return { ...state, warningMsg: message }
                } else{
                    return { ...state, clientMenus: action.payload }
                }
        case ASSIGN_WORKOUT + '_FULFILLED': 
                const { message } = action.payload
                if(message){
                    return { ...state, warningMsg: message }
                } else{
                    return { ...state, clientWorkouts: action.payload }
                }
        case GET_ADMIN_INFO + '_FULFILLED':
            const { message, coachReqs, activeCoaches } = action.payload
            if(message){
                return { ...state, warningMsg: message }
            } else{
                return { ...state, coachReqs, activeCoaches }
            }
        case APPROVE_COACH_ACCESS + '_FULFILLED':
            const { message, coachReqs, activeCoaches } = action.payload
            if(message){
                return { ...state, warningMsg: message }
            } else{
                return { ...state, coachReqs, activeCoaches }
            }
        case DENY_COACH_ACCESS + '_FULFILLED':
            const { message } = action.payload
            if(message){
                return { ...state, warningMsg: message }
            } else{
                return { ...state, coachReqs: action.payload }
            }
        default:
            return state
    }
}