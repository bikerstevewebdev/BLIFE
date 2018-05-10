import React, { Component } from 'react'
import { connect } from 'react-redux';
import { denyCoach, approveCoach, getAdminInfo } from '../../ducks/coachReducer'
import CoachCard from '../Coach/CoachCard'
import RaisedButton from 'material-ui/RaisedButton'

class AdminManager extends Component{
    constructor(){
        super()
        this.state = {
            dblChk: 0
        }
        this.areYouSure = this.areYouSure.bind(this)
    }

    componentDidMount(){
        this.props.getAdminInfo()
    }

    areYouSure(val){
        this.setState({
            dblChk: val/1
        })
    }

    clearRevokationRequest() {
        this.setState({dblChk: 0})
    }


    render() {
        const { clientEmailInput, dblChk } = this.state,
              { username, searchForClient, coachReqs, activeCoaches, approveCoach, denyCoach } = this.props,
              coachRequests = coachReqs.map(req => {
                  return (
                      <section className="coach-request">
                        <p>Request Number: {req.req_id}</p>
                        <p>Username: {req.username}</p>
                        <RaisedButton secondary={true} onClick={() => denyCoach(req.req_id, req.user_id)} label="Deny Request"/>
                        <RaisedButton secondary={true} onClick={() => approveCoach(req.req_id, req.user_id)}label="Approve Request"/>
                      </section>
                  )
              }),
              coachList = activeCoaches.map(coach => <CoachCard nullifyRevokationRequest={this.clearRevokationRequest.bind(this)} profile_pic={coach.profile_pic} fullname={coach.fullname} areYouSure={this.areYouSure} dblChk={dblChk} last_login={coach.last_login} coach_id={coach.coach_id}/>)
        return (
            <section className="comp coach-manager">
                <h1>Welcome Manager {username}!</h1>
                {coachRequests}                
                {coachList}
            </section>
        )
    }
}

function mapStateToProps(state) {
    const { activeCoaches, coachReqs } = state.coach
    return {
        username: state.users.userData.username,
        activeCoaches,
        coachReqs
    }
}


export default connect(mapStateToProps, { denyCoach, approveCoach, getAdminInfo })(AdminManager)