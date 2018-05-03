import React from 'react'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

function ClientCard(props) {
    return(
        <section className="client-card">
            <h3>{props.fullname}</h3>
            <p>Last Login: {props.last_login}</p>
            <Link to={`/client/${props.client_id}`}><RaisedButton secondary={true}>Go to client's page</RaisedButton></Link>
        </section>
    )
}
export default ClientCard