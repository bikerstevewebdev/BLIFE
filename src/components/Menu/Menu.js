import React, { Component } from 'react'
import MenuMeal from '../Meal/MenuMeal'
import { connect } from 'react-redux'
import { searchMeals, addMealToMenu, getMenuById, clearMealSearch } from '../../ducks/foodReducer'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import { TextField } from 'material-ui';

class Menu extends Component{
    constructor() {
        super()
        this.state = {
            searchIn: ''
        }
        this.updateSearchIn = this.updateSearchIn.bind(this)
        this.endSearch = this.endSearch.bind(this)
        this.addThisMeal = this.addThisMeal.bind(this)
    }
    
    componentDidMount() {
        console.log(this.props)
        const { from } = this.props.match.params
        if(!isNaN(from) && from > 0){
            this.props.getMenuById(from)
        } 
    }

    componentDidUpdate(){
        console.log('Menu updated props:',this.props)
    }

    addThisMeal(menu_id, meal_id, p, c, f, fib){
        this.props.addMealToMenu(menu_id, meal_id, p, c, f, fib)
        this.endSearch()
    }

    endSearch(){
        this.props.clearMealSearch()
        this.setState({
            searchIn: ''
        })
    }

    updateSearchIn(val){
        this.setState({
            searchIn: val
        })
    }
    
    render() {
        const { menuMeals, menu, mealSearchResults } = this.props,
              { menu_id, title, img, total_p, total_c, total_f, total_fib } = menu,
              { searchIn } = this.state,
              mealResults = mealSearchResults.map(_meal => {
                const { meal_id, total_p, total_c, total_f, total_fib, title, img_url } = _meal
                return (
                    <Card key={meal_id} containerStyle={{height: "100%"}} style={{backgroundColor: "#fff", maxWidth: "350px", height: "23em", width: "100%", display: "flex", flexDirection: "column"}}>
                        <CardMedia style={{overflow: "hidden", height: "12.5em"}} >
                        <img src={img_url} alt={title} />
                        </CardMedia>
                        <CardTitle style={{height: "3.75em", padding: "0 0.5em"}}  title={title} />
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
                        <CardActions style={{padding: "0 0.5em"}} >
                            <FlatButton fullWidth secondary={true} onClick={() => this.addThisMeal(menu_id, meal_id, total_p, total_c, total_f, total_fib)} label={`Add to ${this.props.menu.title}`} />
                        </CardActions>
                    </Card>
                ) }),
              menuMealsList = menuMeals.map(meal => {
            const { meal_id, title, total_p, total_c, total_f, total_fib, img_url, menu_meals_id } = meal
            return <MenuMeal prepareToEdit={this.prepareToEdit} key={menu_meals_id} menu_id={menu_id} meal_id={meal_id} menu_meals_id={menu_meals_id} title={title} total_p={total_p} total_c={total_c} total_f={total_f} total_fib={total_fib} img_url={img_url} />            
        })
        const layoutStyles = {
            height: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            // gridAutoRows: "150px",
            boxShadow: "rgb(37, 48, 51) 0px 2px 1px 1px",
            borderRadius: "3px",
            backgroundColor: "#fff",
            padding: "2em",
            gridGap: "0.75em"
        }
        const macroStyles = {
            borderRadius: "3px",
            padding: "0.25em",
            gridColumn: "1/3",
            color: "#7b2118",
            maxHeight: "250px",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "space-around",
            display: "flex",
            boxShadow: "rgb(27, 32, 33) 1px 1px 2px 1px",
            flexDirection: "column",
            height: "100%",
            padding: "10% 0",
            
            backgroundImage: "linear-gradient(to top, #b3d8b7, #c0e2c3, #cdebcf, #dbf5db, #e8ffe8)"
        }
        const menuSearchStyle = {
            width: "100%",
            display: "grid",
            boxShadow: "rgba(10, 6, 15, 0.59) 0px 1px 6px 3px",
            backgroundColor: "#c2d8c4",
            borderRadius: "3px",
            gridTemplateRows: "auto",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            justifyContent: "center",
            gridGap: "0.75em",
            gridColumn: "3/5",
            padding: "0.5em",
            alignItems: "center"
        }
        return(
            <section style={{...layoutStyles}} className="menu">
                <h2 style={{fontSize: "4em", gridArea: "1/1/2/3"}}>{title}</h2>
                <section style={{...macroStyles}} >
                    <h3>Total Macros for {title}:</h3>
                    <p>Protein: {total_p}</p>
                    <p>Carbs: {total_c}</p>
                    <p>Fat: {total_f}</p>
                    <p>Fiber: {total_fib}</p>
                </section>
                <section style={{display: "flex", flexDirection: "column", gridArea: "1/3/3/5"}}>
                    {img ? <img style={{maxWidth: "500px", boxShadow: "rgb(37, 48, 51) 0px 1px 1px", borderRadius: "5px"}} src={img} alt={title} /> : null}
                </section>
                <h3 style={{fontSize: "2.5em", alignSelf: "end", gridArea: "3/1/4/5"}}>Meals in this menu:</h3>
                {menuMealsList}
                <section style={{...menuSearchStyle, gridColumn: "1/5"}}>
                    <TextField style={{gridColumn: "1/3"}} value={searchIn} floatingLabelText="Search Meals by Name" onChange={e => this.updateSearchIn(e.target.value)}/>
                    <RaisedButton style={{gridColumn: "3/5"}} secondary={true} onClick={() => this.props.searchMeals(searchIn)}>Search for your meal!</RaisedButton>
                    {mealResults}
                </section>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        menuMeals: state.foods.menuMeals,
        mealSearchResults: state.foods.mealSearchResults,
        menu: state.foods.menu
    }
}

export default connect(mapStateToProps, { searchMeals, addMealToMenu, getMenuById, clearMealSearch })(Menu)