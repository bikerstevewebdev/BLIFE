import React from 'react'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'

function ClientWorkoutCard(props) {
    const { workout_id, title, img, type, cc_id, uw_id, removeFn } = props
    return(
        <Card style={{backgroundColor: "#fcfcfc", maxWidth: "350px", maxHeight: "23em", width: "100%"}}>
            <CardMedia style={{overflow: "hidden", height: "12.5em"}} >
                <img src={img} style={{height: "100%"}} alt={title} />
            </CardMedia>
            <CardTitle style={{padding: "0.5em"}}  title={title} />
            <CardText style={{padding: "0.5em"}} >
                <p>Type: {type}</p>
            </CardText>
            <CardActions style={{padding: "0.5em"}} >
                <Link to={`/workout/${workout_id}`}><FlatButton label="Details" /></Link>
                <FlatButton onClick={() => removeFn(cc_id, uw_id)} label="Remove From Client" />
            </CardActions>
        </Card>
        
    )
}
export default ClientWorkoutCard



