import React from 'react'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import { connect } from 'react-redux'
import { archiveWorkout } from '../../ducks/userReducer'

function UserWorkoutCard(props) {
    const { workout_id, title, img, type, user_workout_id, archiveWorkout, assigned } = props
    return(
        <Card style={{backgroundColor: "#fcfcfc", maxWidth: "225px", maxHeight: "20em", width: "100%"}} >
            <CardMedia style={{overflow: "hidden", height: "10.5em"}} >
                <img src={img} alt={title} />
            </CardMedia>
            <CardTitle style={{padding: "0.5em"}} title={title} />
            <CardText style={{padding: "0.5em"}}>
                <p>Type: {type}</p>
            </CardText>
            <CardActions style={{padding: "0.5em"}}>
                <Link to={`/workout/${workout_id}`}><FlatButton label="Details" /></Link>
                {
                    assigned
                    ?
                    null
                    :
                    <FlatButton onClick={() => archiveWorkout(user_workout_id)} label="Archive" />
                }
            </CardActions>
        </Card>
    )
}
export default connect(null, { archiveWorkout })(UserWorkoutCard)



