import React, { Component } from 'react'
import MealFood from '../Food/MealFood'
import { connect } from 'react-redux'
import { searchFoods, addFoodToMeal, getMealById, getFoodById, toggleFoodEditorModal } from '../../ducks/foodReducer'
import { Link } from 'react-router-dom'
import FoodEditor from '../Food/FoodEditor'

class Meal extends Component{
    constructor(){
        super()
        this.state = {
            searchIn:'',
            quantityIn: '',
            addingToMeal: 0
        }
        this.updateSearchIn = this.updateSearchIn.bind(this)
        this.updateQuantity = this.updateQuantity.bind(this)
        this.addFoodToMeal = this.addFoodToMeal.bind(this)
        this.prepareToAdd = this.prepareToAdd.bind(this)
        this.prepareToEdit = this.prepareToEdit.bind(this)
    }
    
    componentDidMount() {
        if(this.props.match.params){
            const { id } = this.props.match.params
            if(!isNaN(id) && id > 0){
                this.props.getMealById(id)
            } 
        }
    }

    addFoodToMeal(meal_id, food_id, p, c, f, fib, total_p, total_c, total_f, total_fib, quantity){
        this.props.addFoodToMeal(meal_id, food_id, p, c, f, fib, total_p, total_c, total_f, total_fib, quantity)
        this.setState({
            addingToMeal: 0,

        })
    }

    updateSearchIn(e) {
        this.setState({
            searchIn: e.target.value
        })
    }

    updateQuantity(e){
        this.setState({
            quantityIn: e.target.value
        })
    }

    prepareToAdd(id){
        this.setState({
            addingToMeal: id
        })
    }

    prepareToEdit(id){
        this.props.getFoodById(id)
        this.props.toggleFoodEditorModal(true)
    }
    
    render() {
        const { searchIn, quantityIn } = this.state
        const { foods, meal, mealFoods } = this.props
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
                    {this.state.addingToMeal !== food_id
                    ?
                        <button onClick={() => this.prepareToAdd(food_id)}>Add to {title}?</button>
                    :
                        <section className="add-food-to-meal">
                            <p>How many?</p>
                            <input value={quantityIn} onChange={this.updateQuantity} />
                            <button onClick={() => this.addFoodToMeal(meal_id, food_id, pro, carb, fat, fiber, total_p, total_c, total_f, total_fib,quantityIn/1)}>Add to meal</button>
                        </section>
                    }
                </section>
            )
        })
        const mealFoodList = mealFoods.map(food => {
            const { food_id, name, pro, carb, fat, fiber, img, quantity, meal_food_id } = food
            return <MealFood location={this.props.location} prepareToEdit={this.prepareToEdit} key={meal_food_id} food_id={food_id} meal_food_id={meal_food_id} name={name} pro={pro} carb={carb} fat={fat} meal_id={meal_id} fiber={fiber} img={img} quantity={quantity} />            
        })
        return(
            <section className="comp meal">
                <h2>{title}</h2>
                {img_url ? <img src={img_url} alt={title} /> : null}
                <h3>Total Macros for {title}:</h3>
                <p>Protein: {total_p}</p>
                <p>Carbs: {total_c}</p>
                <p>Fat: {total_f}</p>
                <p>Fiber: {total_fib}</p>
                <h3>Foods in this meal:</h3>
                {mealFoodList}
                <input value={searchIn} placeholder="Search Foods by Name" onChange={this.updateSearchIn}/>
                <button onClick={() => this.props.searchFoods(searchIn)}>Search for your food!</button>
                {foodResults}
                {
                    this.props.match && this.props.match.params.id === 'menu'
                    ?
                    <Link to={{pathname: `/menu/${this.props.location.state.menu_id}`}}>
                        <button>Go Back to the menu?</button>
                    </Link>
                    :
                    null
                }
                <FoodEditor />
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        foods: state.foods.foods,
        meal: state.foods.meal,
        mealFoods: state.foods.mealFoods
    }
}

export default connect(mapStateToProps, { searchFoods, addFoodToMeal, getMealById, getFoodById, toggleFoodEditorModal })(Meal)
