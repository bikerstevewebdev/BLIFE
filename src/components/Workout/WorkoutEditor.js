import React, { Component } from 'react'

import { connect } from 'react-redux'
import { searchExercises, addExToWorkout, getWorkoutById } from '../../ducks/fitnessReducer'
import ExerciseCard from '../Exercise/ExerciseCard'
// import Exercise from '../Exercise/Exercise';
// import { Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Sortable from 'sortablejs'

class WorkoutEditor extends Component{
    constructor(props) {
        super(props)
        this.state = {
            searchIn: ''
        }
        this.addThisEx = this.addThisEx.bind(this)
        this.endSearch = this.endSearch.bind(this)
        this.updateSearchIn = this.updateSearchIn.bind(this)
    }
        
    componentDidMount() {
        console.log(this.props)
        const { id } = this.props.match.params
        if(!isNaN(id/1) && id/1 > 0 && id !== this.props.workout.workout_id){
            this.props.getWorkoutById(id)
        } 
    }

    componentDidUpdate(){
        console.log('Workout updated props:',this.props)
    }

    addThisEx(workout_id, ex_id, ex_order){
        this.props.addExToWorkout(workout_id, ex_id, ex_order)
        this.endSearch()
    }

    endSearch(){
        this.setState({
            searchIn: ''
        })
    }

    updateSearchIn(val){
        this.setState({
            searchIn: val
        })
    }

    exercisesput = (exercises) => {
            if (exercises) {
              let options = {
                group: {
                  name: 'exercises',
                }
              };
              Sortable.create(exercises, options);
            }
          }
        
          pull = exercises => {
            // check if backing instance not null
            if (exercises) {
              let options = {
                draggable: "div", // Specifies which items inside the element should be sortable
                group: {
                  name: "exercises",
                //   pull: "clone",
                //   revertClone: true,
          }
              }
              Sortable.create(exercises, options)
            }
          }
        
    render() {
        const { exSearchResults, workout, workoutExs } = this.props,
              { workout_id, title, img } = workout,
              { searchIn } = this.state,
              numExs = Array(workoutExs.length).fill(0),
              exerciseResults = exSearchResults.map(_ex => {
                const { ex_id, name } = _ex
                return (
                    <section key={ex_id} className="exercise-result">
                        {_ex.img ? <img src={_ex.img} alt={name} /> : null}
                        <p>Exercise Name: {name}</p>
                        <p>Category: {_ex.type}</p>
                        <p>Major Muscle Group: {_ex.main_muscle_group}</p>
                        <RaisedButton secondary={true} onClick={() => this.addThisEx(workout_id, ex_id, workoutExs.length + 1)}>Add to {this.props.workout.title}</RaisedButton>
                    </section>
                ) }),
              workoutExsList = workoutExs.map(exercise => {
                    const { ex_id, name, workout_ex_id, type, main_muscle_group, notes, ex_order, reps, sets, rest_time } = exercise
                    return <ExerciseCard style={{gridColumn: "1/6", alignSelf: "center"}} key={workout_ex_id} numExs={numExs} workout_id={workout_id} main_muscle_group={main_muscle_group} notes={notes} reps={reps} sets={sets} ex_order={ex_order} type={type} rest_time={rest_time} ex_id={ex_id} workout_ex_id={workout_ex_id} name={name} img={exercise.img} />            
                 }),
                 designerStyles = {
                     display: "grid",
                     width: "100%",
                     gridTemplateColumns: "repeat(5, 1fr)",
                     gridTemplateRows: "20em 4.5em auto 2.5em",
                    //  gridAutoRows: "",
                     alignItems: "center",
                     gridGap: "0.5em"
                     
                 }
        return(
            <section style={{...designerStyles}} className="workout">
                <section style={{gridArea: "1/2/3/5", width: "100%", justifySelf: "center", alignSelf: "center", textAlign: "center"}} className="heading">
                    <h1 style={{fontSize: "2.5em"}} >{title}</h1>
                    {img ? <img style={{borderRadius: "2px", width: "65%", minWidth: "125px"}} src={img} alt={title} /> : null}                
                </section>
                <h3 style={{gridArea: "2/1/3/6", justifySelf: "start", alignSelf: "center"}} >Exercises in this Workout:</h3>
                <section  id="exercises" ref={this.pull} style={{display: "grid", gridGap: "0.5em", width: "100%", gridArea: "3/1/4/6"}}>
                    {workoutExsList}
                </section>
                <section style={{gridArea: "4/1/5/6"}}>
                    <input value={searchIn} placeholder="Search Exercises by Name" onChange={e => this.updateSearchIn(e.target.value)}/>
                    <RaisedButton secondary={true} onClick={() => this.props.searchExercises(searchIn)}>Search the exercise database!</RaisedButton>
                </section>
                <section style={{gridArea: "5/1/6/6", display: "grid", grid: "auto-flow / repeat(5, 1fr)"}}>
                    {exerciseResults}
                </section>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        workoutExs: state.fitness.workoutExs,
        exSearchResults: state.fitness.exSearchResults,
        workout: state.fitness.workout
    }
}

export default connect(mapStateToProps, { searchExercises, addExToWorkout, getWorkoutById })(WorkoutEditor)