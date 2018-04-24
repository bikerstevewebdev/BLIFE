const axios = require('axios')

const initialState = {
    height: '',
    age: '',
    weight: '',
    bodyfat: '',
    goal: '',
    tenacity: '',
    tenacity: '',
    tenacity: '',
    macros: {
        protein: 0,
        carbs: 0,
        fat: 0
    },
    user: {
        username: '',
        user_id,
        profile_pic: '',
        current_protein: 0,
        current_carb: 0,
        current_fat: 0,
        current_weight: 0,
        current_height: 0,
        current_bf: 0
    }
}

const activityLevel = (level) => {
    switch(level) {
        case "low":
            return 1.2
        case "moderate":
            return 1.375
        case "active":
            return 1.55
        case "hi-active":
            return 1.725
        case "extreme":
            return 1.9
        default:
            return 0
    }
}
const tenacityLevel = (level) => {
    switch(level) {
        case "slow":
            return 250
        case "steady":
            return 450
        case "intense":
            return 650
        default:
            return 0
    }
}


const UPDATE_HEIGHT = 'UPDATE_HEIGHT'
const UPDATE_WEIGHT = 'UPDATE_WEIGHT'
const UPDATE_AGE = 'UPDATE_AGE'
const UPDATE_BODYFAT = 'UPDATE_BODYFAT'
const UPDATE_GOAL = 'UPDATE_GOAL'
const UPDATE_TENACITY = 'UPDATE_TENACITY'
const UPDATE_GENDER = 'UPDATE_GENDER'
const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY'
const CALCULATE = 'CALCULATE'

export function updateHeight(val) {
    return {
        type: UPDATE_HEIGHT,
        payload: val
    }
}

export function updateWeight(val) {
    return {
        type: UPDATE_WEIGHT,
        payload: val
    }
}

export function updateAge(val) {
    return {
        type: UPDATE_AGE,
        payload: val
    }
}

export function updateBodyfat(val) {
    return {
        type: UPDATE_BODYFAT,
        payload: val
    }
}

export function updateGoal(val) {
    return {
        type: UPDATE_GOAL,
        payload: val
    }
}

export function updateTenacity(val) {
    return {
        type: UPDATE_TENACITY,
        payload: val
    }
}

export function updateGender(val) {
    return {
        type: UPDATE_GENDER,
        payload: val
    }
}

export function updateActivity(val) {
    return {
        type: UPDATE_ACTIVITY,
        payload: val
    }
}

export function calculate( height, age, weight, bodyfat, activity, tenacity, goal, user_id ){
    let protein, carbs, fat, bf = bodyfat/100, tdee, bmr, wt = weight/2.2, ht = height/1, lbm = weight*(1-bf)
    let factor = activityLevel(activity)
    let pace = tenacityLevel(tenacity)
    if(bf > 0) {
        bmr = (370 + ~~( 21.6 * ( (1-bf) * wt ) ))
    } else{
        if(gender === 'm'){
            bmr = 10 * (wt/2.2) + 6.25 * ht - 5 * age + 5
        } else if(gender === 'f'){
            bmr = 10 * (wt/2.2) + 6.25 * ht - 5 * age - 161
        }
    }
    tdee = bmr * factor
    if(goal === "lose"){
        intake = tdee - pace
    } else if(goal === "gain"){
        intake = tdee + pace
    } else{
        intake = tdee
    }
    protein = lbm
    fat     = ~~((intake * 0.30)/9)
    carbs   = ~~( (intake - (intake * 0.30) - (lbm * 4) ) /4)
    
    
    console.log(`bmr: ${bmr}, tdee: ${tdee}, intake: ${intake}, bf: ${bf}, ht: ${ht}, wt: ${wt}`)
    
    axios.post(`/macroCalc/${user_id}`, { protein, fat, carbs }).then(res => {
        console.log(res.data)
    })
    
    return{
        type: CALCULATE,
        payload:  {
            protein,
            carbs,
            fat,
            bf: bf/1,
            weight: weight/1,
            height: height/1
        }
    }
}


/*
BMR Calculations
Katch McArdle bmr calculator(where LBM is the lean body mass in kg):
370 + (21.6 * LBM)

----------------Activity Level Multiplication Factor:--------------
1.2 = sedentary (little or no exercise)

1.375 = light activity (light exercise/sports 1 to 3 days per week)

1.55 = moderate activity (moderate exercise/sports 3 to 5 days per week)

1.725 = very active (hard exercise/sports 6 to 7 days per week)

1.9 = extra active (very hard exercise/sports 6 to 7 days per week and physical job)




Mifflin St Jeor if no Bodyfat:

Men
10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) + 5

Women
10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) – 161.

*/




export default function(state = initialState, action) {
    switch(action.type){
        case UPDATE_WEIGHT:
            return { ...state, weight: action.payload }
        case UPDATE_HEIGHT:
            return { ...state, height: action.payload }
        case UPDATE_AGE:
            return { ...state, age: action.payload }
        case UPDATE_GOAL:
            return { ...state, goal: action.payload }
        case UPDATE_ACTIVITY:
            return { ...state, activity: action.payload }
        case UPDATE_GENDER:
            return { ...state, gender: action.payload }
        case UPDATE_TENACITY:
            return { ...state, tenacity: action.payload }
        case UPDATE_BODYFAT:
            return { ...state, bodyfat: action.payload }
        case CALCULATE:
            return { ...state, user: { ...state.user, current_bf: action.payload.bf} }
        default:
            return state
    }
}