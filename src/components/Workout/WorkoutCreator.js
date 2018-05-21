import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addWorkoutToDB, toggleWorkCreatorModal } from '../../ducks/fitnessReducer'
import { Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField/TextField';
import { DropDownMenu, MenuItem } from 'material-ui';

class Workout extends Component{
    constructor() {
        super()
        this.state = {
            titleInput: '',
            imgInput: '',
            typeInput: 'Weights',
            creating: true,
            addingImg: false,
            w_id: 0
        }
        this.updateimgInput = this.updateimgInput.bind(this)
        this.updatetypeInput = this.updatetypeInput.bind(this)
        this.updateWorkoutTitle = this.updateWorkoutTitle.bind(this)
        this.sendWorkoutUp = this.sendWorkoutUp.bind(this)
        this.prepareToAddImg = this.prepareToAddImg.bind(this)
        this.leave = this.leave.bind(this)
    }

    // componentDidUpdate() {
    //     const { workout_id } = this.props.workout
    //     if(workout_id){
    //         this.setState({
    //             w_id: workout_id
    //         })
    //         this.leave()
    //     }
    // }
    
    sendWorkoutUp() {
        const { titleInput, imgInput, typeInput } = this.state,      
              img = (this.state.addingImg && this.state.imgInput.length > 0) ? imgInput : "https://images.unsplash.com/photo-1513351888586-753fe7575b0e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=90d3b3414542b370199c27493f424036&auto=format&fit=crop&w=500&q=60"
        this.props.addWorkoutToDB(titleInput, typeInput, img)
    }

    updateimgInput(val) {
        this.setState({
            imgInput: val
        })
    }

    updatetypeInput(event, index, value) {
        this.setState({
            typeInput: value
        })
    }

    updateWorkoutTitle(val) {
        this.setState({
            titleInput: val
        })
    }

    prepareToAddImg(val) {
        this.setState({
            addingImg: true
        })
    }

    leave() {
        this.setState({
            creating: false
        })
    }

    // componentWillUnmount(){
    //     this.setState({
    //         titleInput: '',
    //         imgInput: '',
    //         creating: true,
    //         addingImg: false
    //     })
    // }
    
    render() {
        return(
            <Dialog contentStyle={{display: "flex"}} open={this.props.workCreatorModalOpen} className="workout-creator" >
                <TextField floatingLabelText="Title of the Workout:" value={this.state.titleInput}  onChange={(e) => this.updateWorkoutTitle(e.target.value)} />
                <DropDownMenu floatingLabelText="Workout Category:" className="workout-type" onChange={(e, i, v) => this.updatetypeInput(e, i, v)}>
                    <MenuItem value="Weights" >Weights</MenuItem>
                    <MenuItem value="Cardio">Cardio</MenuItem>
                    <MenuItem value="Crossfit">Crossfit</MenuItem>
                    <MenuItem value="Calisthenics">Bodyweight/Calisthenics</MenuItem>
                    <MenuItem value="Home">Home-Workout</MenuItem>
                    <MenuItem value="Stretching">Stretching</MenuItem>
                    <MenuItem value="Yoga">Yoga</MenuItem>
                </DropDownMenu>
                {
                    this.state.addingImg
                    ?
                    <section className="workout-img-input">
                        <TextField floatingLabelText="Workout Image Url:" value={this.state.imgInput} onChange={(e) => this.updateimgInput(e.target.value)} />
                    </section>
                    :
                    <RaisedButton secondary={true} onClick={this.prepareToAddImg}>Add an image?</RaisedButton>
                }
                <RaisedButton secondary={true} onClick={() => this.sendWorkoutUp()}>Create Workout!</RaisedButton>
                {
                    this.state.creating
                    ?
                    null
                    :
                    <Redirect to={`/workout/${this.state.w_id}`} />
                }
                <FlatButton onClick={() => this.props.toggleWorkCreatorModal(false)} label="close" />
            </Dialog>
        )
    }
}

function mapStateToProps(state) {
    return {
        workout: state.fitness.workout,
        workCreatorModalOpen: state.fitness.workCreatorModalOpen
    }
}

export default connect(mapStateToProps, { addWorkoutToDB, toggleWorkCreatorModal })(Workout)