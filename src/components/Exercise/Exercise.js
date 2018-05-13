import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addExToDB, acknowledge, updateExercise, clearExercise, getExById } from '../../ducks/fitnessReducer'
// import { Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import { SelectField } from 'material-ui';

class Exercise extends Component{
    constructor(props) {
        super(props)
        this.state = {
            nameIn: '',
            typeIn: 'Weights',
            muscleIn: 'Full-Body',
            videoURLIn: '',
            imgURLIn:'',
            isEditing: false,
            doneEditing: false,
            addingImg: false
        }
        this.updateImgURLIn = this.updateImgURLIn.bind(this)
        this.updateNameIn = this.updateNameIn.bind(this)
        this.updateTypeIn = this.updateTypeIn.bind(this)
        this.updateMuscleIn = this.updateMuscleIn.bind(this)
        this.updateVideoURLIn = this.updateVideoURLIn.bind(this)
        this.sendExToDB = this.sendExToDB.bind(this)
        this.sendChanges = this.sendChanges.bind(this)
        this.acknowledgeMsg = this.acknowledgeMsg.bind(this)
        this.prepareToAddImg = this.prepareToAddImg.bind(this)
    }

    componentDidMount() {
        const { name, type, main_muscle_group, video, img } = this.props.exercise
        const { id } = this.props.match.params
        if(!isNaN(id/1) && id/1 > 0 && !this.state.isEditing){
            if(name){
                this.setState({
                    nameIn: name,
                    typeIn: type,
                    muscleIn: main_muscle_group,
                    videoURLIn: video,
                    imgURLIn: img,
                    isEditing: true
                })
            } else{
                this.props.getExById(id)
            }
        }else if(id === 0){
            this.setState({
                nameIn: '',
                typeIn: 'Weights',
                muscleIn: 'Full-Body',
                videoURLIn: '',
                imgURLIn:''
            })
        }
    }

    componentDidUpdate() { 
        const { name, type, main_muscle_group, video, img } = this.props.exercise
        const { id } = this.props.match.params
        if(id/1 > 0 && !this.state.isEditing && !this.state.doneEditing){
            this.setState({
                nameIn: name,
                typeIn: type,
                muscleIn: main_muscle_group,
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
        const { nameIn, typeIn, muscleIn, videoURLIn, imgURLIn } = this.state,
              img = this.state.addingImg ? imgURLIn : "https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f831342881cb6ff58e50698c7f9432de&auto=format&fit=crop&w=500&q=60"
        this.props.addExToDB(nameIn, typeIn, muscleIn, videoURLIn, img )
    }

    sendChanges() {
        const { nameIn, typeIn, muscleIn, videoURLIn, imgURLIn } = this.state
        const { id } = this.props.match.params
        this.props.updateExercise(id, nameIn, typeIn, muscleIn, videoURLIn, imgURLIn)
        this.setState({
            isEditing: false
        })
    }
    
    prepareToAddImg(val) {
        this.setState({
            addingImg: true
        })
    }
    
    
    acknowledgeMsg() {
        this.setState({
            nameIn: '',
            typeIn: 'Weights',
            muscleIn: 'Full-Body',
            videoURLIn: '',
            doneEditing: true,
            isEditing: false,
            imgURLIn:''
        })
        this.props.acknowledge()
    }
    
    componentWillUnmount() {
        this.props.clearExercise()
    }

    render() {
        return(
            <section className="comp exercise-comp">
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
                <SelectField className="ex-type" onChange={this.updateTypeIn}>
                    <option value="Weights" >Weights</option>
                    <option value="Bodyweight">Bodyweight/Calisthenics</option>
                    <option value="LISS">Low Intensity Steady-State (LISS) Cardio</option>
                    <option value="HIIT">High Intensity Interval Training (HIIT) Cardio</option>
                </SelectField>
                <p>Major-Muscle-Group:</p>
                <SelectField className="major-muscle" onChange={this.updateMuscleIn}>
                    <option value="Full-Body" >Full-Body</option>
                    <option value="Core">Core</option>
                    <option value="Abdominals">Abdominals</option>
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
                </SelectField>
                <p>Video URL:</p>
                <input type="text" value={this.state.videoURLIn} onChange={this.updateVideoURLIn} />

                {
                    this.state.addingImg
                    ?
                    <section className="exercise-img-input">
                        <p>Exercise Image Url:</p>
                        <input type="text" value={this.state.imgURLIn} onChange={this.updateImgURLIn} />
                    </section>
                    :
                    <RaisedButton primary={true} onClick={this.prepareToAddImg}>Add an image?</RaisedButton>
                }
                
                
                <p>Image URL:</p>
                {
                    this.state.isEditing
                    ?
                    <RaisedButton primary={true} onClick={this.sendChanges}>Update This Exercise</RaisedButton>
                    :
                    <RaisedButton primary={true} onClick={this.sendExToDB}>Create Exercise</RaisedButton>
                }
                {
                    this.props.message
                    ?
                    <section className="db-message">
                        <h2>{this.props.message}</h2>
                        <RaisedButton primary={true} onClick={this.acknowledgeMsg}>You Got It!</RaisedButton>
                    </section>
                    :
                    null
                }
                    {/* turn into a modal/alert at some point */}
                {/* {
                    this.state.doneEditing
                    ?
                    <Redirect to='/exercise/0' />
                    :
                    null
                } */}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        message: state.fitness.dbMessage,
        exercise: state.fitness.exercise
    }
}

export default connect(mapStateToProps, { addExToDB, acknowledge, updateExercise, clearExercise, getExById })(Exercise)