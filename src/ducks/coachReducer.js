const axios = require('axios')

/////////////////START initial state declaration////////////////////
const initialState = {
    currentClient: {},
    clients: [],
    clientWorkouts: [],
    clientMenus: [],
    coaches: [],
    coachReqs: [],
    activeCoaches: [],
    warningMsg: '',
    coachChatModalOpen: false,
    coachReqModalOpen: false,
    coach_info: {},
    coach_req_info: {}
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
const CLEAR_COACH_MESSAGE = 'CLEAR_COACH_MESSAGE'
const REQUEST_A_COACH = 'REQUEST_A_COACH'
const ACCEPT_COACH_REQUEST = 'ACCEPT_COACH_REQUEST'
const TOGGLE_COACH_CHAT = 'TOGGLE_COACH_CHAT'
const TOGGLE_COACH_REQ_MODAL = 'TOGGLE_COACH_REQ_MODAL'
const GET_CC_INFO = 'GET_CC_INFO'
const GET_COACH_REQ_INFO = 'GET_COACH_REQ_INFO'
const REVOKE_COACH_ACCESS = 'REVOKE_COACH_ACCESS'
const REMOVE_MENU = 'REMOVE_MENU'
const REMOVE_WORKOUT = 'REMOVE_WORKOUT'
/////////////////END String Literals//////////////////////

/////////////////Exporting action creators/////////////////////

export function toggleCoachReqModal(bool){
    return{
        type: TOGGLE_COACH_REQ_MODAL,
        payload: bool
    }
}

export function toggleCoachChatModal(bool){
    return{
        type: TOGGLE_COACH_CHAT,
        payload: bool
    }
}

export function getCoachRequestInfo() {
    let info = axios.get(`/client/coach/requestInfo`).then(res => {
        return res.data
    })
    return {
        type: GET_COACH_REQ_INFO,
        payload: info
    }
}

export function getCCInfo() {
    let data = axios.get(`/ccInfo`).then(res => {
        return res.data
    })
    return {
        type: GET_CC_INFO,
        payload: data
    }
}

export function getClientData(client_coach_id, curr_mes_id) {
    let has_mes = curr_mes_id > 0
    console.log('coachreducer getclientdata client_coach_id: ', client_coach_id)
    let data = axios.post(`/clientInfo`, { client_coach_id, has_mes }).then(res => {
        return res.data
    })
    return {
        type: GET_CLIENT_BY_ID,
        payload: data
    }
}

// export function getClientWorkouts(client_coach_id) {
//     let data = axios.get(`/clientInfo/`, { client_coach_id }).then(res => {
//         return res.data
//     })
//     return {
//         type: GET_CLIENT_BY_ID,
//         payload: data
//     }
// }
// export function getClientMenus(client_coach_id) {
//     let data = axios.get(`/clientInfo/`, { client_coach_id }).then(res => {
//         return res.data
//     })
//     return {
//         type: GET_CLIENT_BY_ID,
//         payload: data
//     }
// }

export function getClients() {
    let clients = axios.get(`/coach/clients`).then(res => {
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

export function assignWorkoutToClient(client_coach_id, workout_id) {
    let clients = axios.post(`/client/workouts`, { client_coach_id, workout_id }).then(res => {
        return res.data
    })
    return {
        type: ASSIGN_WORKOUT,
        payload: clients
    }
}

export function removeClientWorkout(client_coach_id, user_workout_id) {
    let clientWorkouts = axios.post(`/client/workouts/remove`, { client_coach_id, user_workout_id }).then(res => {
        return res.data
    })
    return {
        type: REMOVE_WORKOUT,
        payload: clientWorkouts
    }
}

export function assignMenuToClient(client_coach_id, menu_id) {
    let clients = axios.post(`/client/menus`, { client_coach_id, menu_id }).then(res => {
        return res.data
    })
    return {
        type: ASSIGN_MENU,
        payload: clients
    }
}

export function removeClientMenu(client_coach_id, user_menu_id) {
    let clients = axios.post(`/client/menus/remove`, { client_coach_id, user_menu_id }).then(res => {
        return res.data
    })
    return {
        type: REMOVE_MENU,
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

export function acceptCoachRequest(id) {
    let msg = axios.put('/client/coach/approveRequest', { id }).then(res => {
        return res.data
    })
    return {
        type: ACCEPT_COACH_REQUEST,
        payload: msg
    }
}

export function approveCoach(req_id, user_id) {
    let adminData = axios.put('/admin/coach/approve', { req_id, user_id }).then(res => {
        return res.data
    })
    return {
        type: APPROVE_COACH_ACCESS,
        payload: adminData
    }
}

export function denyCoach(req_id, user_id) {
    let requests = axios.put('/admin/coach/deny', { req_id, user_id }).then(res => {
        return res.data
    })
    return {
        type: DENY_COACH_ACCESS,
        payload: requests
    }
}

export function revokeCoach(coach_id, coach_name) {
    let activeAndMsg = axios.put('/admin/coach/revoke', { coach_id, coach_name }).then(res => {
        return res.data
    })
    return {
        type: REVOKE_COACH_ACCESS,
        payload: activeAndMsg
    }
}

export function requestACoach() {
    let msg = axios.post('/client/coach/request').then(res => {
        return res.data
    })
    return {
        type: REQUEST_A_COACH,
        payload: msg
    }
}

export function clearCoachMessage() {
    return {
        type: CLEAR_COACH_MESSAGE,
        payload: ''
    }
}

////////////////BEGIN REDUCER//////////////////////////////
export default function(state = initialState, action) {
    switch(action.type){
        case GET_COACH_REQ_INFO + '_REJECTED':
            return { ...state, warningMsg: action.payload.response.data.message }
        case GET_COACH_REQ_INFO + '_FULFILLED':
            return { ...state, coach_req_info: action.payload }
        case ACCEPT_COACH_REQUEST + '_REJECTED':
            return { ...state, warningMsg: action.payload.response.data.message }
        case ACCEPT_COACH_REQUEST + '_FULFILLED':
            return { ...state, warningMsg: action.payload.message, coach_req_info: {} }
        case GET_CC_INFO + '_REJECTED':
            return { ...state, warningMsg: action.payload.response.data.message }
        case GET_CC_INFO + '_FULFILLED':
            return { ...state, coach_info: action.payload }
        case TOGGLE_COACH_REQ_MODAL:
            return { ...state, coachReqModalOpen: action.payload }
        case TOGGLE_COACH_CHAT:
            return { ...state, coachChatModalOpen: action.payload }
        case CLEAR_COACH_MESSAGE:
            return { ...state, warningMsg: action.payload }
        case GET_CLIENT_BY_ID + '_REJECTED':
            return { ...state, warningMsg: action.payload.response.data.message }
        case GET_CLIENT_BY_ID + '_FULFILLED':
            return { ...state, currentClient: action.payload.client, clientMenus: action.payload.menus, clientWorkouts: action.payload.workouts }
        case GET_CLIENTS + '_FULFILLED': 
                return { ...state, clients: action.payload }
        case SEARCH_FOR_CLIENT + '_FULFILLED': 
                    return { ...state, warningMsg: action.payload.message }
        case REQUEST_A_COACH + '_FULFILLED': 
                    return { ...state, warningMsg: action.payload.message }
        case REQUEST_A_COACH + '_REJECTED':
                    return { ...state, warningMsg: action.payload.response.data.message }
        case REMOVE_MENU + '_FULFILLED': 
                    return { ...state, clientMenus: action.payload }
        case REMOVE_MENU + '_REJECTED': 
                    return { ...state, warningMsg: action.payload.response.data.message }
        case ASSIGN_MENU + '_FULFILLED': 
                    return { ...state, clientMenus: action.payload }
        case ASSIGN_MENU + '_REJECTED': 
                    return { ...state, warningMsg: action.payload.response.data.message }
        case REMOVE_WORKOUT + '_REJECTED': 
                    return { ...state, warningMsg: action.payload.response.data.message }
        case REMOVE_WORKOUT + '_FULFILLED': 
                    return { ...state, clientWorkouts: action.payload }
        case ASSIGN_WORKOUT + '_REJECTED': 
                    return { ...state, warningMsg: action.payload.response.data.message }
        case ASSIGN_WORKOUT + '_FULFILLED': 
                    return { ...state, clientWorkouts: action.payload }
        case GET_ADMIN_INFO + '_FULFILLED':
                if(action.payload.message){
                    return { ...state, warningMsg: action.payload.message }
                } else{
                    return { ...state, coachReqs: action.payload.coachReqs, activeCoaches: action.payload.activeCoaches }
                }
        case APPROVE_COACH_ACCESS + '_FULFILLED':
                if(action.payload.message){
                    return { ...state, warningMsg: action.payload.message }
                } else{
                    return { ...state, coachReqs: action.payload.coachReqs, activeCoaches: action.payload.activeCoaches }
                }
        case DENY_COACH_ACCESS + '_FULFILLED':
                if(action.payload.message){
                    return { ...state, warningMsg: action.payload.message }
                } else{
                    return { ...state, coachReqs: action.payload }
                }
        case REVOKE_COACH_ACCESS + '_FULFILLED':
                    return { ...state, warningMsg: action.payload.message, activeCoaches: action.payload.activeCoaches }
        default:
            return state
    }
}