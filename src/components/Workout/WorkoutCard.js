import React from 'react'
import { Link } from 'react-router-dom'

function WorkoutCard(props) {
    const { workout_id, title, img, type } = props
    return(
        <section className="menu-card">
            <h3>{title}</h3>
            <img src={img} alt={title} />
            <p>Type: {type}</p>
            <Link to={`/workout/${workout_id}`}><button>View {title} Details</button></Link>
        </section>
    )
}
export default WorkoutCard