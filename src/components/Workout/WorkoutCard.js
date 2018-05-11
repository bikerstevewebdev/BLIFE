import React from 'react'
import { Link } from 'react-router-dom'
// import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'

function WorkoutCard(props) {
    const { workout_id, title, img, type, arg1, btn2Label, btn2Fn, user_workout_id } = props
    return(
        <Card style={{width: "100%"}} >
            <CardMedia style={{height: "12.5em"}} >
                <img src={img} alt={title} />
            </CardMedia>
            <CardTitle title={title} />
            <CardText>
                <p>Type: {type}</p>
            </CardText>
            <CardActions>
                <Link to={`/workout/${workout_id}`}><FlatButton label="Details" /></Link>
                {
                    btn2Fn
                    ?
                    <FlatButton onClick={() => btn2Fn(arg1, workout_id)} label={btn2Label} />
                    :
                    null
                }
            </CardActions>
        </Card>
        
    )
}
export default WorkoutCard



