import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchExternalFoods, endNutritionSearch } from '../../ducks/foodReducer'
import ExternalFoodCard from '../Food/ExternalFoodCard'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'



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

    searchExternalFoods(e) {
        e.preventDefault()
        if(this.state.externalSearchIn.length){
            this.props.searchExternalFoods(this.state.externalSearchIn, this.state.branded)
            this.setState({
                externalSearchIn: ''
            })
        }else{
            alert('Please enter text to search.')
        }
        
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
        const layoutStyles = {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            alignItems: "center",
            overFlowY: "scroll",
            maxHeight: "164px",
            padding: "0.5em",
            gridGap: "0.5em"
        }
        return (
            <form style={{...layoutStyles}} className="external-food-search" onSubmit={(e) => this.searchExternalFoods(e)}>
                <TextField fullWidth style={{gridArea: "1/1/2/2"}} value={externalSearchIn} placeholder="Type in a food name" onChange={this.updateExternalSearch} />
                <RaisedButton style={{gridArea: "1/2/2/3"}} secondary={true} onClick={this.searchExternalFoods} type="submit" label="Search!" />
                {
                    branded
                    ?
                    <RaisedButton style={{gridArea: "1/3/2/4"}} secondary={true} onClick={()=>this.changeBranded(branded)}label="Whole Foods Only" />
                    :
                    <RaisedButton style={{gridArea: "1/3/2/4"}} secondary={true} onClick={()=>this.changeBranded(branded)} label="Search for Brand Foods" />
                }
                {externalList}
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        externalFoods: state.foods.externalFoods
    }
}


export default connect(mapStateToProps, { searchExternalFoods, endNutritionSearch })(SearchExternalFood)