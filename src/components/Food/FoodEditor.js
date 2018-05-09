import React, { Component } from 'react'
import { updateNameIn, updatePIn, updateCIn, updateFIn, updateFibIn, updateImgIn, toggleFoodEditorModal } from '../../ducks/foodReducer'
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class FoodEditor extends Component{
    constructor() {
        super()
        this.sendEdits = this.sendEdits.bind(this)
    }
    
    sendEdits() {
        const { name, p, c, f, fib, img } = this.props
        const { food_id } = this.props.location.state
        this.props.editFood( food_id, name, p, c, f, fib, img )
    }
    
    
    render() {
        const { name, p, c, f, fib, img } = this.props
        return(
            <Dialog open={this.props.foodEditorDialogOpen} className="food-editor">
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
                <RaisedButton secondary={true} onClick={this.sendEdits}>UpdateFood</RaisedButton>
                <FlatButton onClick={() => this.props.toggleFoodEditorModal(false)}>CLOSE</FlatButton>
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
        foodEditorDialogOpen: state.foods.foodEditorDialogOpen
    }
}

export default connect(mapStateToProps, { updateNameIn, updatePIn, updateCIn, updateFIn, updateFibIn, updateImgIn, toggleFoodEditorModal })(FoodEditor)