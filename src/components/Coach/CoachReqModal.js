import React from 'react'
import { connect } from 'react-redux'
import { toggleCoachReqModal, acceptCoachRequest } from '../../ducks/coachReducer'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

function CoachReqModal(props) {
    const sendAccept = () => {
        props.acceptCoachRequest(props.coach_req_info.client_coach_id)
        props.toggleCoachReqModal(false)
    }
    return(
        <Dialog open={props.coachReqModalOpen} className="coach-req-modal">
            <p>{props.coach_req_info.fullname} is requesting your approval to coach you.</p>
            <RaisedButton primary={true} label="Accept" onClick={sendAccept} />
            <FlatButton onClick={() => props.toggleCoachReqModal(false)} label="close" />
        </Dialog>
    )
}

function mapStateToProps(state) {
    return {
        coachReqModalOpen: state.coach.coachReqModalOpen,
        coach_req_info: state.coach.coach_req_info
    }
}

export default connect(mapStateToProps, { toggleCoachReqModal, acceptCoachRequest })(CoachReqModal)