import React from 'react'
import { Link } from 'react-router-dom'
// import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'

function WorkoutCard(props) {
    const { workout_id, title, img, type } = props
    return(
        <Card style={{width: "20%"}} >
            <CardMedia  >
                <img src={img} alt={title} />
            </CardMedia>
            <CardTitle title={title} />
            <CardText>
                <p>Type: {type}</p>
            </CardText>
            <CardActions>
                <Link to={`/menu/${workout_id}`}><FlatButton label="Details" /></Link>
                <FlatButton label="Archive" />
            </CardActions>
        </Card>
        
    )
}
export default WorkoutCard



