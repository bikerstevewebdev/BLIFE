import React, { Component } from 'react'
import { getFoodById, updateFoodQuantity, removeFromMeal } from '../../ducks/foodReducer'
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class MealFood extends Component{
    constructor(props) {
        super(props)
        this.state = {
            needsEdit: false,
            quantityIn: props.quantity
        }
        // this.editFood = this.editFood.bind(this)
        this.deleteFood = this.deleteFood.bind(this)
        this.sendUpdate = this.sendUpdate.bind(this)
        this.changeAmount = this.changeAmount.bind(this)
    }

    // editFood() {
    //     this.props.getFoodById(food_id)
    //     this.setState({
    //         needsEdit: true
    //     })
    // }

    deleteFood() {
        const { food_id, meal_id, pro, carb, fat, fiber, quantity, meal_food_id } = this.props
        this.props.removeFromMeal(meal_id, food_id, pro, carb, fat, fiber, quantity, meal_food_id)
    }


    sendUpdate() {
        const { food_id, meal_id, pro, carb, fat, fiber, quantity } = this.props        
        const { quantityIn } = this.state
        this.props.updateFoodQuantity(meal_id, food_id, quantityIn, (quantityIn-quantity), pro, carb, fat, fiber)
    }
    
    changeAmount(e) {
        this.setState({
            quantityIn: e.target.value
        })
    }
    
    render() {
        const { food_id, name, pro, carb, fat, fiber, img } = this.props
        return(
            <section>
                <p>Name: {name}</p>
                <p>Protein: {pro}</p>
                <p>Carbs: {carb}</p>
                <p>Fat: {fat}</p>
                <p>Fiber: {fiber}</p>
                <img src={img} alt={name} />
                <Link to={{
                    pathname: `/food/meal`,
                    state: { food_id, name, pro, carb, fat, fiber, img }
                }}><button onClick={() => this.props.getFoodById(food_id)}>Edit Food</button></Link>
                <button onClick={this.deleteFood}>Remove From Meal</button>
                <input type="number" min="1" max="100" value={this.state.quantityIn} onChange={this.changeAmount} className="food-quantity" />
                <button onClick={this.sendUpdate}>Update the quantity</button>
                {/* {
                    this.state.needsEdit
                    ?
                    <Redirect to={`/food/meal`} />
                    :
                    null
                } */}
            </section>
        )
    }
}
export default connect(null, { getFoodById, removeFromMeal, updateFoodQuantity })(MealFood)