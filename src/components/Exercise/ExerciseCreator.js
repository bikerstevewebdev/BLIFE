import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addExToDB, clearExercise, getExById, toggleExCreatorModal } from '../../ducks/fitnessReducer'
// import { Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CloseBtn from 'material-ui/svg-icons/navigation/close'
import { IconButton, SelectField, TextField } from 'material-ui';
import MenuItem from 'material-ui/MenuItem/MenuItem';
import './Exercise.css'

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
    
    updateTypeIn(e, i, v){
        this.setState({
            typeIn: v
        })
    }

    updateMuscleIn(e, i, v){
        this.setState({
            muscleIn: v
        })
    }

    sendExToDB() {
        const { nameIn, typeIn, muscleIn, videoURLIn, imgURLIn, addingImg } = this.state,
              img = addingImg ? imgURLIn : "https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f831342881cb6ff58e50698c7f9432de&auto=format&fit=crop&w=500&q=60"
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
        const { typeIn, muscleIn, nameIn, videoURLIn, addingImg, imgURLIn, isEditing } = this.state
        let contentWidth = (addingImg && imgURLIn.length) ? "40%" : "18%"
        return(
            <Dialog bodyClassName="e-creator-body" contentStyle={{width: contentWidth}}  contentClassName="e-creator-content" className="e-creator" open={this.props.exCreatorModalOpen}>
                <section className="e-creator-main">
                    {
                        isEditing
                        ?
                        <section className="exercise-edit">
                            <h2>Updating: {this.props.exercise.name}</h2>
                            <h3>Previous data:</h3>
                            <p>Type: {this.props.exercise.type}</p>
                            <p>Major Muscle Group: {this.props.exercise.main_muscle_group}</p>
                            <a href={this.props.exercise.video} target="_blank">
                                Video URL
                            </a>
                            <img src={this.props.exercise.img} alt={this.props.exercise.img}/>
                        </section>
                        :
                        <h2>Create a New Exercise</h2>
                    }
                    <TextField type="text" floatingLabelText="What shall we call it?" value={nameIn} onChange={this.updateNameIn} />
                    <SelectField floatingLabelText="Type" className="ex-type" value={typeIn} onChange={(e, i, v) => this.updateTypeIn(e, i, v)}>
                        <MenuItem primaryText="Weights" value="Weights" />
                        <MenuItem primaryText="Bodyweight/Calisthenics" value="Bodyweight"/>
                        <MenuItem primaryText="Low Intensity Steady-State (LISS) Cardio" value="LISS"/>
                        <MenuItem primaryText="High Intensity Interval Training (HIIT) Cardio" value="HIIT"/>
                    </SelectField>
                    <SelectField floatingLabelText="Major-Muscle-Group" className="major-muscle" value={muscleIn} onChange={(e, i, v) => this.updateMuscleIn(e, i, v)}>
                        <MenuItem primaryText="Full-Body" value="Full-Body" />
                        <MenuItem primaryText="Biceps" value="Biceps"/>
                        <MenuItem primaryText="Calves" value="Calves"/>
                        <MenuItem primaryText="Chest" value="Chest"/>
                        <MenuItem primaryText="Forearms" value="Forearms"/>
                        <MenuItem primaryText="Lower-Back" value="Lower-back"/>
                        <MenuItem primaryText="Hamstrings" value="Hamstrings"/>
                        <MenuItem primaryText="Quads" value="Quads"/>
                        <MenuItem primaryText="Glutes" value="Glutes"/>
                        <MenuItem primaryText="Shoulders" value="Shoulders"/>
                        <MenuItem primaryText="Traps" value="Traps"/>
                        <MenuItem primaryText="Triceps" value="Triceps"/>
                        <MenuItem primaryText="Upper-Back" value="Upper-back"/>
                    </SelectField>
                    <TextField type="text" floatingLabelText="Video URL:" value={videoURLIn} onChange={this.updateVideoURLIn} />

                    {
                        addingImg
                        ?
                        <section className="exercise-img-input">
                            <TextField type="text" value={imgURLIn} floatingLabelText="Exercise Image Url:" onChange={this.updateImgURLIn} />
                            <RaisedButton className="e-creator-btn" fullWidth secondary={true} onClick={() => this.prepareToAddImg(false)} label="No Image" />
                        </section>
                        :
                        <RaisedButton className="e-creator-btn" fullWidth secondary={true} onClick={() => this.prepareToAddImg(true)} label="Add an image?" />
                    }                
                    {
                        isEditing
                        ?
                        <RaisedButton className="e-creator-btn" fullWidth primary={true} onClick={this.sendChanges} label="Update This Exercise" />
                        :
                        <RaisedButton className="e-creator-btn" fullWidth primary={true} onClick={this.sendExToDB} label="Create Exercise" />
                    }
                </section>
                {
                    addingImg && imgURLIn.length
                    ? 
                    <section className="ex-creator-img-pre">
                        <img src={imgURLIn} alt="Preview" />
                    </section>
                    :
                    null
                }
                <IconButton className="close-btn" onClick={() => this.props.toggleExCreatorModal(false)} label="close"><CloseBtn/></IconButton>
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