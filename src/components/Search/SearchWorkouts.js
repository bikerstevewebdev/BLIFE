import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchWorkouts, endFitnessSearch } from '../../ducks/fitnessReducer'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import Search from 'material-ui/svg-icons/action/search'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
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
        this.handleBtn2Click = this.handleBtn2Click.bind(this)
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

    handleBtn2Click(arg1, w_id){
        this.props.btn2Fn(arg1, w_id)
        this.endSearches()
    }

    endSearches(){
        this.setState({workoutSearch: ''})
        this.props.endFitnessSearch()
    }

    componentWillUnmount(){
        this.props.endFitnessSearch()
    }
    
    render() {
        const { workoutSearchResults, btn2Fn, btn2msg, arg1, userData } = this.props
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
                            {
                                userData.coach_id !== -7
                                ?
                                <FlatButton onClick={() => this.handleBtn2Click(arg1, res.workout_id)} label={btn2msg} />
                                :
                                null
                            }
                    </CardActions>
                </Card>
            )
        })

        return (
            <section style={{...this.props.style}} className="workout-search">
                    <h2 style={{gridColumn: "1/3", justifySelf: "center", fontSize: "1.5em"}}>Find your new Workout:</h2>
                    <TextField underlineStyle={{zIndex: "-3", height: "65%", border: "1px solid rgb(178, 255, 89)", borderRadius: "3px"}} style={{gridColumn: "1/2"}} floatingLabelText="Search the workout database" value={this.state.workoutSearch} onChange={this.updateWorkoutSearch} />
                    <RaisedButton secondary={true} icon={<Search />} style={{alignSelf: "center", width: "100%", gridColumn: "2/3"}} onClick={this.searchWorkouts}>Search for a new Workout</RaisedButton>
                    {
                        this.props.workoutSearchResults.length > 0
                        ?
                        <RaisedButton secondary={true} icon={<NavigationClose />} style={{alignSelf: "center", width: "100%", gridColumn: "2/3"}} onClick={this.endSearches} label="End Search" />
                        :
                        null
                    }
                {/* <button style={} >Search!</button> */}
                {workoutResults}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        workoutSearchResults: state.fitness.workoutSearchResults,
        userData: state.users.userData
    }
}


export default connect(mapStateToProps, { searchWorkouts, endFitnessSearch })(SearchWorkouts)