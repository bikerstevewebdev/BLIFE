import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchWorkouts, endFitnessSearch } from '../../ducks/fitnessReducer'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import Search from 'material-ui/svg-icons/action/search'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'

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
        const { workoutSearchResults, btn2Fn, btn2msg, arg1 } = this.props
        const workoutResults = workoutSearchResults.map(res => {
            return(
                <Card style={{maxWidth: "350px", width: "100%"}} >
                    <CardMedia style={{height: "12.5em"}} >
                        <img src={res.img} alt={res.title} />
                    </CardMedia>
                    <CardTitle title={res.title} />
                    <CardText>
                        <p>Type: {res.type}</p>
                    </CardText>
                    <CardActions>
                        <Link to={`/workout/${res.workout_id}`}><FlatButton label="Details" /></Link>
                            <FlatButton onClick={() => btn2Fn(arg1, res.workout_id)} label={btn2msg} />
                    </CardActions>
                </Card>
            )
        })

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