import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMeasurement } from '../../ducks/userReducer'
import { Redirect } from 'react-router-dom'

class Measurements extends Component{
    constructor(props) {
        super(props)
        this.state = {
            weightIn: props.user.current_weight || 0,
            heightIn: props.user.current_height || 0,
            waistIn: props.user.current_waist || 0,
            neckIn: props.user.current_neck || 0,
            chestIn: props.user.current_chest || 0,
            bfIn: props.user.current_bf || 0,
            addingMes: true
        }
        this.updateWeightIn = this.updateWeightIn.bind(this)
        this.updateHeightIn = this.updateHeightIn.bind(this)
        this.updateChestIn = this.updateChestIn.bind(this)
        this.updateWaistIn = this.updateWaistIn.bind(this)
        this.updateNeckIn = this.updateNeckIn.bind(this)
        this.updateBfIn = this.updateBfIn.bind(this)
        this.sendUpdates = this.sendUpdates.bind(this)
    }

    sendUpdates() {
        const { waistIn, neckIn, chestIn, heightIn, weightIn, bfIn } = this.state  
        this.props.addMeasurement(heightIn, weightIn, bfIn, waistIn, chestIn, neckIn)
        this.setState({
            addingMes: false
        })
    }
// condense to one method when you have time: add a second param and check for === the desired state to update
    updateWeightIn(val) {
        this.setState({
            weightIn: val
        })
    }

    updateHeightIn(val) {
        this.setState({
            heightIn: val
        })
    }

    updateWaistIn(val) {
        this.setState({
            waistIn: val
        })
    }

    updateNeckIn(val) {
        this.setState({
            neckIn: val
        })
    }

    updateChestIn(val) {
        this.setState({
            chestIn: val
        })
    }

    updateupdateBfIn(val) {
        this.setState({
            bfIn: val
        })
    }

        
    render() {
        const { waistIn, neckIn, chestIn, heightIn, weightIn, bfIn } = this.state
        return(
            <section className="measurements-form" >
                <p>Weight: (in pounds)</p>
                <input type="number" min="50" max="1000" value={weightIn} onChange={(e) => this.updateWeightIn(e.target.value)} />
                <p>Height: (in inches)</p>
                <input type="number" min="24" max="96" value={heightIn} onChange={(e) => this.updateHeightIn(e.target.value)} />
                <p>Waist: (in inches)</p>
                <input type="number" min="5" max="100" value={waistIn} onChange={(e) => this.updateWaistIn(e.target.value)} />
                <p>Neck: (in inches)</p>
                <input type="number" min="5" max="40" value={neckIn} onChange={(e) => this.updateNeckIn(e.target.value)} />
                <p>Chest: (in inches)</p>
                <input type="number" min="5" max="100" value={chestIn} onChange={(e) => this.updateChestIn(e.target.value)} />
                <p>Bodyfat: (enter in percent as a number, i.e. "11" for 11 percent, not "0.11")</p>
                <input type="number" min="2" max="90" value={bfIn} onChange={(e) => this.updateBfIn(e.target.value)} />
                <button onClick={this.sendUpdates}>Save your stats!</button>
                {
                    this.state.addingMes && this.props.location.pathname == '/measurements'
                    ?
                    null
                    :
                    <Redirect to={`/profile`} />
                }
            </section>
        )
    }
}

function mapStateToProps(state){
    const { userData, user } = state.users
    return {
        userData: userData,
        user: user
        }
}

export default connect(mapStateToProps, { addMeasurement })(Measurements)