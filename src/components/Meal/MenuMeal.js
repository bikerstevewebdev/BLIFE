import React, { Component } from 'react'
import { getMealById, removeMealFromMenu } from '../../ducks/foodReducer'
// import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'

class MenuMeal extends Component{
    constructor(props) {
        super(props)
        this.state = {
            needsEdit: false
        }
        this.deleteMeal = this.deleteMeal.bind(this)
    }

    deleteMeal() {
        const { menu_meals_id, menu_id, total_p, total_c, total_f, total_fib } = this.props
        this.props.removeMealFromMenu(menu_meals_id, menu_id, total_p, total_c, total_f, total_fib)
    }

    
    render() {
        const { menu_id, menu_meals_id, meal_id, title, total_p, total_c, total_f, total_fib, img_url } = this.props
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
                    state: { menu_id, meal_id, menu_meals_id }
                }}><RaisedButton secondary={true} onClick={() => this.props.getMealById(meal_id)}>Edit Meal</RaisedButton></Link>
                <RaisedButton secondary={true} onClick={this.deleteMeal}>Remove From Menu</RaisedButton>
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