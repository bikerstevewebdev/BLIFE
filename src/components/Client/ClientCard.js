import React from 'react'
import { Link } from 'react-router-dom'

function ClientCard() {
    return(
        <section className="client-card">
            <h3>{props.fullname}</h3>
            <p>Last Login: {props.last_login}</p>
            <Link to={`/client/${props.user_id}`}><button>Go to client's page</button></Link>
        </section>
    )
}
export default ClientCard