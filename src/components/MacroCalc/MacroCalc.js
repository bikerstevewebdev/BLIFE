import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { calculate, updateActivity, updateAge, updateBodyfat, updateGoal, updateGender, updateHeight, updateTenacity, updateWeight } from '../../ducks/macroCalcReducer'

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
        const { height, age, weight, bodyfat } = this.props        
        return(
            <section>
                <p>Age</p>
                <input type="number" step="1" min="8" max="120" className="macro-input" onChange={(e) => this.props.updateAge(e.target.value)} placeholder="Years" value={age} />
                <p>Height</p>
                <input type="number" step="1" min="36" max="100" className="macro-input" onChange={(e) => this.props.updateHeight(e.target.value)} placeholder="Total Inches" value={height} />
                <p>Weight</p>
                <input type="number" step="0.1" min="50" max="600" className="macro-input" onChange={(e) => this.props.updateWeight(e.target.value)} placeholder="pounds" value={weight} />
                <p>Bodyfat</p>
                <input type="number" step="0.1" min="2" max="90" className="macro-input" onChange={(e) => this.props.updateBodyfat(e.target.value)} placeholder="% as Number" value={bodyfat} />
                <p>Activity Level</p>
                <select className="macro-input" onChange={(e) => this.props.updateActivity(e.target.value)}>
                    <option selected value="low">Low (sedentary, low activity job, exercise 1-2 times/week)</option>
                    <option value="moderate">Moderate (lightly active, some movement at job, exercise 2-3 times/week)</option>
                    <option value="active">Active (above average activity, frequent moving at job, exercise 3-5 times/week)</option>
                    <option value="hi-active">Highly Active (athletic or highly active job, exercise 5-7 times/week)</option>
                    <option value="extreme">Extremely Active (athletic and highly active job, exercise 6-7 times/week)</option>
                </select>
                <p>Goal</p>
                <select className="macro-input" onChange={(e) => this.props.updateGoal(e.target.value)}>
                    <option value="gain">Gain Weight</option>
                    <option value="lose">Lose Weight</option>
                    <option selected value="maintain">Maintain Current Weight</option>
                </select>
                <p>Goal Tenacity</p>
                <select className="macro-input" onChange={(e) => this.props.updateTenacity(e.target.value)}>
                    <option value="intense">Intense (gain/lose 2+ pounds/week)</option>
                    <option selected value="steady">Steady (gain/lose 1 pounds/week)</option>
                    <option value="slow">{"Slow (gain/lose < 1 pound/week)"}</option>
                </select>
                <p>Gender</p>
                <select className="macro-input" onChange={(e) => this.props.updateGender(e.target.value)}>
                    <option selected value="m">Male</option>
                    <option value="f">Female</option>
                </select>
                <button className="calc-btn" onClick={this.calculate} >Calculate</button>
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



