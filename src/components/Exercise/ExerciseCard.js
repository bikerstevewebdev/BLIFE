import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateWorkoutEx, removeExFromWorkout } from '../../ducks/fitnessReducer'
import RaisedButton from 'material-ui/RaisedButton'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

class ExerciseCard extends Component{
    constructor(props) {
        super(props) 
        this.state = {
            repsIn: '',
            setsIn: '',
            restTimeIn: '',
            weight: '' ,
            notesIn: '',
            orderIn: '',
            addingNotes: false
        }
        this.updateRepsIn = this.updateRepsIn.bind(this)
        this.updateSetsIn = this.updateSetsIn.bind(this)
        this.updateRestTimeIn = this.updateRestTimeIn.bind(this)
        this.updateWeightIn = this.updateWeightIn.bind(this)
        this.updateOrderIn = this.updateOrderIn.bind(this)
        this.updateNotesIn = this.updateNotesIn.bind(this)
        this.sendUpdate = this.sendUpdate.bind(this)
        this.prepareToAddNotes = this.prepareToAddNotes.bind(this)
    }

    componentDidMount(){
        const { notes, reps, sets, rest_time, weight, ex_order } = this.props
        this.setState({
            repsIn: reps,
            setsIn: sets,
            restTimeIn: rest_time,
            weightIn: weight,
            notesIn: notes,
            orderIn: ex_order
        })
    }

    updateRepsIn(e) {
        this.setState({
            repsIn: e.target.value
        })
    }

    updateSetsIn(e) {
        this.setState({
            setsIn: e.target.value
        })
    }

    updateRestTimeIn(e) {
        this.setState({
            restTimeIn: e.target.value
        })
    }

    updateWeightIn(e) {
        this.setState({
            weightIn: e.target.value
        })
    }

    updateOrderIn(e) {
        this.setState({
            orderIn: e.target.value
        })
    }

    updateNotesIn(e) {
        this.setState({
            notesIn: e.target.value
        })
    }

    prepareToAddNotes() {
        this.setState({
            addingNotes: true
        })
    }

    sendUpdate(){
        const { repsIn, SetsIn, restTimeIn, weightIn, orderIn, notesIn } = this.state,
              { workout_ex_id, workout_id } = this.props
        this.props.updateWorkoutEx(workout_ex_id, workout_id, repsIn, SetsIn, restTimeIn, weightIn, orderIn, notesIn)
    }

    render() {
        const { repsIn, setsIn, restTimeIn, weightIn, notesIn, addingNotes } = this.state,
              { type, name, img, numExs, workout_ex_id, ex_id, workout_id, ex_order } = this.props
        return (
            <section style={{...this.props.style, width: "100%", display: "grid", gridTemplateColumns: "repeat(6, 1fr)"}} className="workout-ex">
                <section style={{gridColumn: "1/2", display: "flex", justifyContent: "space-around"}}>
                    <DropDownMenu defaultValue={ex_order} onChange={this.updateOrderIn}>
                        {numExs.map((v, i) => {
                            return <MenuItem key={ex_id + "-" + i} value={i+1}>{i+1}</MenuItem>
                        })}
                    </DropDownMenu>
                    <h3>{name}</h3>
                </section>
                <img style={{gridColumn: "2/3", width: "100%"}} src={img} alt={name} />
                <section style={{gridColumn: "3/4"}}>
                    <p>Reps:</p>
                    <TextField type="number" value={repsIn} onChange={this.updateRepsIn} />
                </section>
                <section style={{gridColumn: "4/5"}}>
                    <p>Sets:</p>
                    <TextField type="number" value={setsIn} onChange={this.updateSetsIn} />
                </section>
                {
                    type !== "Bodyweight"
                    ?
                    <section style={{gridColumn: "5/6"}} className="weight-input">
                        <p>Weight:</p>
                        <TextField type="number" value={weightIn} onChange={this.updateWeightIn} />
                    </section>
                    :
                    null
                }
                <section style={{gridColumn: "6/7"}}>
                    <p>Rest Time:</p>
                    <TextField type="number" value={restTimeIn} onChange={this.updateRestTimeIn} />
                    {
                        addingNotes
                        ?
                        <section className="notes-input">
                            <p>Notes:</p>
                            <TextField maxLength="500" value={notesIn} placeholder="Limit 500 characters" onChange={this.updateNotesIn} />
                        </section>
                        :
                        <RaisedButton secondary={true} onClick={this.prepareToAddNotes}>Add Notes?</RaisedButton>
                    }
                </section>
                <RaisedButton secondary={true} style={{backgroundColor: "yellow"}} onClick={this.sendUpdate}>Save Changes</RaisedButton>
                <RaisedButton secondary={true} className="delete-from-workout" style={{backgroundColor: "red"}}onClick={() => this.props.removeExFromWorkout(workout_ex_id, workout_id)}>Remove From Workout</RaisedButton>
            </section>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         something: state.fitness.somthe
//     }
// }

export default connect(null, { updateWorkoutEx, removeExFromWorkout })(ExerciseCard)