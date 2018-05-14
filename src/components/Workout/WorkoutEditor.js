import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchExercises, addExToWorkout, getWorkoutById } from '../../ducks/fitnessReducer'
import ExerciseCard from '../Exercise/ExerciseCard'
import RaisedButton from 'material-ui/RaisedButton'
import Sortable from 'sortablejs'
import { TextField } from 'material-ui';
import SearchWorkout from '../Search/SearchWorkouts'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'

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
        const { id } = this.props.match.params
        const { workout, getWorkoutById } = this.props
        if(!isNaN(id) && id/1 !== workout.workout_id){
            getWorkoutById(id)
        }
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
                    <Card containerStyle={{height: "100%"}} key={ex_id} style={{backgroundColor: "#fff", maxWidth: "350px", maxHeight: "21em", width: "100%", display: "flex", flexDirection: "column"}}>
                        <CardMedia style={{overflow: "hidden", height: "12.5em"}} >
                            <img src={_ex.img} alt={name} />
                        </CardMedia>
                        <CardTitle style={{padding: "0 0.5em"}}  title={name} />
                        <CardText style={{height: "3.75em", padding: "0 0.5em", display: "flex", flexDirection: "column"}} >
                            <p style={{padding: "5px"}}>Category: {_ex.type}</p>
                            <p style={{padding: "0 5px"}}>Major Muscle Group: {_ex.main_muscle_group}</p>
                        </CardText>
                        <CardActions style={{padding: "0 0.5em"}} >
                            <FlatButton fullWidth secondary={true} onClick={() => this.addThisEx(workout_id, ex_id, workoutExs.length + 1)} label={`Add to ${this.props.workout.title}`}/>
                        </CardActions>
                    </Card>
                ) }),
              workoutExsList = workoutExs.map(exercise => {
                    const { ex_id, name, workout_ex_id, type, main_muscle_group, notes, ex_order, reps, sets, rest_time } = exercise
                    return <ExerciseCard style={{gridColumn: "1/6", alignSelf: "center"}} key={workout_ex_id} numExs={numExs} workout_id={workout_id} main_muscle_group={main_muscle_group} notes={notes} reps={reps} sets={sets} ex_order={ex_order} type={type} rest_time={rest_time} ex_id={ex_id} workout_ex_id={workout_ex_id} name={name} img={exercise.img} />            
                 }),
                 designerStyles = {
                    display: "grid",
                    width: "100%",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gridTemplateRows: "15em 4.5em auto 2.5em",
                    //  gridAutoRows: "",
                    alignItems: "center",
                    gridGap: "0.5em",
                    padding: "5%",
                    boxShadow: "rgb(29, 39, 41) 0px 2px 1px 1px",
                    borderRadius: "3px",
                    width: "auto",
                    backgroundColor: "rgba(236, 234, 255, 0.76)"
                 }
                 const workSearchStyle = {
                    width: "100%",
                    display: "grid",
                    boxShadow: "rgba(10, 6, 15, 0.59) 0px 1px 6px 3px",
                    backgroundColor: "#c2d8c4",
                    borderRadius: "3px",
                    gridTemplateRows: "auto",
                    gridTemplateColumns: "1fr 1fr",
                    justifyContent: "center",
                    gridGap: "0.75em",
                    gridColumn: "3/5",
                    padding: "0.5em",
                    alignContent: "baseline"
                }
        return(
            <section className="workout">
                {
                    isNaN(this.props.match.params.id)
                    ? 
                    <SearchWorkout style={{...workSearchStyle}}/>
                    :
                    <section style={{...designerStyles}} >
                        <section style={{gridArea: "1/2/3/5",height: "100%", width: "100%", textAlign: "center", overflow: "hidden"}} className="heading">
                            <h1 style={{fontSize: "2.5em"}} >{title}</h1>
                            {img ? <img style={{borderRadius: "5px", maxHeight: "87%", minWidth: "125px", }} src={img} alt={title} /> : null}                
                        </section>
                        {
                            workoutExs.length < 1
                            ?
                            null
                            :
                            <h3 style={{gridArea: "2/1/3/6", justifySelf: "start", alignSelf: "center"}} >Exercises in this Workout:</h3>
                        }
                        <section  id="exercises" ref={this.pull} style={{display: "grid", gridGap: "0.5em", width: "100%", gridArea: "3/1/4/6"}}>
                            {workoutExsList}
                        </section>
                        <section style={{gridArea: "5/1/6/6", display: "grid",gridGap: "0.75em", grid: "auto-flow / repeat(5, 1fr)"}}>
                            {exerciseResults}
                        </section>
                        <section style={{gridColumn: "1/6", textAlign: "center"}}>
                            <TextField value={searchIn} floatingLabelText="Search Exercises by Name" onChange={e => this.updateSearchIn(e.target.value)}/>
                            <RaisedButton secondary={true} onClick={() => this.props.searchExercises(searchIn)} label="Search the exercise database!" />
                        </section>
                    </section>
                }
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