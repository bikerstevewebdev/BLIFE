import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addWorkoutToDB } from '../../ducks/fitnessReducer'
import { Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

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

    componentDidUpdate() {
        const { workout_id } = this.props.workout
        if(workout_id){
            this.setState({
                w_id: workout_id
            })
            this.leave()
        }
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

    updatetypeInput(val) {
        this.setState({
            typeInput: val
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
            <section className="workout-creator" >
                <p>Title of the Workout:</p>
                <input value={this.state.titleInput} onChange={(e) => this.updateWorkoutTitle(e.target.value)} />
                <p>Workout Category:</p>
                <select className="workout-type" onChange={(e) => this.updatetypeInput(e.target.value)}>
                    <option value="Weights" >Weights</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Crossfit">Crossfit</option>
                    <option value="Calisthenics">Bodyweight/Calisthenics</option>
                    <option value="Home">Home-Workout</option>
                    <option value="Stretching">Stretching</option>
                    <option value="Yoga">Yoga</option>
                </select>
                {
                    this.state.addingImg
                    ?
                    <section className="workout-img-input">
                        <p>Workout Image Url:</p>
                        <input value={this.state.imgInput} onChange={(e) => this.updateimgInput(e.target.value)} />
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
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        workout: state.fitness.workout
    }
}

export default connect(mapStateToProps, { addWorkoutToDB })(Workout)