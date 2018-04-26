const axios = require('axios')
//////////////BEGIN initialState declaration/////////////
const initialState = {
    height: '',
    age: '',
    weight: '',
    bodyfat: '',
    goal: '',
    gender: '',
    activity: '',
    tenacity: '',
    macros: {
        protein: 0,
        carbs: 0,
        fat: 0
    },
    isUpdating: false
}
//////////////END initialState declaration/////////////

///////////////BEGIN extra logic functions/////////////
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
            return 300
        case "steady":
            return 450
        case "intense":
            return 650
        default:
            return 0
    }
}
///////////////END extra logic functions/////////////

/////////////////////BEGIN String Literal Declaration///////////
const UPDATE_HEIGHT = 'UPDATE_HEIGHT'
const UPDATE_WEIGHT = 'UPDATE_WEIGHT'
const UPDATE_AGE = 'UPDATE_AGE'
const UPDATE_BODYFAT = 'UPDATE_BODYFAT'
const UPDATE_GOAL = 'UPDATE_GOAL'
const UPDATE_TENACITY = 'UPDATE_TENACITY'
const UPDATE_GENDER = 'UPDATE_GENDER'
const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY'
const CALCULATE = 'CALCULATE'
const CHANGE_UPDATING = 'CHANGE_UPDATING'
const CLEAR_MACRO_ENTRY = 'CLEAR_MACRO_ENTRY'
/////////////////////END String Literal Declaration///////////

////////////BEGIN Action Creator function declarations////////
export function clearMacroEntry() {
    return {
        type: CLEAR_MACRO_ENTRY,
        payload: 'something'
    }
}

export function changeUpdating() {
    return {
        type: CHANGE_UPDATING,
        payload: 'something'
    }
}

export function updateHeight(val) {
    return {
        type: UPDATE_HEIGHT,
        payload: val/1
    }
}

export function updateWeight(val) {
    return {
        type: UPDATE_WEIGHT,
        payload: val/1
    }
}

export function updateAge(val) {
    return {
        type: UPDATE_AGE,
        payload: val/1
    }
}

export function updateBodyfat(val) {
    return {
        type: UPDATE_BODYFAT,
        payload: val/1
    }
}

export function updateGoal(val) {
    console.log(val)
    return {
        type: UPDATE_GOAL,
        payload: val
    }
}

export function updateTenacity(val) {
    console.log(val)
    return {
        type: UPDATE_TENACITY,
        payload: val
    }
}

export function updateGender(val) {
    console.log(val)
    return {
        type: UPDATE_GENDER,
        payload: val
    }
}

export function updateActivity(val) {
    console.log(val)
    return {
        type: UPDATE_ACTIVITY,
        payload: val
    }
}

export function calculate( height, age, weight, bodyfat, activity, gender, tenacity, goal ){
    console.log(height, age, gender, weight, bodyfat, activity, tenacity, goal)
    let protein, carbs, fat, tdee, bmr, intake,
    bf  = bodyfat/100,
    wt  = weight/2.2,
    lbm = weight*(1-bf),
    ht  = height/1
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
    
    
    console.log(`lbm: ${lbm}, bmr: ${bmr}, tdee: ${tdee}, intake: ${intake}, bf: ${bf}, ht: ${ht}, wt: ${wt}`)
    
    let data = axios.post(`/macroCalc`, { protein, fat, carbs }).then(res => {
        console.log('MACRO DATA:', res.data)
        return res.data
    })
    
    return{
        type: CALCULATE,
        payload: data,
        meta:  {
            bf: ((bf/1)*100),
            weight: weight/1,
            height: height/1
        }
    }
}
////////////END Action Creator function declarations////////


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



/////////////////////BEGIN REDUCER//////////////////////
export default function(state = initialState, action) {
    console.log(action)
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
        case CALCULATE + '_FULFILLED':
        return {
            ...state,
            macros: {
                protein: action.payload.p,
                carbs: action.payload.c,
                fat: action.payload.f,
            },
            isUpdating: true
        }
        case CHANGE_UPDATING:
            return {
                ...state,
                isUpdating: false
            }
        case CLEAR_MACRO_ENTRY:
            return initialState
        default:
        return state
    }
}
/////////////////////END REDUCER//////////////////////