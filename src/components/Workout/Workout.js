import React, { Component } from 'react'

import { connect } from 'react-redux'
import { searchExercises, addExToWorkout, getWorkoutById } from '../../ducks/fitnessReducer'
import ExerciseCard from '../Exercise/ExerciseCard'
// import Exercise from '../Exercise/Exercise';
// import { Redirect } from 'react-router-dom'

class Workout extends Component{
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
                        <button onClick={() => this.addThisEx(workout_id, ex_id, workoutExs.length + 1)}>Add to {this.props.workout.title}</button>
                    </section>
                ) }),
              workoutExsList = workoutExs.map(exercise => {
                    const { ex_id, name, workout_ex_id, type, main_muscle_group, notes, ex_order, reps, sets, rest_time } = exercise
                    return <ExerciseCard key={workout_ex_id} numExs={numExs} workout_id={workout_id} main_muscle_group={main_muscle_group} notes={notes} reps={reps} sets={sets} ex_order={ex_order} type={type} rest_time={rest_time} ex_id={ex_id} workout_ex_id={workout_ex_id} name={name} img={exercise.img} />            
                 })
        return(
            <section className="workout">
                <h2>{title}</h2>
                {img ? <img src={img} alt={title} /> : null}                
                <h3>Exercises in this Workout:</h3>
                {workoutExsList}
                <input value={searchIn} placeholder="Search Exercises by Name" onChange={e => this.updateSearchIn(e.target.value)}/>
                <button onClick={() => this.props.searchExercises(searchIn)}>Search the exercise database!</button>
                {exerciseResults}
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

export default connect(mapStateToProps, { searchExercises, addExToWorkout, getWorkoutById })(Workout)