import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { searchExternalFoods, addFoodToDBAndMeal } from '../../ducks/foodReducer'
import MealCreator from '../MealCreator/MealCreator'
// import Meal from './Meal'
import Food from '../Food/Food'
import MealFood from '../Food/MealFood'
import RaisedButton from 'material-ui/RaisedButton'

class MealFromRecipe extends Component{
    constructor(){
        super()
        this.state = {
            recipeResults: [],
            recipeSearchIn:'',
            searchingRecipe: true,
            rName: '',
            rImg: '',
            rIngredients: [],
            creatingMeal: false,
            mealCreated: false
        }
        this.updateRecipeSearchIn = this.updateRecipeSearchIn.bind(this)
        this.changeCreatingMeal = this.changeCreatingMeal.bind(this)
        this.searchRecipes = this.searchRecipes.bind(this)
        this.pickRecipe = this.pickRecipe.bind(this)
        
    }

    // addFoodToMeal(meal_id, food_id, p, c, f, fib, total_p, total_c, total_f, total_fib, quantity){
    //     this.props.addFoodToMeal(meal_id, food_id, p, c, f, fib, total_p, total_c, total_f, total_fib, quantity)
    //     this.setState({
    //         addingToMeal: 0,
    //     })
    // }

    searchRecipes() {
        console.log(this.state.recipeSearchIn)
        axios.get(`/recipes?name=${this.state.recipeSearchIn}`).then(res => {
            this.setState({
                recipeResults: res.data
            })
        })
    }

    updateRecipeSearchIn(e) {
        this.setState({
            recipeSearchIn: e.target.value
        })
    }

    changeCreatingMeal(val) {
        this.setState({
            creatingMeal: val,
            mealCreated: true
        })
    }

    addFoodToDBMeal(food, p, c, f, fib, img){
        this.props.addFoodToDBAndMeal(this.props.meal.meal_id, food, p, c, f, fib, img)
        let newArr = this.state.rIngredients.filter(v => v !== food)
        this.setState({
            rIngredients: newArr
        })
    }

    pickRecipe(rName, rIngredients, rImg){
        console.log(rIngredients)
        this.setState({ 
            searchingRecipe: false,
            creatingMeal: true,
            rName,
            rIngredients,
            rImg
        })
    }
    
    render() {
        const { rIngredients, recipeSearchIn, creatingMeal, recipeResults, rName, rImg, mealCreated, searchingRecipe } = this.state
        const { mealFoods, meal, searchExternalFoods } = this.props
        const { total_p, total_c, total_f, total_fib, meal_id, title, img_url } = meal        
        
            const mealFoodList = mealFoods.map(food => {
                const { food_id, name, pro, carb, fat, fiber, img, quantity, meal_food_id } = food
                return <MealFood key={meal_food_id} food_id={food_id} meal_food_id={meal_food_id} name={name} pro={pro} carb={carb} fat={fat} meal_id={meal_id} fiber={fiber} img={img} quantity={quantity} />            
            })
        
        const recipes = recipeResults.map((r, i) => {
            let { ingredients, img, name } = r
            return (
                <section key={i} className="recipe-result">
                    <img src={img} alt={name} />
                    <p>Food Name: {name}</p>
                    {ingredients.map((v, j) => <li key={j}>{v}</li>)}
                    <RaisedButton secondary={true} onClick={() => this.pickRecipe(name, ingredients, img)}>Recreate This Recipe</RaisedButton>
                </section>
            )
        })
        let ingredients = rIngredients.map((v, i) => {
            return <RaisedButton secondary={true} key={i} onClick={() => searchExternalFoods(v, false)}>{v}</RaisedButton>
        })
        return(
            <section className="meal-from-recipe">
                <input onChange={this.updateRecipeSearchIn} value={recipeSearchIn} placeholder="Search for a recipe by name"/>
                <RaisedButton secondary={true} onClick={this.searchRecipes}>Search for a recipe!</RaisedButton>
                
                {
                    searchingRecipe
                    ?
                    recipes
                    :
                    null
                }
                {
                    mealCreated
                    ?
                    <section className="create-recipe">
                        <h2>{title}</h2>
                        {img_url ? <img src={img_url} alt={title} /> : null}
                        <h3>Total Macros for {title}:</h3>
                        <p>Protein: {total_p}</p>
                        <p>Carbs: {total_c}</p>
                        <p>Fat: {total_f}</p>
                        <p>Fiber: {total_fib}</p>
                        <h3>Foods in this meal:</h3>
                        {mealFoodList}
                        {ingredients}
                        <Food fromRecipe={true} match={this.props.match}/>
                    </section>
                    :
                        creatingMeal
                        ?
                            <MealCreator rName={rName} rImg={rImg} changeCreating={this.changeCreatingMeal} fromRecipe={true}/>
                        :
                        null
                }
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        meal: state.foods.meal,
        mealFoods: state.foods.mealFoods
    }
}

export default connect(mapStateToProps, { searchExternalFoods, addFoodToDBAndMeal })(MealFromRecipe)
