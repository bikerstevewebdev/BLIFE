import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getCoaches, denyCoach, approveCoach, getAdminInfo } from '../../ducks/coachReducer'
import CoachCard from '../Coach/CoachCard'

class AdminManager extends Component{
    constructor(){
        super()
        this.state = {
            
        }
    }

    componentDidMount(){
        this.props.getAdminInfo(this.props.match.params.id)
    }


    render() {
        const { clientEmailInput } = this.state,
              { username, searchForClient, coachRequests, coaches, approveCoach, denyCoach } = this.props,
              coachRequests = coachRequests.map(req => {
                  return (
                      <section className="coach-request">
                        <p>Request Number: {req.req_id}</p>
                        <p>Username: {req.username}</p>
                        <button onClick={() => denyCoach(req.req_id)}>Deny Request</button>
                        <button onClick={() => approveCoach(req.req_id)}>Approve Request</button>
                      </section>
                  )
              }),
              coachList = coaches.map(client => <CoachCard fullname={coach.fullname} last_login={coach.last_login} user_id={coach.user_id}/>)
        return (
            <section className="coach-manager">
                <h1>Welcome Manager {username}!</h1>
                {coachRequests}                
                {coachList}
            </section>
        )
    }
}

function mapStateToProps(state) {
    const { coaches, coachRequests } = state.coach
    return {
        username: state.users.userData.username,
        coaches,
        coachRequests
    }
}


export default connect(mapStateToProps, { getCoaches, denyCoach, approveCoach, getAdminInfo })(AdminManager)