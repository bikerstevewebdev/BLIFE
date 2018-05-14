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
    constructor(props) {
        super(props)
        this.state = {
            height: props.user.current_height,
            age: 0,
            weight: props.user.current_weight,
            bodyfat: props.user.current_bf,
            tenacity: 'steady',
            goal: 'maintain',
            activity: 'moderate',
            gender: 'm',
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
    
    updateInputs(event, index, val, target){
        console.log("event: ", event, "index: ", index, "val: ", val, "target: ", target)
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

    handleActivity(event, index, value){
        console.log(event, index, value)
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
        const { tenacity, goal, activity, gender } = this.state        
        // const { current_height, current_weight, current_bf } = user        
        const selectWidth = {width: "350px"}
        const compStyles = {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            // gridTemplateRows: "1fr 1fr",
            width: "100%",
            padding: "5%",
            boxShadow: "rgb(29, 39, 41) 0px 2px 1px 1px",
            borderRadius: "3px",
            width: "auto",
            backgroundColor: "rgb(236, 234, 255)",


        }
        return(
            <form onSubmit={this.calculate} style={{alignItems: "center", height: "60vh", width: "100%", ...compStyles}} className="comp macro-calc">
                {/* <section className="inputs"> */}
                    <section style={{display: "grid", gridTemplateRows: "repeat(75px)", justifyContent: "center"}}>
                        <TextField floatingLabelText="Age" hintText="Years" type="number" step="1" min="8" max="120" className="macro-input" onChange={(e) => this.updateInputs("filler", "more", e.target.value, 'age')}  />
                        <TextField type="number"  step="1" min="36" max="100" className="macro-input" onChange={(e) => this.updateInputs("filler", "more", e.target.value, 'height')} floatingLabelText="Height" hintText="Total Inches" />
                        <TextField type="number"  step="0.1" min="50" max="600" className="macro-input" onChange={(e) => this.updateInputs("filler", "more", e.target.value, 'weight')} hintText="Pounds" floatingLabelText="Weight" />
                        <TextField type="number" hintText="% as Number" step="0.1" min="2" max="90" className="macro-input" onChange={(e) => this.updateInputs("filler", "more", e.target.value, 'bodyfat')} floatingLabelText="Bodyfat" />
                    </section>
                    <section style={{display: "grid", gridTemplateRows: "repeat(75px)", justifyContent: "start"}}>
                        {/* <p>Activity Level</p> */}
                        <SelectField floatingLabelText="Activity Level" style={{height: "72px", ...selectWidth}} value={activity} className="macro-input" onChange={(e, i, v) => this.updateInputs(e, i, v, "activity")}>
                            <MenuItem value="low" primaryText="Low (sedentary, low activity job, exercise 1-2 times/week)"/>
                            <MenuItem value="moderate" primaryText="Moderate (lightly active, some movement at job, exercise 2-3 times/week)"/>
                            <MenuItem value="active" primaryText="Active (above average activity, frequent moving at job, exercise 3-5 times/week)"/>
                            <MenuItem value="hi-active" primaryText="Highly Active (athletic or highly active job, exercise 5-7 times/week)"/>
                            <MenuItem value="extreme" primaryText="Extremely Active (athletic and highly active job, exercise 6-7 times/week)"/>
                        </SelectField>
                        <SelectField floatingLabelText="Goal" style={{height: "72px", ...selectWidth}} value={goal} className="macro-input" onChange={(e, i, v) => this.updateInputs(e, i, v, 'goal')}>
                            <MenuItem primaryText="Gain Weight" value="gain"/>
                            <MenuItem primaryText="Lose Weight" value="lose"/>
                            <MenuItem primaryText="Maintain Current Weight" value="maintain"/>
                        </SelectField>
                        <SelectField disabled={this.state.goal === 'maintain'} floatingLabelText="Goal Tenacity" style={{height: "72px", ...selectWidth}} value={tenacity} className="macro-input" onChange={(e, i, v) => this.updateInputs(e, i, v, 'tenacity')}>
                            <MenuItem primaryText="Intense (gain/lose 2+ pounds/week)" value="intense"/>
                            <MenuItem primaryText="Steady (gain/lose 1 pounds/week)" value="steady"/>
                            <MenuItem primaryText="Slow (gain/lose < 1 pound/week)" value="slow"/>
                        </SelectField>
                        <SelectField floatingLabelText="Gender" value={gender} style={{height: "72px", ...selectWidth}} className="macro-input" onChange={(e, i, v) => this.updateInputs(e, i, v, 'gender')}>
                            <MenuItem primaryText="Male" value="m"/>
                            <MenuItem primaryText="Female" value="f"/>
                        </SelectField>
                    </section>
                {/* </section> */}
                <div style={{padding: "1.5em", gridColumn: "1/3", display: "flex", justifyContent: "center"}}>
                    <RaisedButton primary={true} style={{width: "33%"}} className="calc-btn" onClick={this.calculate} >Calculate</RaisedButton>
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



