import React, { Component } from 'react'
import { getFoodById, updateFoodQuantity } from '../../ducks/foodReducer'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

class FoodMeal extends Component{
    constructor() {
        super()
        this.state = {
            needsEdit: false
        }
        this.editFood = this.editFood.bind(this)
    }

    editFood() {
        this.props.getFoodById(food_id)
        this.setState({
            needsEdit: true
        })
    }

    deleteFood() {
        this.props.removeFromMeal(this.props.food_id)
        this.setState({

        })
    }


    sendUpdate() {
        const { quantityIn } = this.state
        this.props.updateFoodQuantity(meal_id, food_id, newQuantity, (newQuantity-foodQuantity), pro, carb, fat, fiber)
    }
    
    changeAmount(e) {
        this.setState({
            quantityIn: e.target.value
        })
    }
    
    render() {
        const { food_id, name, pro, carb, fat, fiber, img, foodQuantity } = this.props
        const initialQuantity = foodQuantity
        return(
            <section>
                <p>Name: {name}</p>
                <p>Protein: {pro}</p>
                <p>Carbs: {carb}</p>
                <p>Fat: {fat}</p>
                <p>Fiber: {fiber}</p>
                <img src={img} alt={name} />
                <button onClick={() => this.editFood(name, p, c, f, fib, img)}>Edit Food</button>
                <button onClick={this.deleteFood}>Remove From Meal</button>
                <input type="number" min="1" max="100" placeholder={initialQuantity} onChange={this.changeAmount} className="food-quantity" />
                <button onClick={this.sendUpdate}>Update the quantity</button>
                {
                    this.state.needsEdit
                    ?
                    <Redirect to={`/food/meal`} />
                    :
                    null
                }
            </section>
        )
    }
}
export default connect(null, { getFoodById, updateFoodQuantity })(Food)