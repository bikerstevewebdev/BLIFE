import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addWorkoutToDB, toggleWorkCreatorModal } from '../../ducks/fitnessReducer'
import { Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField/TextField';
import { DropDownMenu, MenuItem, IconButton } from 'material-ui';
import CloseBtn from 'material-ui/svg-icons/navigation/close'
import './Workout.css'

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
        const { addingImg, imgInput, titleInput, creating, w_id, typeInput } = this.state
        let contentWidth = (addingImg && imgInput.length) ? "45%" : "20%"
        return(
            <Dialog title="Workout Creator" bodyClassName="w-creator-body" contentClassName="w-creator-content" contentStyle={{width: contentWidth}} open={this.props.workCreatorModalOpen} className="w-creator" >
                <section className="w-creator-main">
                    <TextField floatingLabelText="Title of the Workout:" value={titleInput}  onChange={(e) => this.updateWorkoutTitle(e.target.value)} />
                    <DropDownMenu floatingLabelText="Workout Category:" value={typeInput} className="workout-type" onChange={(e, i, v) => this.updatetypeInput(e, i, v)}>
                        <MenuItem primaryText="Weights" value="Weights"/>
                        <MenuItem primaryText="Cardio" value="Cardio"/>
                        <MenuItem primaryText="Crossfit" value="Crossfit"/>
                        <MenuItem primaryText="Calisthenics" value="Calisthenics"/>
                        <MenuItem primaryText="Home" value="Home"/>
                        <MenuItem primaryText="Stretching" value="Stretching"/>
                        <MenuItem primaryText="Yoga" value="Yoga"/>
                    </DropDownMenu>
                    {
                        addingImg
                        ?
                        <section className="w-img-input">
                            <TextField floatingLabelText="Workout Image Url:" value={imgInput} onChange={(e) => this.updateimgInput(e.target.value)} />
                        </section>
                        :
                        <RaisedButton secondary={true} onClick={this.prepareToAddImg} label="Add an image?" />
                    }
                    <RaisedButton primary={true} onClick={() => this.sendWorkoutUp()} label="Create Workout" />
                </section>
                {
                    imgInput.length ? 
                    <section className="w-creator-img-pre">
                        <img src={imgInput} alt={titleInput} />
                    </section>
                    :
                    null
                }
                {
                    creating
                    ?
                    null
                    :
                    <Redirect to={`/workout/${w_id}`} />
                }
                <IconButton className="close-btn" onClick={() => this.props.toggleWorkCreatorModal(false)} label="close"><CloseBtn/></IconButton>
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