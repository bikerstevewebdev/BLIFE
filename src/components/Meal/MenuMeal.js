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
            <Card key={meal_id} containerStyle={{height: "100%"}} style={{maxWidth: "350px", maxHeight: "25em", width: "100%", display: "flex", flexDirection: "column"}}>
                <CardMedia >
                    {img_url ? <img style={{maxHeight: "12em"}}  src={img_url}  alt={title} /> : null}
                </CardMedia>
                <CardTitle style={{height: "5.75em"}} title={title} />
                <CardText style={{height: "3.75em", padding: "0 0.5em", display: "flex"}} >
                            <section style={{padding: "0 0.5em", display: "flex"}}>
                                <p style={{padding: "5px"}}>Protein: {total_p}</p>
                                <p style={{padding: "5px"}}>Carb: {total_c}</p>
                            </section>
                            <section style={{padding: "0 0.5em", display: "flex"}}>
                                <p style={{padding: "5px"}}>Fat: {total_f}</p>
                                <p style={{padding: "5px"}}>Fiber: {total_fib}</p>
                            </section>
                </CardText>
                <CardActions>
                    <Link to={{
                        pathname: `/meal/menu`,
                        state: { menu_id, meal_id, menu_meals_id }
                        }}><FlatButton onClick={() => this.props.getMealById(meal_id)} label="Edit Meal" /></Link>
                    <FlatButton onClick={this.deleteMeal} label="Remove" />
                </CardActions>
            </Card>
        )
    }
}
export default connect(null, { getMealById, removeMealFromMenu })(MenuMeal)