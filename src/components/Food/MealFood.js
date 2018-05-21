import React, { Component } from 'react'
import { getFoodById, updateFoodQuantity, removeFromMeal } from '../../ducks/foodReducer'
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { TextField } from 'material-ui';

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
            <Card style={{maxWidth: "225px", width: "100%", height: "20em", borderRadius: "5px"}} >
                {
                    img.length > 0
                    ?
                    <CardMedia style={{height: "9.5em"}} >
                        <img src={img} style={{maxHeight: "9.5em", borderRadius: "5px 5px 0 0"}} alt={name} />
                    </CardMedia>
                    :
                    null
                }
                <CardTitle style={{padding: "0.5em 0.5em"}} titleStyle={{color: "rgba(255, 255, 255, 0.87)", fontSize: "1.08em", lineHeight: "1.e5em", textTransform: "capitalize"}} title={name} />
                <CardText style={{display: "flex", padding: "0.5em 1em", color: "ivory"}}>
                    <p>Protein: <span style={{color: "rgba(255, 255, 255, 0.87)", }}>{pro}g</span></p>
                    <p>Carbs: <span style={{color: "rgba(255, 255, 255, 0.87)", }}>{carb}g</span></p>
                    <p>Fat: <span style={{color: "rgba(255, 255, 255, 0.87)", }}>{fat}g</span></p>
                    <p>Fiber: <span style={{color: "rgba(255, 255, 255, 0.87)", }}>{fiber}g</span></p>
                </CardText>
                <CardActions>
                    <section style={{display: "flex", justifyContent: "space-evenly", flexDirection: "column", margin: "0"}}>
                        <section style={{display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "100%"}}>
                            <FlatButton style={{color: "rgba(255, 255, 255, 0.87)", }} onClick={() => this.props.prepareToEdit(food_id)} label="Edit Food" />
                            <FlatButton onClick={this.deleteFood} label="Remove" />
                        </section>
                        <section style={{display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "100%"}}>
                            <TextField style={{width: "2em"}} type="number" min="1" max="100" value={this.state.quantityIn} onChange={this.changeAmount} className="food-quantity" />
                            <RaisedButton secondary={true} onClick={this.sendUpdate} label="Update quantity" />
                        </section>
                    </section>
                </CardActions>
            </Card>
        )
    }
}
export default connect(null, { getFoodById, removeFromMeal, updateFoodQuantity })(MealFood)