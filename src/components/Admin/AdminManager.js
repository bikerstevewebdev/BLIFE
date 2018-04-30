import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getCoaches, denyCoach, approveCoach, getAdminInfo } from '../../ducks/coachReducer'
import CoachCard from '../Coach/CoachCard'

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


    render() {
        const { clientEmailInput, dblChk } = this.state,
              { username, searchForClient, coachReqs, coaches, approveCoach, denyCoach } = this.props,
              coachReqs = coachReqs.map(req => {
                  return (
                      <section className="coach-request">
                        <p>Request Number: {req.req_id}</p>
                        <p>Username: {req.username}</p>
                        <button onClick={() => denyCoach(req.req_id, req.user_id)}>Deny Request</button>
                        <button onClick={() => approveCoach(req.req_id, req.user_id)}>Approve Request</button>
                      </section>
                  )
              }),
              coachList = coaches.map(client => <CoachCard fullname={coach.fullname} areYouSure={this.areYouSure} dblChk={dblChk} last_login={coach.last_login} coach_id={coach.coach_id}/>)
        return (
            <section className="coach-manager">
                <h1>Welcome Manager {username}!</h1>
                {coachReqs}                
                {coachList}
            </section>
        )
    }
}

function mapStateToProps(state) {
    const { coaches, coachReqs } = state.coach
    return {
        username: state.users.userData.username,
        coaches,
        coachReqs
    }
}


export default connect(mapStateToProps, { getCoaches, denyCoach, approveCoach, getAdminInfo })(AdminManager)