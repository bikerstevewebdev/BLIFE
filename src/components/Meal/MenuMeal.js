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
            <Card key={meal_id} containerStyle={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between"}} style={{backgroundColor: "#279815", maxWidth: "225px", maxHeight: "20em", width: "100%", borderRadius: "3px"}}>
                <CardMedia >
                    {img_url ? <img style={{height: "10em", borderRadius: "3px 3px 0 0"}}  src={img_url}  alt={title} /> : null}
                </CardMedia>
                <CardTitle style={{height: "3.75em"}} titleStyle={{color: "#fff", lineHeight: "1.08em", fontSize: "1.25em"}} title={title} />
                <CardText style={{height: "3.75em", padding: "0 0.25em", display: "flex", color: "ivory"}} >
                            <section style={{padding: "0 0.25em", display: "flex", flexWrap: "wrap"}}>
                                <p style={{padding: "5px"}}>Pro: <span style={{color: "#fff"}}>{total_p}g</span></p>
                                <p style={{padding: "5px"}}>Carb: <span style={{color: "#fff"}}>{total_c}g</span></p>
                            </section>
                            <section style={{padding: "0 0.25em", display: "flex",flexWrap: "wrap"}}>
                                <p style={{padding: "5px"}}>Fat: <span style={{color: "#fff"}}>{total_f}g</span></p>
                                <p style={{padding: "5px"}}>Fiber: <span style={{color: "#fff"}}>{total_fib}g</span></p>
                            </section>
                </CardText>
                <CardActions style={{display: "flex"}}>
                    <Link to={{
                        pathname: `/meal/menu`,
                        state: { menu_id, meal_id, menu_meals_id }
                        }}><FlatButton labelStyle={{color: "white"}} onClick={() => this.props.getMealById(meal_id)} label="Edit Meal" /></Link>
                    <FlatButton onClick={this.deleteMeal} label="Remove" />
                </CardActions>
            </Card>
        )
    }
}
export default connect(null, { getMealById, removeMealFromMenu })(MenuMeal)