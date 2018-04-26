import React, { Component } from 'react'
import { updateNameIn, updatePIn, updateCIn, updateFIn, updateFibIn, updateImgIn, addFoodToDB } from '../../ducks/foodReducer'
import { connect } from 'react-redux';

class Food extends Component{
    render() {
        const { name, p, c, f, fib, img } = this.props
        return(
            <section>
                <p>Add a Food to the BLIFE Database</p>
                <p>Name:</p>
                <input className="food-name" value={name} onChange={(e) => this.props.updateNameIn(e.target.value)} placeholder="food name"/>
                <p>Protein:</p>
                <input className="food-p" type="number" min="0" max="1000" value={p} onChange={(e) => this.props.updatePIn(e.target.value)} placeholder="number in grams"/>
                <p>Carbs:</p>
                <input className="food-c" type="number" min="0" max="1000" value={c} onChange={(e) => this.props.updateCIn(e.target.value)} placeholder="number in grams"/>
                <p>Fat:</p>
                <input className="food-f" type="number" min="0" max="1000" value={f} onChange={(e) => this.props.updateFIn(e.target.value)} placeholder="number in grams"/>
                <p>Fiber:</p>
                <input className="food-fib" type="number" min="0" max="1000" value={fib} onChange={(e) => this.props.updateFibIn(e.target.value)} placeholder="number in grams"/>
                <p>Image URL:</p>
                <input className="food-img-url" value={img} onChange={(e) => this.props.updateImgIn(e.target.value)} placeholder="link to image"/>
                <button onClick={() => this.props.addFoodToDB(name, p, c, f, fib, img)}>Add Food</button>
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
        img: state.foods.img
    }
}

export default connect(mapStateToProps, { updateNameIn, updatePIn, updateCIn, updateFIn, updateFibIn, updateImgIn, addFoodToDB })(Food)