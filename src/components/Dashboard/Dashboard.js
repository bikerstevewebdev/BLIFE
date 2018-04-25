import React, { Component } from 'react'
import axios from 'axios'
import { getUserData } from '../../ducks/macroCalcReducer'
import { connect } from 'react-redux'

class Dashboard extends Component{
    componentDidMount() {
        this.props.getUserData()
        console.log('DBoard props', this.props)
    }

    componentDidUpdate() {
        console.log('DBoard updated props', this.props)
    }

    getUserObjs() {
        axios.get('/auth/me').then(res => {
            console.log(res.data)
        })
    }
    
    render() {
        return(
            <section>
                Dashboard Yo
                <button width="300px" onClick={this.getUserObjs}>Get User Objects</button>
            </section>
        )
    }
}

function mapStateToProps(state){
    return {
        userData: state.userData
    }
}

export default connect(mapStateToProps, { getUserData })(Dashboard)
