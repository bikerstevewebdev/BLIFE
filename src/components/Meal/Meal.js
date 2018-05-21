import React, { Component } from 'react'
import MealFood from '../Food/MealFood'
import { connect } from 'react-redux'
import { searchFoods, addFoodToMeal, getMealById, getFoodById, toggleFoodEditorModal } from '../../ducks/foodReducer'
import { Link } from 'react-router-dom'
import FoodEditor from '../Food/FoodEditor'
import { TextField, RaisedButton } from 'material-ui'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'


class Meal extends Component{
    constructor(){
        super()
        this.state = {
            searchIn:'',
            quantityIn: '',
            addingToMeal: 0,
            foodEditing: 0 
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
                <Card key={food_id} style={{maxWidth: "225px", width: "100%", height: "20em", borderRadius: "5px"}} >
                    {
                        img.length > 0
                        ?
                        <CardMedia style={{height: "9.5em"}} >
                            <img src={img} style={{maxHeight: "9.5em", borderRadius: "5px 5px 0 0"}} alt={name} />
                        </CardMedia>
                        :
                        null
                    }
                    <CardTitle style={{padding: "0.5em 0.5em"}} titleStyle={{fontSize: "1.08em", lineHeight: "1.5em", textTransform: "capitalize"}} title={name} />
                    <CardText style={{display: "flex", padding: "0.5em 1em"}}>
                        <p>Protein: {pro}g</p>
                        <p>Carbs: {carb}g</p>
                        <p>Fat: {fat}g</p>
                        <p>Fiber: {fiber}g</p>
                    </CardText>
                    <CardActions style={{textAlign: "center"}}>
                        {this.state.addingToMeal !== food_id
                        ?
                            <RaisedButton secondary={true} onClick={() => this.prepareToAdd(food_id)} label={`Add to ${title}?`} />
                        :
                            <section style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="add-food-to-meal">
                                <p>How many?</p>
                                <section style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "space-evenly"}} className="quantity">
                                    <TextField style={{width: "2em"}} value={quantityIn} onChange={this.updateQuantity} />
                                    <RaisedButton secondary={true} onClick={() => this.addFoodToMeal(meal_id, food_id, pro, carb, fat, fiber, total_p, total_c, total_f, total_fib,quantityIn/1)} label="Add to meal" />
                                </section>
                            </section>
                        }
                    </CardActions>
                </Card>
            )
        })
        const mealFoodList = mealFoods.map(food => {
            const { food_id, name, pro, carb, fat, fiber, img, quantity, meal_food_id } = food
            return <MealFood location={this.props.location} prepareToEdit={this.prepareToEdit} key={meal_food_id} food_id={food_id} meal_food_id={meal_food_id} name={name} pro={pro} carb={carb} fat={fat} meal_id={meal_id} fiber={fiber} img={img} quantity={quantity} />            
        })
        const layoutStyles = {
            // height: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            // gridAutoRows: "150px",
            boxShadow: "rgb(37, 48, 51) 1px 1px 1px 1px",
            borderRadius: "1.5em",
            backgroundColor: "rgba(164, 197, 208, 0.83)",
            padding: "2em",
            gridGap: "1em 0",
            alignItems: "center",
            justifyItems: "center"
        }
        const subStyles = {
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            padding: "2em",
            gridGap: "1em 0",
            alignItems: "center",
            justifyItems: "center",
            width: "100%"
        }
        const macroStyles = {
            borderRadius: "3px",
            padding: "0.25em",
            gridColumn: "1/3",
            color: "#03020ad1",
            maxHeight: "125px",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "space-around",
            display: "flex",
            boxShadow: "rgb(27, 32, 33) 1px 1px 1px 1px",
            flexDirection: "column",
            height: "100%",
            padding: "5% 0",
            backgroundColor: "#19a503b0",
            justifySelf: "center",
            width: "75%"
        }
        const foodSearchStyle = {
            ...subStyles,
            boxShadow: "rgba(10, 6, 15, 0.59) 0px 1px 6px 3px",
            backgroundColor: "#c2d8c4",
            borderRadius: "3px",
            gridArea: "5/1/5/5",
            gridGap: "0.5em 0"
        }
        return(
            <section style={{...layoutStyles}} className="comp meal">
                <h2 style={{gridArea: "1/3/2/5", fontSize: "3em"}}>{title}</h2>
                {img_url ? <img src={img_url} style={{gridArea: "1/1/4/3", maxWidth: "350px", maxHeight: "350px", borderRadius: "3px"}} alt={title} /> : null}
                <section style={{...macroStyles, gridArea: "2/3/3/5", display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                    <section style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <h3 style={{fontSize: "1.25em", margin: "0.5em"}}>Total Macros for {title}:</h3>
                        <p>Protein: {total_p}</p>
                    </section>
                    <section style={{display: "flex", justifyContent: "space-evenly", width: "100%"}}>
                        <p>Carbs: {total_c}</p>
                        <p>Fat: {total_f}</p>
                        <p>Fiber: {total_fib}</p>
                    </section>
                </section>
                    {
                        this.props.match && this.props.match.params.id === 'menu'
                        ?
                        <Link style={{gridArea: "3/4/4/5"}} to={{pathname: `/menu/${this.props.location.state.menu_id}`}}>
                            <RaisedButton label="Go Back to the menu?" />
                        </Link>
                        :
                        null
                    }
                <h3 style={{gridRow: "3/4", fontSize: "1.5em", justifySelf: "start"}}>Foods in this meal:</h3>
                <section style={{...subStyles, gridArea: "4/1/5/5"}}>
                    {mealFoodList}
                </section>
                <section style={{...foodSearchStyle}}>
                    <TextField value={searchIn} hintText="Search Foods by Name" onChange={this.updateSearchIn}/>
                    <RaisedButton onClick={() => this.props.searchFoods(searchIn)} primary={true} label="Search for your food!" />
                    {foodResults}
                </section>
                
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
