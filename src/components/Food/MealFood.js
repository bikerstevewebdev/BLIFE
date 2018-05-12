import React, { Component } from 'react'
import { getFoodById, updateFoodQuantity, removeFromMeal } from '../../ducks/foodReducer'
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

class MealFood extends Component{
    constructor(props) {
        super(props)
        this.state = {
            needsEdit: false,
            quantityIn: props.quantity
        }
        this.deleteFood = this.deleteFood.bind(this)
        this.sendUpdate = this.sendUpdate.bind(this)
        this.changeAmount = this.changeAmount.bind(this)
    }

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
            <Card style={{maxWidth: "350px", width: "100%"}} >
                {
                    img.length > 0
                    ?
                    <CardMedia  >
                        <img src={img} alt={name} />
                    </CardMedia>
                    :
                    null
                }
                <CardText>
                    <p>Name: {name}</p>
                    <p>Protein: {pro}</p>
                    <p>Carbs: {carb}</p>
                    <p>Fat: {fat}</p>
                    <p>Fiber: {fiber}</p>
                </CardText>
                <CardActions>
                    <RaisedButton secondary={true} onClick={() => this.props.prepareToEdit(food_id)} label="Edit Food" />
                    <RaisedButton secondary={true} onClick={this.deleteFood} label="Remove From Meal" />
                    <input type="number" min="1" max="100" value={this.state.quantityIn} onChange={this.changeAmount} className="food-quantity" />
                    <RaisedButton secondary={true} onClick={this.sendUpdate} label="Update the quantity" />
                </CardActions>
            </Card>
        )
    }
}
export default connect(null, { getFoodById, removeFromMeal, updateFoodQuantity })(MealFood)