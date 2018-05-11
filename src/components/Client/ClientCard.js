import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { getClientData } from '../../ducks/coachReducer'
import { connect } from 'react-redux'

function ClientCard(props) {
    const sendToPage = (id) => {
        props.getClientData(id)
        props.history.push(`/clientManager/${id}`)
    }
    const { username, fullname, last_login, client_coach_id, img } = props
    return(
        <section className="client-card">
            <h3>{fullname}</h3>
            <p>Last Login: {new Date(last_login).toDateString().slice(0, 15)}</p>
            <img src={img} alt={username} />
            <RaisedButton onClick={() => sendToPage(client_coach_id)} secondary={true} label={`Go to ${username}'s page`} />
        </section>
    )
}
export default connect(null, { getClientData })(ClientCard)