import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchWorkouts, endFitnessSearch } from '../../ducks/fitnessReducer'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import Search from 'material-ui/svg-icons/action/search'
import RaisedButton from 'material-ui/RaisedButton'


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


    render() {
        const { arg2, arg3, handleBtnClick, btnMsg, doSomething, workoutSearchResults } = this.props
        const workoutResults = workoutSearchResults.map(res => {
            return(
                <section className="workout-search-result" key={res.workout_id}>
                    <p>{res.title}</p>
                    <img src={res.img} alt={res.title} />
                    {
                        doSomething
                        ?
                        <RaisedButton secondary={true} onClick={() => handleBtnClick(res.workout_id, arg2, arg3)}>{btnMsg}</RaisedButton>
                        :
                        <Link to={`/workout/${res.workout_id}`}><RaisedButton secondary={true} onClick={this.endSearches}>Take me to this workout!</RaisedButton></Link>
                    }
                </section>
            )
        })
        return (
            <section className="workout-search">
                <h3>Find your new Workout:</h3>
                <TextField floatingLabelText="Search the workout database" value={this.state.workoutSearch} onChange={this.updateWorkoutSearch} />
                <RaisedButton secondary={true} icon={<Search />} style={{width: "300px"}} onClick={this.searchWorkouts}/>
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