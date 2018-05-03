import React from 'react'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

function WorkoutCard(props) {
    const { workout_id, title, img, type } = props
    return(
        <section className="menu-card">
            <h3>{title}</h3>
            <img src={img} alt={title} />
            <p>Type: {type}</p>
            <Link to={`/workout/${workout_id}`}><RaisedButton secondary={true} >View {title} Details</RaisedButton></Link>
        </section>
    )
}
export default WorkoutCard