const initialState = {
    user: {
        username: '',
        profile_pic: '',
        current_protein: 0,
        current_carb: 0,
        current_fat: 0,
        current_weight: 0,
        current_height: 0,
        current_bf: 0
    }
}

export default function(state = initialState, action) {
    switch(action){
        default:
            return state
    }
}