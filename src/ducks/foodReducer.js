import axios from 'axios'
////////////////BEGIN initialState declaration/////////
const initialState = {
    name: '',
    p: 0,
    c: 0,
    f: 0,
    fib: 0,
    img: '',
    food_id: 0,
    foods: [],
    meal: {},
    mealFoods: [],
    mealSearchResults: [],
    errorMessage: '',
    menu: {},
    menuMeals: [],
    menuSearchResults: [],
    externalFoods: []
}
////////////////END initialState declaration/////////

////////////////BEGIN STRING LITERAL declaration/////////
const UPDATE_NAMEIN = 'UPDATE_NAMEIN'
const UPDATE_PIN = 'UPDATE_PIN'
const UPDATE_CIN = 'UPDATE_CIN'
const UPDATE_FIN = 'UPDATE_FIN'
const UPDATE_FIBIN = 'UPDATE_FIBIN'
const UPDATE_IMGIN = 'UPDATE_IMGIN'
const ADD_FOOD = 'ADD_FOOD'
const GET_FOOD = 'GET_FOOD'
const SEARCH_FOODS = 'SEARCH_FOODS'
const ADD_FOOD_TO_MEAL = 'ADD_FOOD_TO_MEAL'
const CREATE_MEAL = 'CREATE_MEAL'
const SEARCH_MEALS = 'SEARCH_MEALS'
const GET_MEAL = 'GET_MEAL'
const EDIT_FOOD = 'EDIT_FOOD'
const UPDATE_FOOD_QUANTITY = 'UPDATE_FOOD_QUANTITY'
const REMOVE_FOOD = 'REMOVE_FOOD'
const CREATE_MENU = 'CREATE_MENU'
const REMOVE_MEAL = 'REMOVE_MEAL'
const GET_MENU = 'GET_MENU'
const ADD_MEAL_TO_MENU = 'ADD_MEAL_TO_MENU'
const EDIT_MENU = 'EDIT_MENU'
const SEARCH_MENUS = 'SEARCH_MENUS'
const CLEAR_MEAL_SEARCH = 'CLEAR_MEAL_SEARCH'
const END_NUTRITION_SEARCH = 'END_NUTRITION_SEARCH'
////////////////END STRING LITERAL declaration/////////

////////////////BEGIN ACTION CREATOR declaration/////////

export function updateNameIn(val) {
    return {
        type: UPDATE_NAMEIN,
        payload: val
    }
}
export function updateCIn(val) {
    return {
        type: UPDATE_CIN,
        payload: val
    }
}

export function updatePIn(val) {
    return {
        type: UPDATE_PIN,
        payload: val
    }
}

export function updateFIn(val) {
    return {
        type: UPDATE_FIN,
        payload: val
    }
}

export function updateFibIn(val) {
    return {
        type: UPDATE_FIBIN,
        payload: val
    }
}

export function updateImgIn(val) {
    return {
        type: UPDATE_IMGIN,
        payload: val
    }
}
export function addFoodToDB(name, p, c, f, fib, img) {
    let data = axios.post('/food', { name, p, c, f, fib, img }).then(res => {
        return res.data
    })
    return {
        type: ADD_FOOD,
        payload: data
    }
}

export function getMealById(id){
    let mealWithFoods = axios.get(`/meal/search/${id}`).then(res => {
        if(res.data.foods.length > 0){
            return res.data
        } else if(res.data.foods.length === 0) {
            return res.data.meal
        }
    })
    return {
        type: GET_MEAL,
        payload: mealWithFoods
    }
}
export function getMenuById(id){
    let menuWithMeals = axios.get(`/menu/search/${id}`).then(res => {
        if(res.data.meals.length > 0){
            return res.data
        } else if(res.data.meals.length === 0) {
            return res.data.menu
        }
    })
    return {
        type: GET_MENU,
        payload: menuWithMeals
    }
}
export function getFoodById(id){
    let food = axios.get(`/food/search/${id}`).then(res => {
        return res.data
    })
    return {
        type: GET_FOOD,
        payload: food
    }
}

export function removeFromMeal(meal_id, food_id, p, c, f, fib, quantity, meal_food_id){
    let mealWithFoods = axios.put(`/meal/removeFood`, { meal_id, food_id, p, c, f, fib, quantity, meal_food_id }).then(res => {
        return res.data
    })
    return {
        type: REMOVE_FOOD,
        payload: mealWithFoods
    }
}
export function removeMealFromMenu(menu_meals_id, menu_id, p, c, f, fib){
    let menuWithMeals = axios.put(`/menu/removeMeal`, { menu_meals_id, menu_id, p, c, f, fib }).then(res => {
        return res.data
    })
    return {
        type: REMOVE_MEAL,
        payload: menuWithMeals
    }
}

export function searchFoods(name){
    let foods = axios.get(`/food/search?name=${name}`).then(res => {
        return res.data
    })
    return {
        type: SEARCH_FOODS,
        payload: foods
    }
}

export function searchExternalFoods(name){
    let foods = axios.get(`/food/external/search?foodName=${name}`).then(res => {
        return res.data
    })
    return {
        type: SEARCH_EXTERNAL_FOODS,
        payload: foods
    }
}

export function searchMenus(title){
    let menus = axios.get(`/menu/search?title=${title}`).then(res => {
        return res.data
    })
    return {
        type: SEARCH_MENUS,
        payload: menus
    }
}
export function searchMeals(title){
    let meals = axios.get(`/meal/search?title=${title}`).then(res => {
        return res.data
    })
    return {
        type: SEARCH_MEALS,
        payload: meals
    }
}

export function updateFoodQuantity(meal_id, food_id, quantity, dif, p, c, f, fib){
    let meals = axios.put('/meal/foods/quantity', { meal_id, food_id, quantity, dif, p, c, f, fib  }).then(res => {
        return res.data
    })
    return {
        type: UPDATE_FOOD_QUANTITY,
        payload: meals
    }
}

export function editFood(food_id, p, c, f, fib, img){
    let food = axios.put('/food/edit', { food_id, p, c, f, fib, img }).then(res => {
        return res.data
    })
    return {
        type: EDIT_FOOD,
        payload: food
    }
}
export function editMenu(menu_id, title, img){
    let menu = axios.put('/food/edit', { menu_id, title, img }).then(res => {
        return res.data
    })
    return {
        type: EDIT_MENU,
        payload: menu
    }
}

export function addFoodToMeal(meal_id, food_id, pro, carb, fat, fiber, total_p, total_c, total_f, total_fib, quantity){
    let mealData = axios.post(`/meal/food`, {meal_id, food_id, pro, carb, fat, fiber, total_p, total_c, total_f, total_fib, quantity}).then(res => {
        return res.data
    })
    return {
        type: ADD_FOOD_TO_MEAL,
        payload: mealData
    }
}
export function addMealToMenu(menu_id, meal_id, p, c, f, fib){
    let menuData = axios.post(`/menu/meal`, {menu_id, meal_id, p, c, f, fib}).then(res => {
        return res.data
    })
    return {
        type: ADD_MEAL_TO_MENU,
        payload: menuData
    }
}

export function createMeal(title, img){
    let mealData = axios.post(`/meal`, {title, img}).then(res => {
        return res.data
    })
    return {
        type: CREATE_MEAL,
        payload: mealData,
        meta: {
            title,
            img
        }
    }
}
export function createMenu(title, img){
    let menu = axios.post(`/menu`, {title, img}).then(res => {
        return res.data
    })
    return {
        type: CREATE_MENU,
        payload: menu
    }
}

export function endNutritionSearch() {
    return {
        type: END_NUTRITION_SEARCH,
        payload: 'ended'
    }
}


export function clearMealSearch() {
    return {
        type: CLEAR_MEAL_SEARCH,
        payload: 'nothing fancy'
    }
}
////////////////END ACTION CREATOR declaration/////////


/////////////////BEGIN reducer declaration//////////////
export default function(state = initialState, action) {
    switch(action.type){
        case CLEAR_MEAL_SEARCH:
            return { ...state, mealSearchResults: []}
        case UPDATE_NAMEIN:
            return { ...state, name: action.payload}
        case UPDATE_CIN:
            return { ...state, c: action.payload}
        case UPDATE_PIN:
            return { ...state, p: action.payload}
        case UPDATE_FIN:
            return { ...state, f: action.payload}
        case UPDATE_FIBIN:
            return { ...state, fib: action.payload}
        case UPDATE_IMGIN:
            return { ...state, img: action.payload}
        case END_NUTRITION_SEARCH:
            return {...state, menuSearchResults: [], mealSearchResults: []}
        case CREATE_MEAL + '_PENDING':
            return {
                    ...state,
                    meal: {
                        title: action.meta.title,
                        img_url: action.meta.img,
                        total_p: 0,
                        total_c: 0,
                        total_f: 0,
                        total_fib: 0,
                        meal_id: 0
                    }
                }
        case CREATE_MEAL + '_FULFILLED':
            return {
                ...state,
                meal: action.payload
            }
        case CREATE_MENU + '_FULFILLED':
            return {
                ...state,
                menu: action.payload
            }
        case ADD_FOOD + '_FULFILLED':
            return initialState
        case REMOVE_FOOD + '_FULFILLED':
            return {
                    ...state,
                    meal: action.payload.newMeal,
                    mealFoods: action.payload.foods
                }
        case REMOVE_MEAL + '_FULFILLED':
            return {
                    ...state,
                    menu: action.payload.newMenu,
                    menuMeals: action.payload.meals
                }
        case ADD_FOOD_TO_MEAL + '_FULFILLED':
            return { ...state, meal: action.payload.newMeal, mealFoods: action.payload.foods }
        case ADD_MEAL_TO_MENU + '_FULFILLED':
            return { ...state, menu: action.payload.newMenu, menuMeals: action.payload.meals }
        case SEARCH_FOODS + '_FULFILLED':
            return { ...state, foods: action.payload}
        case SEARCH_EXTERNAL_FOODS + '_FULFILLED':
            return { ...state, externalFoods: action.payload}
        case SEARCH_MEALS + '_FULFILLED':
            return { ...state, mealSearchResults: action.payload}
        case SEARCH_MENUS + '_FULFILLED':
            return { ...state, menuSearchResults: action.payload}
        case GET_FOOD + '_FULFILLED':
            return { ...state,
                    name: action.payload.name,
                    p: action.payload.pro,
                    c: action.payload.carb,
                    f: action.payload.fat,
                    fib: action.payload.fiber,
                    img: action.payload.img,
                    food_id: action.payload.food_id
                    }
        case GET_MEAL + '_FULFILLED':
            if(action.payload.foods){
                return { ...state, mealFoods: action.payload.foods, meal: action.payload.meal}
            }else {
                return { ...state, meal: action.payload}
            }
        case GET_MENU + '_FULFILLED':
            if(action.payload.meals){
                return { ...state, menuMeals: action.payload.meals, menu: action.payload.menu}
            }else {
                return { ...state, menu: action.payload}
            }
        case UPDATE_FOOD_QUANTITY + '_FULFILLED':
                return { ...state, mealFoods: action.payload.foods, meal: action.payload.newMeal}
        case EDIT_FOOD + '_FULFILLED':
                if(action.payload.foods) {
                    return {
                            ...state, 
                            name: action.payload.name,
                            p: action.payload.pro,
                            c: action.payload.carb,
                            f: action.payload.fat,
                            fib: action.payload.fiber,
                            img: action.payload.img 
                        }
                } else{
                    return { ...state, errorMessage: action.payload.message}
                }
        case EDIT_MENU + '_FULFILLED':
                if(action.payload.menu) {
                    return { ...state, menu: action.payload }
                } else{
                    return { ...state, errorMessage: action.payload.message}
                }
        default:
            return state
    }
}