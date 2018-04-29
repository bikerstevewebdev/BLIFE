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
        last_login: ''
    },
    clients: [],
    coaches: [],
    coachRequests: []
    
}
/////////////////END initial state declaration////////////////////


/////////////////START String Literals//////////////////////
const GET_CLIENT = 'GET_CLIENT'
const GET_CLIENTS = 'GET_CLIENTS'
/////////////////END String Literals//////////////////////

/////////////////Exporting action creators//////////////////////
export function getClientData() {
    let data = axios.get('/clientInfo').then(res => {
        return res.data
    })
    return {
        type: GET_CLIENT,
        payload: data
    }
}

export function getClients(coach_id) {
    let clients = axios.get(`/clients/${coach_id}`).then(res => {
        return res.data
    })
    return {
        type: GET_CLIENTS,
        payload: clients
    }
}


////////////////BEGIN REDUCER//////////////////////////////
export default function(state = initialState, action) {
    switch(action.type){
        case GET_CLIENT + '_FULFILLED':
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
        default:
            return state
    }
}