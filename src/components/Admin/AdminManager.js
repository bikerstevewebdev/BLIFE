import React, { Component } from 'react'
import { connect } from 'react-redux';
import { denyCoach, approveCoach, getAdminInfo, revokeCoach } from '../../ducks/coachReducer'
import CoachCard from '../Coach/CoachCard'
import RaisedButton from 'material-ui/RaisedButton'
import { red500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

class AdminManager extends Component{
    constructor(){
        super()
        this.state = {
            revokeModalOpen: false,
            coachInQuestion: '',
            coachInQuestionId: 0
        }
    }

    componentDidMount(){
        this.props.getAdminInfo()
    }

    areYouSure(coachName, coachId){
        this.setState({
            revokeModalOpen: true,
            coachInQuestion: coachName,
            coachInQuestionId: coachId
        })
    }

    clearRevokationRequest() {
        this.setState({
            revokeModalOpen: false,
            coachInQuestion: '',
            coachInQuestionId: 0
        })
    }

    finalizeRevokation() {
        this.props.revokeCoach(this.state.coachInQuestionId, this.state.coachInQuestion)
        this.setState({
            revokeModalOpen: false,
            coachInQuestion: '',
            coachInQuestionId: 0
        })
    }


    render() {
        const { coachInQuestion } = this.state,
              { username, coachReqs, activeCoaches, approveCoach, denyCoach } = this.props,
              coachRequests = coachReqs.map(req => {
                  return (
                      <section key={req.req_id} className="coach-request">
                        <p>Request Number: {req.req_id}</p>
                        <p>Username: {req.username}</p>
                        <RaisedButton secondary={true} onClick={() => denyCoach(req.req_id, req.user_id)} label="Deny Request"/>
                        <RaisedButton secondary={true} onClick={() => approveCoach(req.req_id, req.user_id)}label="Approve Request"/>
                      </section>
                  )
              }),
              coachList = activeCoaches.map(coach => <CoachCard profile_pic={coach.profile_pic} key={coach.coach_id} fullname={coach.fullname} areYouSure={this.areYouSure.bind(this)} last_login={coach.last_login/1} coach_id={coach.coach_id}/>)
        return (
            <section className="comp coach-manager">
                <h1>Welcome Manager {username}!</h1>
                {coachRequests}                
                {coachList}
                <Dialog open={this.state.revokeModalOpen} className="coach-req-modal">
                    <p>Are you sure you want to revoke coach {coachInQuestion}'s coach acces? This cannot be undone.</p>
                    <RaisedButton style={{backgroundColor: red500}} label={`Yes, revoke ${coachInQuestion}'s coach access.`} onClick={this.finalizeRevokation.bind(this)} />
                    <FlatButton onClick={this.clearRevokationRequest.bind(this)} label={`No, my mistake, ${coachInQuestion} is a good coach.`} />
                </Dialog>
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


export default connect(mapStateToProps, { denyCoach, approveCoach, getAdminInfo, revokeCoach })(AdminManager)