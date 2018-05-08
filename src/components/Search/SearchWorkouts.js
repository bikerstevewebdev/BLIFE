import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchWorkouts, endFitnessSearch } from '../../ducks/fitnessReducer'
// import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import Search from 'material-ui/svg-icons/action/search'
import RaisedButton from 'material-ui/RaisedButton'
import WorkoutCard from '../Workout/WorkoutCard'

class SearchWorkouts extends Component{
    constructor(){
        super()
        this.state = {
            workoutSearch: ''
        }
        this.searchWorkouts = this.searchWorkouts.bind(this)
        this.updateWorkoutSearch = this.updateWorkoutSearch.bind(this)
        this.endSearches = this.endSearches.bind(this)
    }

    searchWorkouts() {
        this.props.searchWorkouts(this.state.workoutSearch)
        this.setState({
            workoutSearch: ''
        })
    }

    updateWorkoutSearch(e) {
        this.setState({
            workoutSearch: e.target.value
        })
    }

    endSearches(){
        this.props.endFitnessSearch()
    }

    componentWillUnmount(){
        this.props.endFitnessSearch()
    }

    render() {
        const { workoutSearchResults, btn2Fn } = this.props
        const workoutResults = workoutSearchResults.map(res => {
            return(
                <WorkoutCard workout_id={res.workout_id} btn2Fn={btn2Fn} btn2Label={"Add to my workouts"} title={res.title} img={res.img} type={res.type} />
                // <section className="workout-search-result" key={res.workout_id}>
                //     <p>{res.title}</p>
                //     <img src={res.img} alt={res.title} />
                //     {
                //         doSomething
                //         ?
                //         <RaisedButton secondary={true} onClick={() => handleBtnClick(res.workout_id, arg2, arg3)}>{btnMsg}</RaisedButton>
                //         :
                //         <Link to={`/workout/${res.workout_id}`}><RaisedButton secondary={true} onClick={this.endSearches}>Take me to this workout!</RaisedButton></Link>
                //     }
                // </section>
            )
        })
        // const workSearchStyle = {
        //     width: "100%",
        //     display: "grid",
        //     gridTemplateRows: "auto",
        //     gridTemplateColumns: "1fr 1fr",
        //     justifyContent: "center",
        //     gridGap: "0.75em"
        // }
        return (
            <section style={{...this.props.style}} className="workout-search">
                    <h2 style={{gridColumn: "1/3", justifySelf: "center"}}>Find your new Workout:</h2>
                    <TextField underlineStyle={{zIndex: "-3", height: "65%", border: "1px solid rgb(178, 255, 89)", borderRadius: "3px"}} style={{gridColumn: "1/2"}} floatingLabelText="Search the workout database" value={this.state.workoutSearch} onChange={this.updateWorkoutSearch} />
                    <RaisedButton secondary={true} icon={<Search />} style={{alignSelf: "center", width: "100%", gridColumn: "2/3"}} onClick={this.searchWorkouts}>Search for a new Workout</RaisedButton>
                {/* <button style={} >Search!</button> */}
                {workoutResults}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        workoutSearchResults: state.fitness.workoutSearchResults
    }
}


export default connect(mapStateToProps, { searchWorkouts, endFitnessSearch })(SearchWorkouts)