import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchMeals, endNutritionSearch } from '../../ducks/foodReducer'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'

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
            <section className="meal-search">
                <h3>Search fo a meal:</h3>
                <TextField floatingLabelText="Search the meal database" value={this.state.mealSearch} onChange={this.updateMealSearch} />
                <RaisedButton onClick={this.searchMeals} style={{width: "300px"}} label="Search Meals!" primary={true} />
                {/* <button  >!</button> */}
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