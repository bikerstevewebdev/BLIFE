import React, { Component } from 'react'
import { updateNameIn, updatePIn, updateCIn, updateFIn, updateFibIn, updateImgIn, addFoodToDB, getFoodById, searchExternalFoods, endNutritionSearch, toggleFoodModal } from '../../ducks/foodReducer'
import { connect } from 'react-redux';
import SearchExternalFood from '../Search/SearchExternalFood'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class Food extends Component{
    constructor() {
        super()
        this.state = {
            searchingExternal: false,
        }
        this.sendEdits = this.sendEdits.bind(this)
        this.toggleExternalSearch = this.toggleExternalSearch.bind(this)
        this.addFood = this.addFood.bind(this)
    }

    // componentDidMount() {
    //     if(this.props.match.params.from === 'meal'){
    //         this.props.getFoodById(this.props.location.state.food_id)
    //     }
    // }
    
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
    
    toggleExternalSearch(curr){
        this.setState({
            searchingExternal: !curr
        })
    }
    
    
    render() {
        const { name, p, c, f, fib, img } = this.props
        const { searchingExternal } = this.state
        return(
            <Dialog open={this.props.foodDialogOpen} className="comp food-creator">
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
                <img src={img} alt="Preview" />

                <RaisedButton secondary={true} onClick={() => this.addFood(name, p, c, f, fib, img)}>Add Food to the Database</RaisedButton>
                {
                    searchingExternal //|| this.props.fromRecipe
                    ?
                    <SearchExternalFood addFood={this.addFood} />
                    :
                    null
                }
                {
                    searchingExternal
                    ?
                    <RaisedButton secondary={true} onClick={() => this.toggleExternalSearch(searchingExternal)}>Just kidding, get the search out of here</RaisedButton>
                    :
                    <RaisedButton secondary={true} onClick={() => this.toggleExternalSearch(searchingExternal)}>Need some inspiration?</RaisedButton>
                }
                <FlatButton onClick={() => this.props.toggleFoodModal(false)}>close</FlatButton>
            </Dialog>
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
        foodDialogOpen: state.foods.foodDialogOpen
    }
}

export default connect(mapStateToProps, { updateNameIn, updatePIn, updateCIn, updateFIn, updateFibIn, updateImgIn, addFoodToDB, getFoodById, searchExternalFoods, endNutritionSearch, toggleFoodModal })(Food)