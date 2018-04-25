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



function calculate( height, age, weight, bodyfat, activity, tenacity, goal, user_id ){
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
    return {bf, bmr, tdee, intake, protein, carbs, fat}
    
    
    console.log(`bmr: ${bmr}, tdee: ${tdee}, intake: ${intake}, bf: ${bf}, ht: ${ht}, wt: ${wt}`)
}
let test = calculate(75, 24, 250, 25, 'low', 'slow', 'lose', 9 )
test