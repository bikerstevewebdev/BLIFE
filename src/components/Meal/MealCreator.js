import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMeal, toggleMealModal } from '../../ducks/foodReducer'
import { Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class MealCreator extends Component{
    constructor() {
        super()
        this.state = {
            mealTitle: '',
            imgInput: '',
            creating: true
        }
        this.updateimgInput = this.updateimgInput.bind(this)
        this.updateMealTitle = this.updateMealTitle.bind(this)
        this.sendMealUp = this.sendMealUp.bind(this)
    }

    componentDidMount() {
        if(this.props.fromRecipe){
            this.setState({
                mealTitle: this.props.rName,
                imgInput: this.props.rImg
            })
        }
    }

    
    sendMealUp() {
        const { mealTitle, imgInput } = this.state        
        this.props.createMeal(mealTitle, imgInput)
        if(this.props.fromRecipe){
            this.props.changeCreating(false)
        }
        this.setState({
            mealTitle: '',
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
            <Dialog open={this.props.mealDialogOpen} className="comp meal-creator" >
                <p>Title of the Meal:</p>
                <input value={mealTitle} onChange={(e) => this.updateMealTitle(e.target.value)} />
                <p>Meal Image Url:</p>
                <input value={imgInput} onChange={(e) => this.updateimgInput(e.target.value)} />
                <RaisedButton primary={true} onClick={() => this.sendMealUp()}>Create Meal!</RaisedButton>
                {
                    this.state.creating
                    // this.props.fromRecipe && this.state.creating
                    ?
                    null
                    :
                    <Redirect to={`/meal/${mealTitle}`} />
                }
                <FlatButton onClick={() => this.props.toggleMealModal(false)} label="close" />
            </Dialog>
        )
    }
}

function mapStateToProps(state){
    return {
        mealDialogOpen: state.foods.mealDialogOpen
    }
}

export default connect(mapStateToProps, { createMeal, toggleMealModal })(MealCreator)