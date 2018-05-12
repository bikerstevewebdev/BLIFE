import React, { Component } from 'react'
import { getMealById, removeMealFromMenu } from '../../ducks/foodReducer'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'


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
            <Card style={{maxWidth: "350px", width: "100%"}} >
                <CardMedia  >
                    {img_url ? <img src={img_url} alt={title} /> : null}
                </CardMedia>
                <CardTitle title={title} />
                <CardText>
                        <p>Protein: {total_p}</p>
                        <p>Carbs: {total_c}</p>
                        <p>Fat: {total_f}</p>
                        <p>Fiber: {total_fib}</p>
                </CardText>
                <CardActions>
                    <Link to={{
                        pathname: `/meal/menu`,
                        state: { menu_id, meal_id, menu_meals_id }
                        }}><FlatButton onClick={() => this.props.getMealById(meal_id)} label="Edit Meal" /></Link>
                    <FlatButton onClick={this.deleteMeal} label="Remove From Menu" />
                </CardActions>
            </Card>
        )
    }
}
export default connect(null, { getMealById, removeMealFromMenu })(MenuMeal)