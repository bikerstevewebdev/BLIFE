import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addExToDB, acknowledge } from '../../ducks/fitnessReducer'

class Exercise extends Component{
    constructor() {
        super()
        this.state = {
            nameIn: '',
            typeIn: '',
            videoURLIn: '',
            imgURLIn:''
        }
        this.updateImgURLIn = this.updateImgURLIn.bind(this)
        this.updateNameIn = this.updateNameIn.bind(this)
        this.updateTypeIn = this.updateTypeIn.bind(this)
        this.updateVideoURLIn = this.updateVideoURLIn.bind(this)
        this.sendExToDB = this.sendExToDB.bind(this)
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

    sendExToDB() {
        this.props.addExToDB(this.props.user_id, nameIn, typeIn, videoURLIn, imgURLIn, )
    }
    
    
    render() {
        return(
            <section>
                <h2>Create a New Exercise</h2>
                <p>Give it a Name:</p>
                <input type="text" value={this.state.nameIn} onChange={this.updateNameIn} />
                <p>Type:</p>
                <input type="text" value={this.state.typeIn} onChange={this.updateTypeIn} />
                <p>Video URL:</p>
                <input type="text" value={this.state.videoURLIn} onChange={this.updateVideoURLIn} />
                <p>Image URL:</p>
                <input type="text" value={this.state.imgURLIn} onChange={this.updateImgURLIn} />
                <button onClick={this.sendExToDB}>Create Exercise</button>
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
                {/* turn into a modal/alert at some point */}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_id: state.users.userData.user_id,
        message: state.fitness.dbMessage
    }
}

export default connect(mapStateToProps, { addExToDB, acknowledge })(Exercise)