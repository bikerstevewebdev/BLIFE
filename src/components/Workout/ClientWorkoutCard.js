import React from 'react'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import { removeClientWorkout } from '../../ducks/coachReducer'
import { connect } from 'react-redux'

function ClientWorkoutCard(props) {
    const { workout_id, title, img, type, cc_id, uw_id } = props
    return(
        <Card style={{maxWidth: "350px", width: "100%"}} >
            <CardMedia style={{height: "12.5em"}} >
                <img src={img} alt={title} />
            </CardMedia>
            <CardTitle title={title} />
            <CardText>
                <p>Type: {type}</p>
            </CardText>
            <CardActions>
                <Link to={`/workout/${workout_id}`}><FlatButton label="Details" /></Link>
                <FlatButton onClick={() => removeClientWorkout(cc_id, uw_id)} label="Remove From Client" />
            </CardActions>
        </Card>
        
    )
}
export default connect(null, { removeClientWorkout })(ClientWorkoutCard)



