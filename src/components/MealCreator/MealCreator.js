import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMeal } from '../../ducks/foodReducer'
import { Redirect } from 'react-router-dom'

class MealCreator extends Component{
    constructor() {
        super()
        this.state = {
            titleInput: '',
            imgInput: '',
            creating: true
        }
        this.updateimgInput = this.updateimgInput.bind(this)
        this.updateMealTitle = this.updateMealTitle.bind(this)
        this.sendMealUp = this.sendMealUp.bind(this)
    }

    sendMealUp() {
        const { mealTitle, imgInput } = this.state        
        this.props.createMeal(mealTitle, imgInput)
        this.setState({
            titleInput: '',
            imgInput: '',
            creating: false
        })
    }

    updateimgInput(val) {
        this.setState({
            imgInput: val
        })
    }

    updateMealTitle(val) {
        this.setState({
            mealTitle: val
        })
    }
    
    render() {
        const { mealTitle, imgInput } = this.state
        return(
            <section className="meal-creator" >
                <p>Title of the Meal:</p>
                <input value={mealTitle} onChange={(e) => this.updateMealTitle(e.target.value)} />
                <p>Meal Image Url:</p>
                <input value={imgInput} onChange={(e) => this.updateimgInput(e.target.value)} />
                <button onClick={() => this.sendMealUp()}>Create Meal!</button>
                {
                    this.state.creating
                    ?
                    null
                    :
                    <Redirect to='/meal/0' />
                }
            </section>
        )
    }
}

// function mapStateToProps(state){
//     return {
//         mealTitle: 
//     }
// }

export default connect(null, { createMeal })(MealCreator)