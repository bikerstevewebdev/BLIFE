import React, { Component }from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from '../../ducks/userReducer'



class UserUpdate extends Component() {
    constructor(){
        super()
        this.state = {
            editingUsername: false
        }
        this.startUpdate = this.startUpdate.bind(this)
        this.keepUsername = this.keepUsername.bind(this)
    }
    
    startUpdate() {
        this.setState({
            editingUsername: true
        })
    }
    
    keepUsername() {
        this.setState({
            editingUsername: false
        })
    }
    
    render() {
        return(
            <nav>
                <h1>Welcome to your new Balanced Life!</h1>
                {/* could use a delay for the second item to transition in */}
                <h2>Let's get you started with some simple user information...</h2>
                <button onClick={this.startUpdate}>Ok</button>
                <h2>What should we call you?</h2>
                <input value={usernameIn} onChange={this.updateUsernameIn} placeholder="Choose a unique username"/>
                <button onClick={this.keepUsername}>Stick with {userData.username}</button>
                {/* Use React Motion and conditional rendering here to make smooth transitions, maybe functional components for each step of the sign-up process */}
                <h2>Would you like to start by adding your measurements or just calculating your macros?</h2>
                <button onClick={this.keepUsername}>Add Measurements</button>
                <button>Calculate Macros</button>
                <input value={usernameIn} onChange={this.updateUsernameIn} placeholder="Choose a unique username"/>
                <button width="200px">Login</button>
            </nav>
        )
    }
}
function mapStateToProps(state){
    return {
        userData: state.users.userData
    }
}

export default connect(mapStateToProps, { updateUser })(UserUpdate)
