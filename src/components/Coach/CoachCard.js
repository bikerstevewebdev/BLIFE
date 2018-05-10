import React from 'react'
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'
import { revokeCoach } from '../../ducks/coachReducer'
import RaisedButton from 'material-ui/RaisedButton'

function CoachCard(props) {
    const { coach_id, fullname, last_login, revokeCoach, areYouSure, dblChk, profile_pic, nullifyRevokationRequest } = props
    return(
        <section className="coach-card">
            <img style={{justifySelf: "end", width: "150px", height: "150px", borderRadius: "50%", overFlow: "hidden", /*gridArea: "1/1/2/2"*/}} src={profile_pic} alt={fullname}/>
            <h3>{props.fullname}</h3>
            <p>Last Login: {props.last_login}</p>
            <RaisedButton secondary={true} onClick={() => areYouSure(coach_id)} label="Revoke Coach Access"/>
            {
                dblChk > 0
                ?
                <section className="dbl-chk">
                    <p>Are you sure?</p>
                    <RaisedButton secondary={true} onClick={() => revokeCoach(coach_id)} label={`Yes, revoke ${fullname}'s coach access.`}/>
                    <RaisedButton secondary={true} onClick={() => nullifyRevokationRequest(coach_id)} label={`No, my mistake, ${fullname} is a good coach.`}/>
                </section>
                :
                null
            }

            {/* <Link to={`/coach/${props.user_id}`}><button>Go to client's page</button></Link> */}
        </section>
    )
}
export default connect(null, { revokeCoach })(CoachCard)