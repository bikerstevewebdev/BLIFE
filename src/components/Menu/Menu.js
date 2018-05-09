import React, { Component } from 'react'
import MenuMeal from '../Meal/MenuMeal'
import { connect } from 'react-redux'
import { searchMeals, addMealToMenu, getMenuById, clearMealSearch } from '../../ducks/foodReducer'
import RaisedButton from 'material-ui/RaisedButton'

class Menu extends Component{
    constructor() {
        super()
        this.state = {
            searchIn: ''
        }
        this.updateSearchIn = this.updateSearchIn.bind(this)
        this.endSearch = this.endSearch.bind(this)
        this.addThisMeal = this.addThisMeal.bind(this)
    }
    
    componentDidMount() {
        console.log(this.props)
        const { from } = this.props.match.params
        if(!isNaN(from) && from > 0){
            this.props.getMenuById(from)
        } 
    }

    componentDidUpdate(){
        console.log('Menu updated props:',this.props)
    }

    addThisMeal(menu_id, meal_id, p, c, f, fib){
        this.props.addMealToMenu(menu_id, meal_id, p, c, f, fib)
        this.endSearch()
    }

    endSearch(){
        this.props.clearMealSearch()
        this.setState({
            searchIn: ''
        })
    }

    updateSearchIn(val){
        this.setState({
            searchIn: val
        })
    }
    
    render() {
        const { menuMeals, menu, mealSearchResults } = this.props,
              { menu_id, title, img, total_p, total_c, total_f, total_fib } = menu,
              { searchIn } = this.state,
              mealResults = mealSearchResults.map(_meal => {
                const { meal_id, total_p, total_c, total_f, total_fib, title, img_url } = _meal
                return (
                    <section key={meal_id} className="meal-result">
                        <img src={img_url} alt={title} />
                        <p>Meal Title: {title}</p>
                        <p>Protein: {total_p}</p>
                        <p>Carb: {total_c}</p>
                        <p>Fat: {total_f}</p>
                        <p>Fiber: {total_fib}</p>
                        <RaisedButton secondary={true} onClick={() => this.addThisMeal(menu_id, meal_id, total_p, total_c, total_f, total_fib)}>Add to {this.props.menu.title}</RaisedButton>
                    </section>
                ) }),
              menuMealsList = menuMeals.map(meal => {
            const { meal_id, title, total_p, total_c, total_f, total_fib, img_url, menu_meals_id } = meal
            return <MenuMeal prepareToEdit={this.prepareToEdit} key={menu_meals_id} menu_id={menu_id} meal_id={meal_id} menu_meals_id={menu_meals_id} title={title} total_p={total_p} total_c={total_c} total_f={total_f} total_fib={total_fib} img_url={img_url} />            
        })
        return(
            <section className="menu">
                <h2>{title}</h2>
                {img ? <img src={img} alt={title} /> : null}
                <h3>Total Macros for {title}:</h3>
                <p>Protein: {total_p}</p>
                <p>Carbs: {total_c}</p>
                <p>Fat: {total_f}</p>
                <p>Fiber: {total_fib}</p>
                <h3>Meals in this menu:</h3>
                {menuMealsList}
                <input value={searchIn} placeholder="Search Meals by Name" onChange={e => this.updateSearchIn(e.target.value)}/>
                <RaisedButton secondary={true} onClick={() => this.props.searchMeals(searchIn)}>Search for your meal!</RaisedButton>
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

export default connect(mapStateToProps, { searchMeals, addMealToMenu, getMenuById, clearMealSearch })(Menu)