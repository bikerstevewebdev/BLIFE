import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createWorkout } from '../../ducks/fitnessReducer'
import { Redirect } from 'react-router-dom'

class Workout extends Component{
    constructor() {
        super()
        this.state = {
            titleInput: '',
            imgInput: '',
            creating: true,
            addingImg: false,
            w_id: 0
        }
        this.updateimgInput = this.updateimgInput.bind(this)
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
        const { titleInput, imgInput } = this.state,      
              img = this.state.addingImg ? imgInput : "https://images.unsplash.com/photo-1513351888586-753fe7575b0e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=90d3b3414542b370199c27493f424036&auto=format&fit=crop&w=500&q=60"
        this.props.createWorkout(titleInput, img)
    }

    updateimgInput(val) {
        this.setState({
            imgInput: val
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
                {
                    this.state.addingImg
                    ?
                    <section className="workout-img-input">
                        <p>Workout Image Url:</p>
                        <input value={this.state.imgInput} onChange={(e) => this.updateimgInput(e.target.value)} />
                    </section>
                    :
                    <button onClick={this.prepareToAddImg}>Add an image?</button>
                }
                <button onClick={() => this.sendWorkoutUp()}>Create Workout!</button>
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

export default connect(mapStateToProps, { createWorkout })(Workout)