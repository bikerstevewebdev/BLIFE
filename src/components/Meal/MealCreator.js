import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMeal, toggleMealModal } from '../../ducks/foodReducer'
import { Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField, IconButton } from 'material-ui';
import CloseBtn from 'material-ui/svg-icons/navigation/close'

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
        // if(this.props.fromRecipe){
        //     this.props.changeCreating(false)
        // }
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
        const mainStyles ={
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            gridGap: "0.75em",
            alignItems: "center"
        }
        const contentWidth = imgInput.length ? "48%" : "18%"
        return(
            <Dialog contentStyle={{width: contentWidth}} bodyStyle={{...mainStyles}} open={this.props.mealDialogOpen} className="comp meal-creator" >
                <h1 style={{gridArea: "1/1/2/2", fontSize: "2em", borderRadius: "5px"}}>Creat a Meal</h1>
                <TextField style={{gridArea: "2/1/3/2"}} floatingLabelText="Title of the Meal:" value={mealTitle} onChange={(e) => this.updateMealTitle(e.target.value)} />
                <TextField style={{gridArea: "3/1/4/2"}} floatingLabelText="Meal Image Url:" value={imgInput} onChange={(e) => this.updateimgInput(e.target.value)} />
                <img style={{gridArea: "2/2/5/3", maxWidth: "500px"}} src={imgInput} alt={mealTitle}/>
                <RaisedButton style={{gridArea: "4/1/5/2"}} primary={true} onClick={() => this.sendMealUp()} label="Create Meal!" />
                {
                    this.state.creating
                    // this.props.fromRecipe && this.state.creating
                    ?
                    null
                    :
                    <Redirect to={`/meal/${mealTitle}`} />
                }
                <IconButton className="close-btn" style={{gridArea: "5/1/6/2"}} onClick={() => this.props.toggleMealModal(false)} label="close"><CloseBtn/></IconButton>
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