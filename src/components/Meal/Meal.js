import React, { Component } from 'react'
import Food from '../Food/Food'
import { connect } from 'react-redux'
import { searchFoods, updateSearchIn, addFoodToMeal, getMealById } from '../../ducks/foodReducer'

class Meal extends Component{
    componentDidMount() {
        const { id } = this.props.match.params
        if(id > 0){
            this.props.getMealById(id)
        } 
    }
    render() {
        const { searchIn, foods, meal, mealFoods } = this.props
        const { total_p, total_c, total_f, total_fib, meal_id, title, img_url } = meal
        const foodResults = foods.map(food => {
            const { food_id, pro, carb, fat, fiber, name, img } = food
            return (
                <section key={food_id} className="food-result">
                    <img src={img} alt={name} />
                    <p>Food Name: {name}</p>
                    <p>Protein: {pro}</p>
                    <p>Carb: {carb}</p>
                    <p>Fat: {fat}</p>
                    <p>Fiber: {fiber}</p>
                    <button onClick={this.props.addFoodToMeal(meal_id, food_id, pro, carb, fat, fiber, total_p, total_c, total_f, total_fib)}>Add to meal</button>
                </section>
            )
        })
        const mealFoodList = mealFoods.map(food => {
            const { food_id, name, pro, carb, fat, fiber, img } = food
            return (
                <section key={food_id} className="food-result">
                    <img src={img} alt={name} />
                    <p>Food Name: {name}</p>
                    <p>Protein: {pro}</p>
                    <p>Carb: {carb}</p>
                    <p>Fat: {fat}</p>
                    <p>Fiber: {fiber}</p>
                </section>
            )
        })
        return(
            <section className="meal">
                <h2>{title}</h2>
                {img_url ? <img src={img_url} alt={title} /> : null}
                <h3>Total Macros for {title}:</h3>
                <p>Protein: {total_p}</p>
                <p>Carbs: {total_c}</p>
                <p>Fat: {total_f}</p>
                <p>Fiber: {total_fib}</p>
                <h3>Foods in this meal:</h3>
                {mealFoodList}
                <input value={searchIn} placeholder="Search Foods by Name" onChange={e => this.props.updateSearchIn(e.target.value)}/>
                <button onClick={() => this.props.searchFoods(searchIn)}>Search for your food!</button>
                <Food />
                {foodResults}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchIn: state.foods.searchIn,
        foods: state.foods.foods,
        meal: state.foods.meal,
        mealFoods: state.foods.mealFoods
    }
}

export default connect(mapStateToProps, { searchFoods, updateSearchIn, addFoodToMeal, getMealById })(Meal)
