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
                      <section style={{width: "100%", borderRadius: "5px", boxShadow: "rgb(29, 39, 41) 0px 2px 1px 1px", backgroundColor: "rgba(236, 234, 255, 0.76)"}} key={req.req_id} className="coach-request">
                        <p>Request Number: {req.req_id}</p>
                        <p>Username: {req.username}</p>
                        <RaisedButton stye={{width: "70%"}} secondary={true} onClick={() => denyCoach(req.req_id, req.user_id)} label="Deny Request"/>
                        <RaisedButton stye={{width: "70%"}} secondary={true} onClick={() => approveCoach(req.req_id, req.user_id)}label="Approve Request"/>
                      </section>
                  )
              }),
              coachList = activeCoaches.map(coach => <CoachCard profile_pic={coach.profile_pic} key={coach.coach_id} fullname={coach.fullname} areYouSure={this.areYouSure.bind(this)} last_login={coach.last_login/1} coach_id={coach.coach_id}/>)
            const layoutStyles = {
                display: "grid",
                width: "100%",
                textAlign: "center",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "10em",
                alignItems: "center",
                gridGap: "0.5em",
                padding: "5%",
                boxShadow: "rgb(29, 39, 41) 0px 2px 1px 1px",
                borderRadius: "3px",
                width: "auto",
                backgroundColor: "rgba(236, 234, 255, 0.76)"
            }
             const subStyles = {gridGap: "0.75em", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", justifyItems: "center", width: "100%"}

        return (
            <section style={{...layoutStyles}} className="comp coach-manager">
                <h1 style={{fontSize: "3em", gridColumn: "1/5"}} >Welcome Manager {username}!</h1>
                <section style={{...subStyles, gridColumn: "1/3"}}>
                    {coachRequests}                
                </section>
                <section style={{...subStyles, gridColumn: "3/5"}}>
                    {coachList}
                </section>
                <Dialog open={this.state.revokeModalOpen} className="coach-req-modal">
                    <p>Are you sure you want to revoke coach {coachInQuestion}'s coach acces? This cannot be undone.</p>
                    <RaisedButton stye={{width: "70%"}} label={`Yes, revoke ${coachInQuestion}'s coach access.`} onClick={this.finalizeRevokation.bind(this)} />
                    <FlatButton stye={{width: "70%"}} onClick={this.clearRevokationRequest.bind(this)} label={`No, my mistake, ${coachInQuestion} is a good coach.`} />
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