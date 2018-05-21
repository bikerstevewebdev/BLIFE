import React, { Component } from 'react'
import { updateNameIn, updatePIn, updateCIn, updateFIn, updateFibIn, updateImgIn, toggleFoodEditorModal, editFood } from '../../ducks/foodReducer'
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'material-ui';


class FoodEditor extends Component{
    constructor() {
        super()
        this.sendEdits = this.sendEdits.bind(this)
    }
    
    sendEdits() {
        const { name, p, c, f, fib, img, food_id } = this.props
        this.props.editFood( food_id, name, p, c, f, fib, img )
        this.props.toggleFoodEditorModal(false)
    }
    
    
    render() {
        const { name, p, c, f, fib, img } = this.props
        return(
            <Dialog open={this.props.foodEditorDialogOpen} className="food-editor">
                <h1 style={{fontSize: "2em"}}>Food Editor</h1>
                <section style={{display: "flex", justifyContent: "space-around", width: "100%"}}>
                    <TextField floatingLabelText="Name" className="food-name" value={name} onChange={(e) => this.props.updateNameIn(e.target.value)} hintText="food name"/>
                    <TextField floatingLabelText="Protein" className="food-p" type="number" min="0" max="1000" value={p} onChange={(e) => this.props.updatePIn(e.target.value)}/>
                </section>
                <section style={{display: "flex", justifyContent: "space-around", width: "100%"}}>
                    <TextField floatingLabelText="Carbs" className="food-c" type="number" min="0" max="1000" value={c} onChange={(e) => this.props.updateCIn(e.target.value)}/>
                    <TextField floatingLabelText="Fat" className="food-f" type="number" min="0" max="1000" value={f} onChange={(e) => this.props.updateFIn(e.target.value)}/>
                </section>
                <section style={{display: "flex", justifyContent: "space-around", width: "100%"}}>
                    <TextField floatingLabelText="Fiber" className="food-fib" type="number" min="0" max="1000" value={fib} onChange={(e) => this.props.updateFibIn(e.target.value)}/>
                    <TextField name="img-url" className="food-img-url" value={img} onChange={(e) => this.props.updateImgIn(e.target.value)} floatingLabelText="Image URL" hintText="link to image"/>
                </section>
                <section style={{display: "flex", justifyContent: "space-around", width: "100%", margin: "0 auto"}}>
                    <img style={{maxWidth: "250px", maxHeight: "250px", borderRadius: "3px"}} src={img} alt={name}/>
                    <section style={{display: "flex", flexDirection: "column", justifyContent: "center", width: "100%"}}>
                        <RaisedButton style={{width: "50%"}} secondary={true} onClick={this.sendEdits} label="Update" />
                        <FlatButton style={{width: "50%"}} onClick={() => this.props.toggleFoodEditorModal(false)} label="close" />
                    </section>
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
        food_id: state.foods.food_id,
        fib: state.foods.fib,
        img: state.foods.img,
        meal: state.foods.meal,
        foodEditorDialogOpen: state.foods.foodEditorDialogOpen
    }
}

export default connect(mapStateToProps, { updateNameIn, updatePIn, updateCIn, updateFIn, updateFibIn, updateImgIn, toggleFoodEditorModal, editFood })(FoodEditor)