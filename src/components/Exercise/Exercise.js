import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addExToDB, acknowledge, updateExercise, clearExercise} from '../../ducks/fitnessReducer'
import { Redirect } from 'react-router-dom'

class Exercise extends Component{
    constructor() {
        super()
        this.state = {
            nameIn: '',
            typeIn: 'Full-Body',
            muscleIn: 'Weights',
            videoURLIn: '',
            imgURLIn:'',
            isEditing: false,
            doneEditing: false
        }
        this.updateImgURLIn = this.updateImgURLIn.bind(this)
        this.updateNameIn = this.updateNameIn.bind(this)
        this.updateTypeIn = this.updateTypeIn.bind(this)
        this.updateMuscleIn = this.updateMuscleIn.bind(this)
        this.updateVideoURLIn = this.updateVideoURLIn.bind(this)
        this.sendExToDB = this.sendExToDB.bind(this)
    }

    componentDidMount() {
        const { name, type, muscle, video, img } = this.props.exercise
        const { id } = this.props.match.params
        if(!isNaN(id/1) && id/1 > 0 && !this.state.isEditing){
            this.setState({
                nameIn: name,
                typeIn: type,
                muscleIn: muscle,
                videoURLIn: video,
                imgURLIn: img,
                isEditing: true
            })
        }
    }

    updateImgURLIn(e){
        this.setState({
            imgURLIn: e.target.value
        })
    }
    
    updateVideoURLIn(e){
        this.setState({
            videoURLIn: e.target.value
        })
    }
    
    updateNameIn(e){
        this.setState({
            nameIn: e.target.value
        })
    }
    
    updateTypeIn(e){
        this.setState({
            typeIn: e.target.value
        })
    }

    updateMuscleIn(e){
        this.setState({
            muscleIn: e.target.value
        })
    }

    sendExToDB() {
        const { nameIn, typeIn, muscleIn, videoURLIn, imgURLIn } = this.state
        this.props.addExToDB(nameIn, typeIn, muscleIn, videoURLIn, imgURLIn )
    }

    sendChanges() {
        const { nameIn, typeIn, muscleIn, videoURLIn, imgURLIn } = this.state
        const { id } = this.props.match.params
        this.props.updateExercise(id, nameIn, typeIn, muscleIn, videoURLIn, imgURLIn)
        this.setState({
            isEditing: false
        })
    }
    
    componentWillUnmount() {
        this.props.clearExercise()
    }
    
    render() {
        return(
            <section className="exercise-comp">
                {
                    this.state.isEditing
                    ?
                    <section className="exercise-edit">
                        <h2>Updating: {this.props.exercise.name}</h2>
                        <h3>Previous data:</h3>
                        <p>Type: {this.props.exercise.type}</p>
                        <p>Major Muscle Group: {this.props.exercise.muscle}</p>
                        <p>Video URL: </p>
                        <a href={this.props.exercise.video} target="_blank"/>
                        <p>Image: </p>
                        <img src={this.props.exercise.img} alt={this.props.exercise.img}/>
                    </section>
                    :
                    <h2>Create a New Exercise</h2>
                }
                <p>What shall we call it?</p>
                <input type="text" value={this.state.nameIn} onChange={this.updateNameIn} />
                <p>Type:</p>
                <select className="ex-type" onChange={this.updateTypeIn}>
                    <option value="Weights" >Weights</option>
                    <option value="Bodyweight">Bodyweight/Calisthenics</option>
                    <option value="LISS">Low Intensity Steady-State (LISS) Cardio</option>
                    <option value="HIIT">High Intensity Interval Training (HIIT) Cardio</option>
                </select>
                <p>Major-Muscle-Group:</p>
                <select className="major-muscle" onChange={this.updateMuscleIn}>
                    <option value="Full-Body" >Full-Body</option>
                    <option value="Biceps">Biceps</option>
                    <option value="Calves">Calves</option>
                    <option value="Chest">Chest</option>
                    <option value="Forearms">Forearms</option>
                    <option value="Lower-back">Lower-Back</option>
                    <option value="Hamstrings">Hamstrings</option>
                    <option value="Quads">Quads</option>
                    <option value="Glutes">Glutes</option>
                    <option value="Shoulders">Shoulders</option>
                    <option value="Traps">Traps</option>
                    <option value="Triceps">Triceps</option>
                    <option value="Upper-back">Upper-Back</option>
                </select>
                <p>Video URL:</p>
                <input type="text" value={this.state.videoURLIn} onChange={this.updateVideoURLIn} />
                <p>Image URL:</p>
                <input type="text" value={this.state.imgURLIn} onChange={this.updateImgURLIn} />
                {
                    this.state.isEditing
                    ?
                    <button onClick={this.sendChanges}>Update {this.state.nameIn}</button>
                    :
                    <button onClick={this.sendExToDB}>Create Exercise</button>
                }
                {
                    this.props.message
                    ?
                    <section className="db-message">
                        <h2>{this.props.message}</h2>
                        <button onClick={this.props.acknowledge}>You Got It!</button>
                    </section>
                    :
                    null
                }
                {
                    this.state.doneEditing
                    ?
                    <Redirect to='/exercise/0' />
                    :
                    null
                }
                {/* turn into a modal/alert at some point */}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        message: state.fitness.dbMessage
    }
}

export default connect(mapStateToProps, { addExToDB, acknowledge, updateExercise, clearExercise })(Exercise)