import React from 'react'
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'
import { revokeCoach } from '../../ducks/coachReducer'
import RaisedButton from 'material-ui/RaisedButton'

function CoachCard(props) {
    const { coach_id, fullname, last_login, revokeCoach, areYouSure, dblChk } = this.props
    return(
        <section className="coach-card">
            <h3>{props.fullname}</h3>
            <p>Last Login: {props.last_login}</p>
            <RaisedButton secondary={true} onClick={() => areYouSure(coach_id)}>Revoke Coach Access</RaisedButton>
            {
                dblChk > 0
                ?
                <section className="dbl-chk">
                    <p>Are you sure?</p>
                    <RaisedButton secondary={true} onClick={() => revokeCoach(coach_id)}>Yes, revoke {fullname}'s coach access.</RaisedButton>
                </section>
                :
                null
            }

            {/* <Link to={`/coach/${props.user_id}`}><button>Go to client's page</button></Link> */}
        </section>
    )
}
export default connect(null, { revokeCoach })(CoachCard)