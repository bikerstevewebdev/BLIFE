import React, { Component } from 'react'
import MenuMeal from '../Meal/MenuMeal'
import { connect } from 'react-redux'
import { searchMeals, addMealToMenu, getMenuById } from '../../ducks/foodReducer'

class Meal extends Component{
    constructor() {
        super()
        this.state = {
            searchIn: ''
        }
        this.updateSearchIn = this.updateSearchIn.bind(this)
    }
    
    componentDidMount() {
        const { id } = this.props.match.params
        if(!isNaN(id) && id > 0){
            this.props.getMenuById(id)
        } 
    }

    updateSearchIn(e){
        this.setState({
            searchIn: e.target.value
        })
    }
    render() {
        const { menuMeals, menu, mealSearchResults } = this.props
        const { menu_id } = menu
        const mealResults = mealSearchResults.map(_meal => {
            const { meal_id, total_p, total_c, total_f, total_fib, title, img_url } = _meal
            return (
                <section key={meal_id} className="food-result">
                    <img src={img_url} alt={title} />
                    <p>Meal Title: {title}</p>
                    <p>Protein: {total_p}</p>
                    <p>Carb: {total_c}</p>
                    <p>Fat: {total_f}</p>
                    <p>Fiber: {total_fib}</p>
                    <button onClick={this.props.addMealToMenu(menu_id, meal_id, total_p, total_c, total_f, total_fib)}>Add to {this.props.menu.title}</button>
                </section>
            )
        })
        const menuMealsList = menuMeals.map(meal => {
            const { meal_id, title, total_p, total_c, total_f, total_fib, img, menu_meals_id } = meal
            return <MenuMeal key={meal_id} menu_id title total_p total_c total_f meal_id menu_meals_id total_fib img_url />            
        })
        return(
            <section className="menu">
                <h2>{title}</h2>
                {img_url ? <img src={img_url} alt={title} /> : null}
                <h3>Total Macros for {title}:</h3>
                <p>Protein: {total_p}</p>
                <p>Carbs: {total_c}</p>
                <p>Fat: {total_f}</p>
                <p>Fiber: {total_fib}</p>
                <h3>Meals in this menu:</h3>
                {menuMealsList}
                <input value={searchIn} placeholder="Search Meals by Name" onChange={e => this.props.updateSearchIn(e.target.value)}/>
                <button onClick={() => this.props.searchFoods(searchIn)}>Search for your meal!</button>
                {mealResults}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        menuMeals: state.foods.menuMeals,
        mealSearchResults: state.foods.mealSearchResults,
        menu: state.foods.menu
    }
}

export default connect(mapStateToProps, { searchMenus, addMealToMenu, getMenuById })(Menu)
