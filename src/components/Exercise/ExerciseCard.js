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

    prepareToAddNotes(bool) {
        if(bool === false){
            this.setState({
                notesIn: '',
                addingNotes: false
            })
        }else{
            this.setState({
                addingNotes: true
            })
        }
    }

    sendUpdate(){
        const { repsIn, setsIn, restTimeIn, weightIn, orderIn, notesIn } = this.state,
              { workout_ex_id, workout_id } = this.props
        this.props.updateWorkoutEx(workout_ex_id, workout_id, repsIn, setsIn, restTimeIn, weightIn, orderIn, notesIn)
    }

    render() {
        const { repsIn, setsIn, restTimeIn, weightIn, notesIn, addingNotes, orderIn } = this.state,
              { type, name, img, numExs, workout_ex_id, ex_id, workout_id, ex_order } = this.props
        const brickStyles = {
            width: "100%",
            display: "grid",
            gridGap: "0.25em",
            alignItems: "center",
            gridTemplateColumns: type === "Bodyweight" ? "8% 1fr 8% 8% 8% 1fr 15%" : "8% 2fr 8% 8% 8% 8% 3fr 15%",
            border: "1px solid rgba(10, 10, 10, 0.5)",
            borderRadius: "3px",
            boxShadow: "rgba(11, 145, 232, 0.5) 2px 2px",
            gridAutoFlow: "column"
        }
        return (
            <div style={{...this.props.style, ...brickStyles}} className="workout-ex">
                <DropDownMenu style={{gridColumn: "1/2"}} value={orderIn/1} onChange={this.updateOrderIn}>
                    {numExs.map((v, i) => {
                        return <MenuItem key={ex_id + "-" + i} value={i+1}>{i+1}</MenuItem>
                    })}
                </DropDownMenu>
                <section style={{gridColumn: "2/3", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                    <img style={{width: "45%"}} src={img} alt={name} />
                    <h3>{name}</h3>
                </section>
                <section style={{gridColumn: "3/4"}}>
                    <TextField floatingLabelText="Reps:" fullWidth={true} type="number" value={repsIn} onChange={this.updateRepsIn} />
                </section>
                <section style={{gridColumn: "4/5"}}>
                    <TextField floatingLabelText="Sets" fullWidth={true} type="number" value={setsIn} onChange={this.updateSetsIn} />
                </section>
                {
                    type !== "Bodyweight"
                    ?
                    <section className="weight-input">
                        <TextField style={{width: "100%"}} fullWidth={true} floatingLabelText="Weight" type="number" value={weightIn} onChange={this.updateWeightIn} />
                    </section>
                    :
                    null
                }
                <TextField style={{width: "100%"}} fullWidth={true} floatingLabelText="Rest Time" type="number" value={restTimeIn} onChange={this.updateRestTimeIn} />
                <section style={{textAlign: "center"}} >
                    {
                        addingNotes
                        ?
                        <section style={{display: "flex", justifyContent: "space-between"}} className="notes-input">
                            <TextField multiLine={true} fullWidth={true} floatingLabelText="Notes" maxLength="500" value={notesIn} hintText="Limit 500 characters" onChange={this.updateNotesIn} />
                            <RaisedButton style={{alignSelf: "center"}} secondary={true} onClick={() => this.prepareToAddNotes(false)}>Clear Notes</RaisedButton>
                        </section>
                        :
                        <RaisedButton secondary={true} onClick={() => this.prepareToAddNotes(true)}>Add Notes?</RaisedButton>
                    }
                </section>
                <section style={{height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-around"}} >
                    <RaisedButton secondary={true} style={{backgroundColor: "yellow"}} onClick={this.sendUpdate}>Save Changes</RaisedButton>
                    <RaisedButton secondary={true} className="delete-from-workout" style={{backgroundColor: "red"}}onClick={() => this.props.removeExFromWorkout(workout_ex_id, workout_id)}>Remove From Workout</RaisedButton>
                </section>
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         something: state.fitness.somthe
//     }
// }

export default connect(null, { updateWorkoutEx, removeExFromWorkout })(ExerciseCard)