import React, { Component } from 'react'
import { getMealById, removeMealFromMenu } from '../../ducks/foodReducer'
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

class MenuMeal extends Component{
    constructor(props) {
        super(props)
        this.state = {
            needsEdit: false
        }
        this.editFood = this.editFood.bind(this)
        this.deleteMeal = this.deleteMeal.bind(this)
    }

    // editFood() {
    //     this.props.getFoodById(food_id)
    //     this.setState({
    //         needsEdit: true
    //     })
    // }

    deleteMeal() {
        const { menu_meals_id, menu_id, total_p, total_c, total_f, total_fib } = this.props
        // let pDif = mp - total_p,
        //     cDif = mc - total_c,
        //     fDif = mf - total_f,
        //     fibDif = mfib - total_fib
        this.props.removeMealFromMenu(menu_meals_id, menu_id, total_p, total_c, total_f, total_fib)
    }

    
    render() {
        const { meal_id, title, total_p, total_c, total_f, total_fib, img_url } = this.props
        return(
            <section>
                <p>Title: {title}</p>
                <p>Protein: {total_p}</p>
                <p>Carbs: {total_c}</p>
                <p>Fat: {total_f}</p>
                <p>Fiber: {total_fib}</p>
                {img_url ? <img src={img_url} alt={title} /> : null}
                <Link to={{
                    pathname: `/meal/menu`,
                    state: { meal_id, title, total_p, total_c, total_f, total_fib, img_url }
                }}><button onClick={() => this.props.getMealById(meal_id)}>Edit Meal</button></Link>
                <button style={{backgroundColor: "red"}} onClick={this.deleteMeal}>Remove From Menu</button>
                {/* {
                    this.state.needsEdit
                    ?
                    <Redirect to={`/food/meal`} />
                    :
                    null
                } */}
            </section>
        )
    }
}
export default connect(null, { getMealById, removeMealFromMenu })(MenuMeal)