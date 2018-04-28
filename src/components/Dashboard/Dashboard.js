import React, { Component } from 'react'
import { getUserData } from '../../ducks/userReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchMeals, searchMenus, endNutritionSearch } from '../../ducks/foodReducer'
import { searchWorkouts, endFitnessSearch } from '../../ducks/fitnessReducer'


class Dashboard extends Component{
    constructor() {
        super()
        this.state = {
            menuSearch: '',
            mealSearch: '',
            workoutSearch: '',
            searchingMeals: true,
            searchingMenus: true,
            searchingWorkouts: true
        }
        this.searchMeals = this.searchMeals.bind(this)
        this.searchMenus = this.searchMenus.bind(this)
        this.updateMealSearch = this.updateMealSearch.bind(this)
        this.updateMenuSearch = this.updateMenuSearch.bind(this)
        this.updateWorkoutSearch = this.updateWorkoutSearch.bind(this)
        this.endWorkoutSearch = this.endWorkoutSearch.bind(this)
        this.endMealSearch = this.endMealSearch.bind(this)
        this.endMenuSearch = this.endMenuSearch.bind(this)
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

    searchMenus() {
        this.props.searchMenus(this.state.menuSearch)
        this.setState({
            menuSearch: ''
        })
    }

    updateMenuSearch(e) {
        this.setState({
            menuSearch: e.target.value
        })
    }

    searchWorkouts() {
        this.props.searchWorkouts(this.state.workoutSearch)
        this.setState({
            workoutSearch: ''
        })
    }

    updateWorkoutSearch(e) {
        this.setState({
            workoutSearch: e.target.value
        })
    }

    endSearches(){
        this.props.endNutritionSearch()
        this.props.endFitnessSearch()
        // this.setState({
        //     searchingMeals: false
        // })
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
        const menuResults = this.props.menuSearchResults.map(res => {
            return(
                <section className="menu-search-result" key={res.menu_id}>
                    <p>{res.title}</p>
                    <img src={res.img} alt={res.title} />
                    <Link to={`/menu/${res.menu_id}`}><button onClick={this.endSearches}>Take me to this menu!</button></Link>
                </section>
            )
        })
        const workoutResults = this.props.workoutSearchResults.map(res => {
            return(
                <section className="workout-search-result" key={res.workout_id}>
                    <p>{res.title}</p>
                    <img src={res.img} alt={res.title} />
                    <Link to={`/workout/${res.workout_id}`}><button onClick={this.endSearches}>Take me to this workout!</button></Link>
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
                <h3>Search fo a MENU:</h3>
                <input value={this.state.menuSearch} onChange={this.updateMenuSearch} />
                <button style={{width: "300px"}} onClick={this.searchMenus}>Search!</button>
                {menuResults}
                <h3>Find your new Workout:</h3>
                <input value={this.state.workoutSearch} onChange={this.updateWorkoutSearch} />
                <button style={{width: "300px"}} onClick={this.searchWorkouts}>Search!</button>
                {workoutResults}
                {/* {
                    this.state.searchingMeals 
                    ? 
                    mealResults
                    :
                    null
                }
                {
                    this.state.searchingMenus 
                    ? 
                    menuResults
                    :
                    null
                }
                {
                    this.state.searchingWorkouts
                    ?
                    workoutResults
                    :
                    null
                } */}
            </section>
        )
    }
}

function mapStateToProps(state){
    return {
        userData: state.users.userData,
        mealSearchResults: state.foods.mealSearchResults,
        menuSearchResults: state.foods.menuSearchResults
    }
}

export default connect(mapStateToProps, { getUserData, searchMeals, searchMenus, endNutritionSearch, endFitnessSearch })(Dashboard)
