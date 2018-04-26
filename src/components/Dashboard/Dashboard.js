import React, { Component } from 'react'
import axios from 'axios'
import { getUserData } from '../../ducks/userReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchMeals } from '../../ducks/foodReducer'


class Dashboard extends Component{
    constructor() {
        super()
        this.state = {
            mealSearch: ''
        }
        this.searchMeals = this.searchMeals.bind(this)
        this.updateMealSearch = this.updateMealSearch.bind(this)
    }
    componentDidMount() {
        if(!this.props.userData.user_id){
            this.props.getUserData()
        }
        console.log('DBoard props', this.props)
    }

    componentDidUpdate() {
        console.log('DBoard updated props', this.props)
    }

    // getUserObjs() {
    //     axios.get('/auth/me').then(res => {
    //         console.log(res.data)
    //     })
    // }
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
    
    render() {
        const mealResults = this.props.mealSearchResults.map(res => {
            return(
                <section className="meal-search-result" key={res.meal_id}>
                    <p>{res.title}</p>
                    <img src={res.img_url} alt={res.title} />
                    <Link to={`/meal/${res.meal_id}`}><button>Show me this one!</button></Link>
                </section>
            )
        })
        return(
            <section>
                Dashboard Yo
                <h3>Search fo a meal:</h3>
                <input value={this.state.mealSearch} onChange={this.updateMealSearch} />
                <button style={{width: "300px"}} onClick={this.searchMeals}>Search!</button>
                {mealResults}
            </section>
        )
    }
}

function mapStateToProps(state){
    return {
        userData: state.users.userData,
        mealSearchResults: state.foods.mealSearchResults
    }
}

export default connect(mapStateToProps, { getUserData, searchMeals })(Dashboard)
