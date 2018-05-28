import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchWorkouts, endFitnessSearch } from '../../ducks/fitnessReducer'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import Search from 'material-ui/svg-icons/action/search'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Add from 'material-ui/svg-icons/action/note-add'
import Info from 'material-ui/svg-icons/action/info'
import './Search.css'

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
        if(arg1){
            this.props.btn2Fn(arg1, w_id)
            this.endSearches()
        }else{
            this.props.btn2Fn(w_id)
            this.endSearches()
        }
        
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
                <section key={res.workout_id} className="workout-card order-1-card">
                    <div className="card-left-side">
                        <img src={res.img} alt={res.title}/>
                        <p>Author</p>
                    </div>
                    <div className="card-content">
                        <div className="card-head">
                            <h2>{res.title}</h2>
                        </div>
                        <div className="card-info">
                            <p>Type: {res.type}</p>
                        </div>
                    </div>
                    <div className="actions">
                        <Link to={`/workout/${res.workout_id}`}><IconButton tooltip="Details"><Info/></IconButton></Link>
                        {
                            userData.coach_id !== -7
                            ?
                            <IconButton tooltip={btn2msg} onClick={() => this.handleBtn2Click(arg1, res.workout_id)} ><Add /></IconButton>
                            :
                            null
                        }
                    </div>
                </section>
            )
        })

        return (
            <section id="workout-search" className={this.props.styleClass}>
                    <h2>Find your new Workout:</h2>
                    <div className="search-box">
                        <TextField floatingLabelText="Search the workout database" value={this.state.workoutSearch} onChange={this.updateWorkoutSearch} />
                        <RaisedButton secondary={true} icon={<Search />} onClick={this.searchWorkouts} label="Search" />
                        {
                            this.props.workoutSearchResults.length > 0
                            ?
                            <RaisedButton secondary={true} icon={<NavigationClose />} onClick={this.endSearches} label="End Search" />
                            :
                            null
                        }
                    </div>
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





        // <Card key={res.workout_id}  style={{backgroundColor: "#fff", maxWidth: "225px", maxHeight: "21em", width: "100%"}}>
        //     <CardMedia style={{overflow: "hidden", height: "9.5em"}} >
        //         <img src={res.img} alt={res.title} />
        //     </CardMedia>
        //     <CardTitle style={{padding: "0.5em"}}  title={res.title} />
        //     <CardText style={{padding: "0.5em"}} >
        //         <p>Type: {res.type}</p>
        //     </CardText>
        //     <CardActions style={{padding: "0.5em"}} >
        //         <Link to={`/workout/${res.workout_id}`}><FlatButton label="Details" /></Link>
        //             {
        //                 userData.coach_id !== -7
        //                 ?
        //                 <FlatButton onClick={() => this.handleBtn2Click(arg1, res.workout_id)} label={btn2msg} />
        //                 :
        //                 null
        //             }
        //     </CardActions>
        // </Card>