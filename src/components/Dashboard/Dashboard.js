import React, { Component } from 'react'
import { getUserData } from '../../ducks/userReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchMeals, searchMenus } from '../../ducks/foodReducer'


class Dashboard extends Component{
    constructor() {
        super()
        this.state = {
            mealSearch: '',
            searchingMeal: true,
            searchingMenu: true
        }
        this.searchMeals = this.searchMeals.bind(this)
        this.searchMenus = this.searchMenus.bind(this)
        this.updateMealSearch = this.updateMealSearch.bind(this)
        this.updateMenuSearch = this.updateMenuSearch.bind(this)
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

    endMealSearch(){
        this.setState({
            searchingMeal: false
        })
    }
    
    endMenuSearch(){
        this.setState({
            searchingMenu: false
        })
    }
    
    render() {
        const mealResults = this.props.mealSearchResults.map(res => {
            return(
                <section className="meal-search-result" key={res.meal_id}>
                    <p>{res.title}</p>
                    <img src={res.img_url} alt={res.title} />
                    <Link to={`/meal/${res.meal_id}`}><button onClick={this.endMealSearch}>Show me this one!</button></Link>
                </section>
            )
        })
        const menuResults = this.props.menuSearchResults.map(res => {
            return(
                <section className="menu-search-result" key={res.menu_id}>
                    <p>{res.title}</p>
                    <img src={res.img} alt={res.title} />
                    <Link to={`/menu/${res.menu_id}`}><button onClick={this.endMenuSearch}>Take me to this menu!</button></Link>
                </section>
            )
        })
        return(
            <section>
                Dashboard Yo
                <h3>Search fo a meal:</h3>
                <input value={this.state.mealSearch} onChange={this.updateMealSearch} />
                <button style={{width: "300px"}} onClick={this.searchMeals}>Search!</button>
                <h3>Search fo a MENU:</h3>
                <input value={this.state.menuSearch} onChange={this.updateMenuSearch} />
                <button style={{width: "300px"}} onClick={this.searchMenus}>Search!</button>
                {
                    this.state.searchingMeal 
                    ? 
                    mealResults
                    :
                    null
                }
                {
                    this.state.searchingMenu 
                    ? 
                    menuResults
                    :
                    null
                }
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

export default connect(mapStateToProps, { getUserData, searchMeals, searchMenus })(Dashboard)
