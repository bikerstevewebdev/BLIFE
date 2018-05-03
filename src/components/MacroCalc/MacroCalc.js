import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { calculate, updateActivity, updateAge, updateBodyfat, updateGoal, updateGender, updateHeight, updateTenacity, updateWeight } from '../../ducks/macroCalcReducer'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';



class MacroCalc extends Component{
    constructor() {
        super()
        this.state = {
            isCalculating: true
        }
        this.calculate = this.calculate.bind(this)
    }
    
    calculate() {
        const { height, age, gender, weight, bodyfat, activity, tenacity, goal, } = this.props        
        this.props.calculate(height, age, weight, bodyfat, activity, gender, tenacity, goal)
        this.setState({
            isCalculating: false
        })
    }
    render() {
        const { height, age, weight, bodyfat, tenacity, goal, activity, gender } = this.props        
        const selectWidth = {width: "450px"}
        return(
            <section className="comp macro-calc">
                <p>Age</p>
                <TextField floatingLabelText="Years" type="number" step="1" min="8" max="120" className="macro-input" onChange={(e) => this.props.updateAge(e.target.value)} value={age} />
                <p>Height</p>
                <TextField type="number" step="1" min="36" max="100" className="macro-input" onChange={(e) => this.props.updateHeight(e.target.value)} floatingLabelText="Total Inches" value={height} />
                <p>Weight</p>
                <TextField type="number" step="0.1" min="50" max="600" className="macro-input" onChange={(e) => this.props.updateWeight(e.target.value)} floatingLabelText="pounds" value={weight} />
                <p>Bodyfat</p>
                <TextField type="number" step="0.1" min="2" max="90" className="macro-input" onChange={(e) => this.props.updateBodyfat(e.target.value)} floatingLabelText="% as Number" value={bodyfat} />
                <p>Activity Level</p>
                <SelectField style={selectWidth} value={activity} defaultValue="low"className="macro-input" onChange={(e) => this.props.updateActivity(e.target.value)}>
                    <MenuItem  value="low">Low (sedentary, low activity job, exercise 1-2 times/week)</MenuItem>
                    <MenuItem value="moderate">Moderate (lightly active, some movement at job, exercise 2-3 times/week)</MenuItem>
                    <MenuItem value="active">Active (above average activity, frequent moving at job, exercise 3-5 times/week)</MenuItem>
                    <MenuItem value="hi-active">Highly Active (athletic or highly active job, exercise 5-7 times/week)</MenuItem>
                    <MenuItem value="extreme">Extremely Active (athletic and highly active job, exercise 6-7 times/week)</MenuItem>
                </SelectField>
                <p>Goal</p>
                <SelectField style={selectWidth} defaultValue="maintain" value={goal} className="macro-input" onChange={(e) => this.props.updateGoal(e.target.value)}>
                    <MenuItem value="gain">Gain Weight</MenuItem>
                    <MenuItem value="lose">Lose Weight</MenuItem>
                    <MenuItem value="maintain">Maintain Current Weight</MenuItem>
                </SelectField>
                <p>Goal Tenacity</p>
                <SelectField style={selectWidth} defaultValue="steady" value={tenacity} className="macro-input" onChange={(e) => this.props.updateTenacity(e.target.value)}>
                    <MenuItem value="intense">Intense (gain/lose 2+ pounds/week)</MenuItem>
                    <MenuItem  value="steady">Steady (gain/lose 1 pounds/week)</MenuItem>
                    <MenuItem value="slow">{"Slow (gain/lose < 1 pound/week)"}</MenuItem>
                </SelectField>
                <p>Gender</p>
                <SelectField value={gender} style={selectWidth} defaultValue="m" className="macro-input" onChange={(e) => this.props.updateGender(e.target.value)}>
                    <MenuItem  value="m">Male</MenuItem>
                    <MenuItem value="f">Female</MenuItem>
                </SelectField>
                <RaisedButton primary={true} style={{width: "200px"}} className="calc-btn" onClick={this.calculate} >Calculate</RaisedButton>
                {this.state.isCalculating
                ?
                null
                :
                <Redirect to='/profile' />
                }
            </section>
        )
    }
}

function MapStateToProps(state) {
    return {
        height: state.macros.height,
        age: state.macros.age,
        goal: state.macros.goal,
        tenacity: state.macros.tenacity,
        gender: state.macros.gender,
        bodyfat: state.macros.bodyfat,
        activity: state.macros.activity,
        weight: state.macros.weight,
        user_id: state.users.userData.auth_id
    }
}

export default connect(MapStateToProps, { calculate, updateActivity, updateAge, updateGender, updateBodyfat, updateGoal, updateHeight, updateTenacity, updateWeight })(MacroCalc)



