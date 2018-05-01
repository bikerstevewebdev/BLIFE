import React, { Component } from 'react'
import { updateNameIn, updatePIn, updateCIn, updateFIn, updateFibIn, updateImgIn, addFoodToDB, getFoodById, searchExternalFoods, endNutritionSearch } from '../../ducks/foodReducer'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import ExternalFoodCard from '../Food/ExternalFoodCard'

class Food extends Component{
    constructor() {
        super()
        this.state = {
            searchingExternal: false,
            branded: false,
            externalSearchIn: ''
        }
        this.sendEdits = this.sendEdits.bind(this)
        this.toggleExternalSearch = this.toggleExternalSearch.bind(this)
        this.updateExternalSearch = this.updateExternalSearch.bind(this)
        this.addFood = this.addFood.bind(this)
        this.changeBranded = this.changeBranded.bind(this)
    }

    componentDidMount() {
        if(this.props.match.params.from === 'meal'){
            this.props.getFoodById(this.props.location.state.food_id)
        }
    }
    
    sendEdits() {
        const { name, p, c, f, fib, img } = this.props
        const { food_id } = this.props.location.state
        this.props.editFood( food_id, name, p, c, f, fib, img )
    }

    addFood(name, p, c, f, fib, img, external){
        this.props.addFoodToDB(name, p, c, f, fib, img)
        if(external){
            this.setState({
                searchingExternal: false,
                externalSearchIn: ''
            })
            this.props.endNutritionSearch()
        }
    }

    updateExternalSearch(e){
        this.setState({
            externalSearchIn: e.target.value
        })
    }
    
    toggleExternalSearch(curr){
        this.setState({
            searchingExternal: !curr
        })
    }
    
    changeBranded(curr){
        this.setState({
            branded: !curr
        })
    }
    
    render() {
        const { name, p, c, f, fib, img, errorMessage, searchExternalFoods, externalFoods } = this.props
        const { searchingExternal, externalSearchIn, branded } = this.state
        const externalList = externalFoods.map((f, i) => {
            return(
                <ExternalFoodCard key={i} name={f.name} p={f.p} c={f.c} f={f.f} fib={f.fib} img={f.img} addFood={this.addFood} />
            )
        })
        return(
            <section>
                <p>Add a Food to the BLIFE Database</p>
                <p>Name:</p>
                <input className="food-name" value={name} onChange={(e) => this.props.updateNameIn(e.target.value)} placeholder="food name"/>
                <p>Protein:</p>
                <input className="food-p" type="number" min="0" max="1000" value={p} onChange={(e) => this.props.updatePIn(e.target.value)}/>
                <p>Carbs:</p>
                <input className="food-c" type="number" min="0" max="1000" value={c} onChange={(e) => this.props.updateCIn(e.target.value)}/>
                <p>Fat:</p>
                <input className="food-f" type="number" min="0" max="1000" value={f} onChange={(e) => this.props.updateFIn(e.target.value)}/>
                <p>Fiber:</p>
                <input className="food-fib" type="number" min="0" max="1000" value={fib} onChange={(e) => this.props.updateFibIn(e.target.value)}/>
                <p>Image URL:</p>
                <input className="food-img-url" value={img} onChange={(e) => this.props.updateImgIn(e.target.value)} placeholder="link to image"/>
                {
                    errorMessage
                    ?
                    <h2>{errorMessage}</h2>
                    :
                    null
                }
                {
                    this.props.match.params.from === 'meal'
                    ?
                    <section className="update-food">
                        <button onClick={this.sendEdits}>UpdateFood</button>
                        <Link to={`meal/${this.props.meal.meal_id}`}>Back to Meal</Link>
                    </section>
                    :
                    <button onClick={() => this.addFood(name, p, c, f, fib, img)}>Add Food</button>
                }
                {
                    searchingExternal
                    ?
                    <section className="external-food-search">
                        <input value={externalSearchIn} placeholder="Type in a food name" onChange={this.updateExternalSearch} />
                        <button onClick={()=>searchExternalFoods(externalSearchIn, branded)}>Search!</button>
                        {
                            branded
                            ?
                            <section className="external-food-search">
                                <button onClick={()=>this.changeBranded(branded)}>Search Whole/Common Foods Only</button>
                            </section>
                            :
                            <button onClick={()=>this.changeBranded(branded)}>Search for Brand Foods</button>
                        }
                        {externalList}
                        <button onClick={() => this.toggleExternalSearch(searchingExternal)}>Just kidding, get the search out of here</button>
                    </section>
                    :
                    <button onClick={() => this.toggleExternalSearch(searchingExternal)}>Need some inspiration?</button>
                }
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        name: state.foods.name,
        p: state.foods.p,
        c: state.foods.c,
        f: state.foods.f,
        fib: state.foods.fib,
        img: state.foods.img,
        meal: state.foods.meal,
        errorMessage: state.foods.errorMessage,
        externalFoods: state.foods.externalFoods
    }
}

export default connect(mapStateToProps, { updateNameIn, updatePIn, updateCIn, updateFIn, updateFibIn, updateImgIn, addFoodToDB, getFoodById, searchExternalFoods, endNutritionSearch })(Food)