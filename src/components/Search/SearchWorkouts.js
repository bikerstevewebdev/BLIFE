import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchWorkouts, endFitnessSearch } from '../../ducks/fitnessReducer'

class SearchWorkout extends Component{
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
        const workoutResults = this.props.workoutSearchResults.map(res => {
            return(
                <section className="workout-search-result" key={res.workout_id}>
                    <p>{res.title}</p>
                    <img src={res.img} alt={res.title} />
                    {
                        this.props.doSomething
                        ?
                        <button onClick={this.props.handleBtnClick}>{this.props.btnMsg}</button>
                        :
                        <Link to={`/workout/${res.workout_id}`}><button onClick={this.endSearches}>Take me to this workout!</button></Link>
                    }
                </section>
            )
        })
        return (
            <section className="menu-search">
                <h3>Find your new Workout:</h3>
                <input value={this.state.workoutSearch} onChange={this.updateWorkoutSearch} />
                <button style={{width: "300px"}} onClick={this.searchWorkouts}>Search!</button>
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