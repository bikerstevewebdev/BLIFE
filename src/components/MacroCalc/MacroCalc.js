import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { calculate } from '../../ducks/macroCalcReducer'
import { getUserData } from '../../ducks/userReducer'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';



class MacroCalc extends Component{
    constructor() {
        super()
        this.state = {
            height: 0,
            age: 0,
            weight: 0,
            bodyfat: 0,
            tenacity: '',
            goal: '',
            activity: '',
            gender: '',
            isCalculating: true
        }
        this.calculate = this.calculate.bind(this)
        this.updateInputs = this.updateInputs.bind(this)
    }
    componentDidMount() {
        if(!this.props.userData){
            this.props.getUserData()
        }
        console.log('MacroCalc props', this.props)
    }
    updateInputs(val, target){
        switch(target){
            case 'height':
            this.setState({ height: val })
                break
            case 'weight':
            this.setState({ weight: val })
                break
            case 'age':
            this.setState({ age: val })
                break
            case 'bodyfat':
            this.setState({ bodyfat: val })
                break
            case 'activity':
            this.setState({ activity: val })
                break
            case 'goal':
            this.setState({ goal: val })
                break
            case 'tenacity':
            this.setState({ tenacity: val })
                break
            case 'gender':
            this.setState({ gender: val })
                break
            default:
                return null
        }
    }
    calculate(e) {
        e.preventDefault()
        const { height, age, gender, weight, bodyfat, activity, tenacity, goal, } = this.state        
        this.props.calculate(height, age, weight, bodyfat, activity, gender, tenacity, goal)
        this.setState({
            isCalculating: false
        })
    }
    render() {
        const { height, age, weight, bodyfat, tenacity, goal, activity, gender } = this.state        
        // const { current_height, current_weight, current_bf } = user        
        const selectWidth = {width: "450px"}
        const compStyles = {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            // gridTemplateRows: "1fr 1fr",
            width: "100%",
            padding: "5%"

        }
        return(
            <form onSubmit={this.calculate} style={{alignItems: "center", height: "90vh", width: "100%", ...compStyles}} className="comp macro-calc">
                {/* <section className="inputs"> */}
                    <section style={{display: "grid", gridTemplateRows: "repeat(75px)", justifyContent: "center"}}>
                        <p>Age</p>
                        <TextField floatingLabelText="Years" type="number" step="1" min="8" max="120" className="macro-input" onChange={(e) => this.updateInputs(e.target.value, 'age')} value={age} />
                        <p>Height</p>
                        <TextField type="number"  step="1" min="36" max="100" className="macro-input" onChange={(e) => this.updateInputs(e.target.value, 'height')} floatingLabelText="Total Inches" value={height} />
                        <p>Weight</p>
                        <TextField type="number"  step="0.1" min="50" max="600" className="macro-input" onChange={(e) => this.updateInputs(e.target.value, 'weight')} floatingLabelText="pounds" value={weight} />
                        <p>Bodyfat</p>
                        <TextField type="number"  step="0.1" min="2" max="90" className="macro-input" onChange={(e) => this.updateInputs(e.target.value, 'bodyfat')} floatingLabelText="% as Number" value={bodyfat} />
                    </section>
                    <section style={{display: "grid", gridTemplateRows: "repeat(75px)", justifyContent: "start"}}>
                        <p>Activity Level</p>
                        <SelectField style={{height: "72px", ...selectWidth}} value={activity} defaultValue="Low (sedentary, low activity job, exercise 1-2 times/week)"className="macro-input" onChange={(e) => this.updateInputs(e.target.value, 'activity')}>
                            <MenuItem  value="low">Low (sedentary, low activity job, exercise 1-2 times/week)</MenuItem>
                            <MenuItem value="moderate">Moderate (lightly active, some movement at job, exercise 2-3 times/week)</MenuItem>
                            <MenuItem value="active">Active (above average activity, frequent moving at job, exercise 3-5 times/week)</MenuItem>
                            <MenuItem value="hi-active">Highly Active (athletic or highly active job, exercise 5-7 times/week)</MenuItem>
                            <MenuItem value="extreme">Extremely Active (athletic and highly active job, exercise 6-7 times/week)</MenuItem>
                        </SelectField>
                        <p>Goal</p>
                        <SelectField style={{height: "72px", ...selectWidth}} defaultValue="maintain" value={goal} className="macro-input" onChange={(e) => this.updateInputs(e.target.value, 'goal')}>
                            <MenuItem value="gain">Gain Weight</MenuItem>
                            <MenuItem value="lose">Lose Weight</MenuItem>
                            <MenuItem value="maintain">Maintain Current Weight</MenuItem>
                        </SelectField>
                        <p>Goal Tenacity</p>
                        <SelectField style={{height: "72px", ...selectWidth}} defaultValue="steady" value={tenacity} className="macro-input" onChange={(e) => this.updateInputs(e.target.value, 'tenacity')}>
                            <MenuItem value="intense">Intense (gain/lose 2+ pounds/week)</MenuItem>
                            <MenuItem  value="steady">Steady (gain/lose 1 pounds/week)</MenuItem>
                            <MenuItem value="slow">{"Slow (gain/lose < 1 pound/week)"}</MenuItem>
                        </SelectField>
                        <p>Gender</p>
                        <SelectField value={gender} style={{height: "72px", ...selectWidth}} defaultValue="m" className="macro-input" onChange={(e) => this.updateInputs(e.target.value, 'gender')}>
                            <MenuItem  value="m">Male</MenuItem>
                            <MenuItem value="f">Female</MenuItem>
                        </SelectField>
                    </section>
                {/* </section> */}
                <div style={{gridColumn: "1/3", display: "flex", justifyContent: "center"}}>
                
                <RaisedButton primary={true}  className="calc-btn" onClick={this.calculate} >Calculate</RaisedButton>
                </div>
                {this.state.isCalculating
                ?
                null
                :
                <Redirect to='/profile' />
                }
            </form>
        )
    }
}

function MapStateToProps(state) {
    return {
        user: state.users.user,
        user_id: state.users.userData.auth_id
    }
}

export default connect(MapStateToProps, { getUserData, calculate })(MacroCalc)



