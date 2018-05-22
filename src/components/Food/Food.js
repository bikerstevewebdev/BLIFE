import React, { Component } from 'react'
import { updateNameIn, updatePIn, updateCIn, updateFIn, updateFibIn, updateImgIn, addFoodToDB, getFoodById, searchExternalFoods, endNutritionSearch, toggleFoodModal } from '../../ducks/foodReducer'
import { connect } from 'react-redux';
import SearchExternalFood from '../Search/SearchExternalFood'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField, IconButton } from 'material-ui';
import './Food.css'
import CloseBtn from 'material-ui/svg-icons/navigation/close'

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
            <Dialog autoScrollBodyContent={true} bodyStyle={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", overFlowY: "scroll"}} open={this.props.foodDialogOpen} className="comp food-creator">
                <h1 style={{fontSize: "1.75em"}}>Add a Food to the BLIFE Database</h1>
                <section style={{display: "flex", justifyContent: "space-around"}}>
                    <section style={{display: "flex", flexDirection: "column", justifyContent: "space-around", width: "100%"}}>
                        <TextField floatingLabelText="Name" className="food-name" value={name} onChange={(e) => this.props.updateNameIn(e.target.value)} hintText="food name"/>
                        <TextField floatingLabelText="Image URL" className="food-img-url" value={img} onChange={(e) => this.props.updateImgIn(e.target.value)} hintText="link to image"/>
                    </section>
                    {img.length ? <img style={{maxWidth: "300px", maxHeight: "300px"}} src={img} alt="Preview" /> : null}
                </section>
                <section style={{display: "flex", justifyContent: "space-around", width: "100%"}}>
                    <TextField floatingLabelText="Protein" className="food-p" type="number" min="0" max="1000" value={p} onChange={(e) => this.props.updatePIn(e.target.value)}/>
                    <TextField floatingLabelText="Carbs" className="food-c" type="number" min="0" max="1000" value={c} onChange={(e) => this.props.updateCIn(e.target.value)}/>
                </section>
                <section style={{display: "flex", justifyContent: "space-around", width: "100%"}}>
                    <TextField floatingLabelText="Fat" className="food-f" type="number" min="0" max="1000" value={f} onChange={(e) => this.props.updateFIn(e.target.value)}/>
                    <TextField floatingLabelText="Fiber" className="food-fib" type="number" min="0" max="1000" value={fib} onChange={(e) => this.props.updateFibIn(e.target.value)}/>
                </section>
                <section style={{display: "flex", justifyContent: "space-around", width: "100%"}}>

                    <RaisedButton disabled={!name.length || !p || !c || !f || !fib} secondary={true} onClick={() => this.addFood(name, p, c, f, fib, img)} label="Add to the Database" />
                    {
                        searchingExternal
                        ?
                        <RaisedButton secondary={true} onClick={() => this.toggleExternalSearch(searchingExternal)} label="End External Search" />
                        :
                        <RaisedButton secondary={true} onClick={() => this.toggleExternalSearch(searchingExternal)} label="Need some inspiration?" />
                    }
                    <IconButton className="close-btn" onClick={() => this.props.toggleFoodModal(false)} label="close"><CloseBtn /></IconButton>
                </section>
                <section style={{display: "flex", justifyContent: "space-around", maxHeight: "225px", width: "100%", alignItems: "center"}}>
                    {
                        searchingExternal //|| this.props.fromRecipe
                        ?
                        <SearchExternalFood addFood={this.addFood} />
                        :
                        null
                    }
                </section>
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