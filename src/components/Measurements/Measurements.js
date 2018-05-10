import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMeasurement, toggleMotivationalModal } from '../../ducks/userReducer'
import { Redirect } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import Slider from 'material-ui/Slider'
import SuperHappy from 'material-ui/svg-icons/social/mood'
import Happy from 'material-ui/svg-icons/social/sentiment-satisfied'
import Neutral from 'material-ui/svg-icons/social/sentiment-neutral'
import Sad from 'material-ui/svg-icons/social/sentiment-dissatisfied'
import SuperSad from 'material-ui/svg-icons/social/sentiment-very-dissatisfied'


class Measurements extends Component{
    constructor(props) {
        super(props)
        this.state = {
            weightIn: props.user.current_weight || 0,
            heightIn: props.user.current_height || 0,
            waistIn: props.curr_mes.waist || 0,
            neckIn: props.curr_mes.neck || 0,
            chestIn: props.curr_mes.chest || 0,
            bfIn: props.user.current_bf || 0,
            dateIn: '',
            addingMes: true,
            happinessMeter: 5
        }
        this.updateWeightIn = this.updateWeightIn.bind(this)
        this.updateHeightIn = this.updateHeightIn.bind(this)
        this.updateChestIn = this.updateChestIn.bind(this)
        this.updateWaistIn = this.updateWaistIn.bind(this)
        this.updateNeckIn = this.updateNeckIn.bind(this)
        this.updateBfIn = this.updateBfIn.bind(this)
        this.sendUpdates = this.sendUpdates.bind(this)
        this.updateDateIn = this.updateDateIn.bind(this)
    }

    sendUpdates() {
        const { waistIn, neckIn, chestIn, heightIn, weightIn, bfIn, dateIn, happinessMeter } = this.state  
        this.props.addMeasurement(heightIn, weightIn, bfIn, waistIn, chestIn, neckIn, dateIn, happinessMeter)
        if(happinessMeter/1 < 7){
            this.props.toggleMotivationalModal(true)
        }
        this.setState({
            addingMes: false
        })
    }
// condense to one method when you have time: add a second param and check for === the desired state to update
    updateWeightIn(val) {
        this.setState({
            weightIn: val
        })
    }

    updateHeightIn(val) {
        this.setState({
            heightIn: val
        })
    }

    updateWaistIn(val) {
        this.setState({
            waistIn: val
        })
    }

    updateNeckIn(val) {
        this.setState({
            neckIn: val
        })
    }

    updateChestIn(val) {
        this.setState({
            chestIn: val
        })
    }

    updateBfIn(val) {
        this.setState({
            bfIn: val
        })
    }

    updateDateIn(e, date) {
        
        console.log("date arg: ", date.getTime())
        this.setState({
            dateIn: date
        })
    }

    handleSlider = (event, value) => {
        this.setState({happinessMeter: value});
      };
        
    render() {
        const { waistIn, neckIn, chestIn, heightIn, weightIn, bfIn, dateIn, happinessMeter } = this.state
        const happinessIcon = happinessMeter < 3 ? <SuperSad /> : happinessMeter < 5 ? <Sad /> : happinessMeter < 7 ? <Neutral /> : happinessMeter < 9 ? <Happy /> : <SuperHappy />
        return(
            <section className="comp measurements-form" >
                <p>Weight: (in pounds)</p>
                <TextField name="weight" type="number" min="50" max="1000" value={weightIn} onChange={(e) => this.updateWeightIn(e.target.value)} />
                <p>Height: (in inches)</p>
                <TextField name="height" type="number" min="24" max="96" value={heightIn} onChange={(e) => this.updateHeightIn(e.target.value)} />
                <p>Waist: (in inches)</p>
                <TextField name="waist" type="number" min="5" max="100" value={waistIn} onChange={(e) => this.updateWaistIn(e.target.value)} />
                <p>Neck: (in inches)</p>
                <TextField name="neck" type="number" min="5" max="40" value={neckIn} onChange={(e) => this.updateNeckIn(e.target.value)} />
                <p>Chest: (in inches)</p>
                <TextField name="chest" type="number" min="5" max="100" value={chestIn} onChange={(e) => this.updateChestIn(e.target.value)} />
                <p>Bodyfat: (enter in percent as a number, i.e. "11" for 11 percent, not "0.11")</p>
                <TextField name="bodyfat" type="number" min="2" max="90" value={bfIn} onChange={(e) => this.updateBfIn(e.target.value)} />
                <DatePicker onChange={this.updateDateIn} hintText="Date these measurements were taken" mode="landscape" />
                <section>
                    <p>Select your state of happiness at the time of these measurements</p>
                    <p>On a scale o 1-10, you have selected {happinessIcon}({happinessMeter}).</p>
                    <Slider
                        min={0}
                        max={10}
                        step={1}
                        value={happinessMeter}
                        onChange={this.handleSlider}
                    />
                </section>
                <RaisedButton value={dateIn} primary={true} onClick={this.sendUpdates}>Save your stats!</RaisedButton>
                {
                    !this.state.addingMes && this.props.location.pathname === '/measurements'
                    ?
                    <Redirect to={`/profile`} />
                    :
                    null
                }
            </section>
        )
    }
}

function mapStateToProps(state){
    const { userData, user, curr_mes } = state.users
    return {
        userData,
        user,
        curr_mes
        }
}

export default connect(mapStateToProps, { addMeasurement, toggleMotivationalModal })(Measurements)