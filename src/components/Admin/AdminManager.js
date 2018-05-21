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
                      <section style={{height: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent
                      : "space-between", width: "90%", borderRadius: "15px", boxShadow: "rgb(29, 39, 41) 0px 1px 1px 1px", padding: "0.25em", backgroundColor: "rgba(219, 255, 0, 0.76)"}} key={req.req_id} className="coach-request">
                        <img src={req.profile_pic} style={{borderRadius: "5px", height: "150px", width: "150px"}} alt={req.username}/>
                        <p>Request Number: {req.req_id}</p>
                        <p style={{fontSize: "1.25em"}}>Username: {req.username}</p>
                        <RaisedButton style={{width: "75%", marginTop: "0.25em"}} secondary={true} onClick={() => denyCoach(req.req_id, req.user_id)} label="Deny Request"/>
                        <RaisedButton style={{width: "75%", marginTop: "0.25em"}} secondary={true} onClick={() => approveCoach(req.req_id, req.user_id)}label="Approve Request"/>
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
                    <h2 style={{padding: "0.5em", color: "#000000c2", gridColumn: "1/3", width: "100%", textAlign: "center", fontSize: "1.5em"}}>Coach Requests</h2>
                    {coachRequests}                
                </section>
                <section style={{...subStyles, alignSelf: "start", gridColumn: "3/5"}}>
                    <h2 style={{padding: "0.5em", color: "#000000c2", gridColumn: "1/3", width: "100%", textAlign: "center", fontSize: "1.5em"}}>Active Coaches</h2>
                    {coachList}
                </section>
                <Dialog bodyStyle={{display:"flex", justifyContent: "space-around", flexDirection: "column", alignItems: "center", width: "100%"}} open={this.state.revokeModalOpen} className="coach-req-modal">
                    <p style={{fontSize: "1.5em", textAlign: "center", margin: "0.5em"}}>Are you sure you want to revoke coach {coachInQuestion}'s coach access? This cannot be undone.</p>
                    <RaisedButton backgroundColor="rgb(218, 5, 5)" labelColor="white" style={{margin: "0.5em", width: "70%"}} label={`Yes, revoke ${coachInQuestion}'s coach access.`} onClick={this.finalizeRevokation.bind(this)} />
                    <RaisedButton primary={true} style={{margin: "0.5em", width: "70%"}} onClick={this.clearRevokationRequest.bind(this)} label={`No, my mistake, ${coachInQuestion} is a good coach.`} />
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