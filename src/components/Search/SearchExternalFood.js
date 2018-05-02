import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchExternalFoods, endNutritionSearch } from '../../ducks/foodReducer'
import ExternalFoodCard from '../Food/ExternalFoodCard'
import TextField from 'material-ui/TextField';



class SearchExternalFood extends Component{
    constructor(){
        super()
        this.state = {
            branded: false,
            externalSearchIn: ''
        }
        this.searchExternalFoods = this.searchExternalFoods.bind(this)
        this.updateExternalSearch = this.updateExternalSearch.bind(this)
        this.endSearches = this.endSearches.bind(this)
        this.changeBranded = this.changeBranded.bind(this)

    }

    searchExternalFoods() {
        this.props.searchExternalFoods(this.state.externalSearchIn)
        this.setState({
            externalSearchIn: ''
        })
    }

    updateExternalSearch(e){
        this.setState({
            externalSearchIn: e.target.value
        })
    }

    endSearches(){
        this.props.endNutritionSearch()
    }

    changeBranded(curr){
        this.setState({
            branded: !curr
        })
    }
    

    render() {
        const { externalSearchIn, branded } = this.state
        const { searchExternalFoods, externalFoods } = this.props
        const externalList = externalFoods.map((f, i) => {
            return(
                <ExternalFoodCard key={i} name={f.name} p={f.p} c={f.c} f={f.f} fib={f.fib} img={f.img} addFood={this.props.addFood} />
            )
        })
        return (
            <section className="external-food-search">
                <TextField value={externalSearchIn} placeholder="Type in a food name" onChange={this.updateExternalSearch} />
                <button onClick={()=>searchExternalFoods(externalSearchIn, branded)}>Search!</button>
                {
                    branded
                    ?
                    <button onClick={()=>this.changeBranded(branded)}>Search Whole/Common Foods Only</button>
                    :
                    <button onClick={()=>this.changeBranded(branded)}>Search for Brand Foods</button>
                }
                {externalList}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        externalFoods: state.foods.externalFoods
    }
}


export default connect(mapStateToProps, { searchExternalFoods, endNutritionSearch })(SearchExternalFood)