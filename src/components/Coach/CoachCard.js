import React from 'react'
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'
import { revokeCoach } from '../../ducks/coachReducer'

function CoachCard(props) {
    const { coach_id, fullname, last_login, revokeCoach } = this.props
    return(
        <section className="coach-card">
            <h3>{props.fullname}</h3>
            <p>Last Login: {props.last_login}</p>
            <button onClick={() => revokeCoach(coach_id)}>Revoke Coach Access</button>
            {/* <Link to={`/coach/${props.user_id}`}><button>Go to client's page</button></Link> */}
        </section>
    )
}
export default connect(null, { revokeCoach })(CoachCard)