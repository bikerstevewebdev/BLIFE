import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMeasurement, toggleMotivationalModal } from '../../ducks/userReducer'
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
        }else{
            this.props.history.push('/profile')
        }
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
        const smileStyles = { height: "1.5em", width: "1.5em", backgroundColor: "black", borderRadius: "50%" }
        const { waistIn, neckIn, chestIn, heightIn, weightIn, bfIn, dateIn, happinessMeter } = this.state
        const happinessIcon = happinessMeter < 3 ? <SuperSad style={{color: "red"}}/> : happinessMeter < 5 ? <Sad style={{...smileStyles, color: "#d2d21a"}}/> : happinessMeter < 7 ? <Neutral style={{...smileStyles, color: "white"}}/> : happinessMeter < 9 ? <Happy style={{...smileStyles, color: "blue", backgroundColor: "#00000045"}}/> : <SuperHappy style={{color: "green"}}/>
        const mesCompStyles = {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            padding: "5%",
            boxShadow: "rgb(29, 39, 41) 0px 2px 1px 1px",
            borderRadius: "3px",
            width: "auto",
            backgroundColor: "rgb(236, 234, 255)",
            // backgroundImage: "linear-gradient(to top, #074b19, #0b641c, #177e1b, #279815, #3bb300)",

            gridGap: "1.5em"
        }
        const leftInputs = {
            justifySelf: "end"
        }
        return(
                <form style={{...mesCompStyles}} className="comp measurements-form" >
                    <h1 style={{gridColumn: "1/3", fontSize: "2.5em"}}>Measurements</h1>
                    <TextField name="weight" style={{...leftInputs}} type="number" floatingLabelText={`Weight: (in pounds)`} min="50" max="1000" value={weightIn} onChange={(e) => this.updateWeightIn(e.target.value)} />
                    <TextField name="height" type="number" floatingLabelText={`Height: (in inches)`} min="24" max="96" value={heightIn} onChange={(e) => this.updateHeightIn(e.target.value)} />
                    <TextField name="waist" style={{...leftInputs}} type="number" floatingLabelText={`Waist: (in inches)`} min="5" max="100" value={waistIn} onChange={(e) => this.updateWaistIn(e.target.value)} />
                    <TextField name="neck" type="number" floatingLabelText={`Neck Circumference: (in inches)`} min="5" max="40" value={neckIn} onChange={(e) => this.updateNeckIn(e.target.value)} />
                    <TextField name="chest" style={{...leftInputs}} floatingLabelText={`Chest: (in inches)`} type="number" min="5" max="100" value={chestIn} onChange={(e) => this.updateChestIn(e.target.value)} />
                    <TextField name="bodyfat" floatingLabelText={`Bodyfat: (% i.e. "11")`} type="number" min="2" max="90" value={bfIn} onChange={(e) => this.updateBfIn(e.target.value)} />
                    <DatePicker style={{...leftInputs, alignSelf: "center"}} autoOk onChange={this.updateDateIn} hintText="Date these measurements were taken" mode="landscape" />
                    <section style={{display: "flex", justifyContent: "space-around", flexDirection: "column"}}>
                        <p>Happiness Level at time of measurements</p>
                        <p>On a scale of 1-10 you selected {happinessIcon}({happinessMeter})</p>
                        <Slider
                            min={0}
                            max={10}
                            // sliderStyle={{marginBottom: "5rem"}}
                            style={{maxWidth: "17vw", maxHeight: "4.9em"}}
                            step={1}
                            value={happinessMeter}
                            onChange={this.handleSlider}
                            />
                    </section>
                    <section style={{gridColumn: "1/3", width: "100%", display: "flex", justifyContent: "center"}}>
                        <RaisedButton style={{width: "33%"}} value={dateIn} primary={true} onClick={this.sendUpdates}>Save your stats!</RaisedButton>
                    </section>
                </form>
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