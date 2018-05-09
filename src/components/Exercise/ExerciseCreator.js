import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addExToDB, clearExercise, getExById, toggleExCreatorModal } from '../../ducks/fitnessReducer'
// import { Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Exercise extends Component{
    constructor(props) {
        super(props)
        this.state = {
            nameIn: '',
            typeIn: 'Weights',
            muscleIn: 'Full-Body',
            videoURLIn: '',
            imgURLIn:'',
            addingImg: false
        }
        this.updateImgURLIn = this.updateImgURLIn.bind(this)
        this.updateNameIn = this.updateNameIn.bind(this)
        this.updateTypeIn = this.updateTypeIn.bind(this)
        this.updateMuscleIn = this.updateMuscleIn.bind(this)
        this.updateVideoURLIn = this.updateVideoURLIn.bind(this)
        this.sendExToDB = this.sendExToDB.bind(this)
        this.prepareToAddImg = this.prepareToAddImg.bind(this)
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
        const { nameIn, typeIn, muscleIn, videoURLIn, imgURLIn } = this.state,
              img = this.state.addingImg ? imgURLIn : "https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f831342881cb6ff58e50698c7f9432de&auto=format&fit=crop&w=500&q=60"
        this.props.addExToDB(nameIn, typeIn, muscleIn, videoURLIn, img )
    }


    prepareToAddImg(val) {
        this.setState({
            addingImg: val
        })
    }
    
    componentWillUnmount() {
        this.props.clearExercise()
    }

    render() {
        return(
            <Dialog open={this.props.exCreatorModalOpen} className="comp exercise-comp">
                {
                    this.state.isEditing
                    ?
                    <section className="exercise-edit">
                        <h2>Updating: {this.props.exercise.name}</h2>
                        <h3>Previous data:</h3>
                        <p>Type: {this.props.exercise.type}</p>
                        <p>Major Muscle Group: {this.props.exercise.main_muscle_group}</p>
                        <a href={this.props.exercise.video} target="_blank">
                            Video URL
                        </a>
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

                {
                    this.state.addingImg
                    ?
                    <section className="exercise-img-input">
                        <p>Exercise Image Url:</p>
                        <input type="text" value={this.state.imgURLIn} onChange={this.updateImgURLIn} />
                        <img src={this.state.imgURLIn} alt="Preview" />
                        <RaisedButton primary={true} onClick={() => this.prepareToAddImg(false)}>No Image</RaisedButton>
                    </section>
                    :
                    <RaisedButton primary={true} onClick={() => this.prepareToAddImg(true)}>Add an image?</RaisedButton>
                }
                
                
                <p>Image URL:</p>
                {
                    this.state.isEditing
                    ?
                    <RaisedButton primary={true} onClick={this.sendChanges}>Update This Exercise</RaisedButton>
                    :
                    <RaisedButton primary={true} onClick={this.sendExToDB}>Create Exercise</RaisedButton>
                }
                <FlatButton onClick={() => this.props.toggleExCreatorModal(false)} label="close" />
            </Dialog>
        )
    }
}

function mapStateToProps(state) {
    return {
        exercise: state.fitness.exercise,
        exCreatorModalOpen: state.fitness.exCreatorModalOpen
    }
}

export default connect(mapStateToProps, { addExToDB, clearExercise, getExById, toggleExCreatorModal })(Exercise)