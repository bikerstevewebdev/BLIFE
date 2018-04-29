import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchMeals, endNutritionSearch } from '../../ducks/foodReducer'

class SearchMeal extends Component{
    constructor(){
        super()
        this.state = {
            mealSearch: ''
        }
        this.searchMeals = this.searchMeals.bind(this)
        this.updateMealSearch = this.updateMealSearch.bind(this)
        this.endSearches = this.endSearches.bind(this)
    }

    searchMeals() {
        this.props.searchMeals(this.state.mealSearch)
        this.setState({
            mealSearch: ''
        })
    }

    updateMealSearch(e) {
        this.setState({
            mealSearch: e.target.value
        })
    }

    endSearches(){
        this.props.endNutritionSearch()
    }


    render() {
        const mealResults = this.props.mealSearchResults.map(res => {
            return(
                <section className="meal-search-result" key={res.meal_id}>
                    <p>{res.title}</p>
                    <img src={res.img_url} alt={res.title} />
                    <Link to={`/meal/${res.meal_id}`}><button onClick={this.endSearches}>Show me this one!</button></Link>
                </section>
            )
        })
        return (
            <section className="menu-search">
                <h3>Search fo a meal:</h3>
                <input value={this.state.mealSearch} onChange={this.updateMealSearch} />
                <button style={{width: "300px"}} onClick={this.searchMeals}>Search!</button>
                {mealResults}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        mealSearchResults: state.foods.mealSearchResults,
    }
}


export default connect(mapStateToProps, { searchMeals, endNutritionSearch })(SearchMeal)