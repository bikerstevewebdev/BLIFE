import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateWorkoutEx, removeExFromWorkout } from '../../ducks/fitnessReducer'

class WorkoutEx extends Component{
    constructor() {
        super() 
        this.state = {
            repsIn: '',
            setsIn: '',
            restTimeIn: '',
            weight: '',
            notesIn: '',
            addingNotes: false
        }
        this.updateRepsIn = this.updateRepsIn.bind(this)
        this.updateSetsIn = this.updateSetsIn.bind(this)
        this.updateRestTimeIn = this.updateRestTimeIn.bind(this)
        this.updateWeightIn = this.updateWeightIn.bind(this)
        this.updateOrderIn = this.updateOrderIn.bind(this)
        this.updateNotesIn = this.updateNotesIn.bind(this)
    }

    componentDidMount(){
        const { notes, reps, sets, rest_time, weight } = this.props
        this.setState({
            repsIn: reps,
            setsIn: sets,
            restTimeIn: rest_time,
            weightIn: weight,
            notesIn: notes
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

    updateOrder(e) {
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
        const { repsIn, setsIn, restTimeIn, weightIn, notesIn, orderIn, addingNotes } = this.state,
              { type, name, img, numExs, workout_ex_id, workout_id } = this.props
        return (
            <section className="workout-ex">
                <select onChange={this.updateOrder}>
                    {numExs.map((v, i) => {
                        return <option key={ex_id + "-" + i} value={i+1}>{i+1}</option>
                    })}
                </select>
                <img src={img} alt={name} />
                <h3>{name}</h3>
                <p>Reps:</p>
                <input type="number" value={repsIn} onChange={this.updateRepsIn} />
                <p>Sets:</p>
                <input type="number" value={setsIn} onChange={this.updateSetsIn} />
                <p>Rest Time:</p>
                <input type="number" value={restTimeIn} onChange={this.updateRestTimeIn} />
                {
                    type !== "Bodyweight"
                    ?
                    <section className="weight-input">
                        <p>Weight:</p>
                        <input type="number" value={weightIn} onChange={this.updateWeightIn} />
                    </section>
                    :
                    null
                }
                <p>Rest Time:</p>
                <input type="number" value={restTimeIn} onChange={this.updateRestTimeIn} />
                {
                    addingNotes
                    ?
                    <section className="notes-input">
                        <p>Notes:</p>
                        <textarea maxLength="500" value={notesIn} placeholder="Limit 500 characters" onChange={this.updateNotesIn} />
                    </section>
                    :
                    <button onClick={this.prepareToAddNotes}>Add Notes?</button>
                }
                <button className="delete-from-workout" style={{backgroundColor: "red"}}onClick={() => this.props.removeExFromWorkout(workout_ex_id, workout_id)}>Remove From Workout</button>
            </section>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         something: state.fitness.somthe
//     }
// }

export default connect(null, { updateWorkoutEx, removeExFromWorkout })(WorkoutEx)