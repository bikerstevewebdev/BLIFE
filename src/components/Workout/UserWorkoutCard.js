import React from 'react'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import { connect } from 'react-redux'
import { archiveWorkout } from '../../ducks/userReducer'
import { IconButton } from 'material-ui';
import Archive from 'material-ui/svg-icons/action/exit-to-app'
import Info from 'material-ui/svg-icons/action/info'

function UserWorkoutCard(props) {
    const { workout_id, title, img, type, user_workout_id, archiveWorkout, assigned } = props
    return(
        <section className="workout-card order-1-card">
            <div className="card-left-side">
                <img src={img} alt={title}/>
                <p>Author</p>
            </div>
            <div className="card-content">
                <div className="card-head">
                    <h2>{title}</h2>
                </div>
                <div className="card-info">
                    <p>Type: {type}</p>
                </div>
            </div>
            <div className="actions">
                <Link to={`/workout/${workout_id}`}><IconButton tooltip="Details"><Info/></IconButton></Link>
                {
                    assigned
                    ?
                    null
                    :
                    <IconButton tooltip="Archive" onClick={() => archiveWorkout(user_workout_id)} ><Archive /></IconButton>
                }
            </div>
        </section>
    )
}
export default connect(null, { archiveWorkout })(UserWorkoutCard)


        // <Card style={{backgroundColor: "#fcfcfc", maxWidth: "225px", maxHeight: "20em", width: "100%"}} >
        //     <CardMedia style={{overflow: "hidden", height: "10.5em"}} >
        //         <img src={img} alt={title} />
        //     </CardMedia>
        //     <CardTitle style={{padding: "0.5em"}} title={title} />
        //     <CardText style={{padding: "0.5em"}}>
        //         <p>Type: {type}</p>
        //     </CardText>
        //     <CardActions style={{padding: "0.5em"}}>
        //         <Link to={`/workout/${workout_id}`}><FlatButton label="Details" /></Link>
        //         {
        //             assigned
        //             ?
        //             null
        //             :
        //             <FlatButton onClick={() => archiveWorkout(user_workout_id)} label="Archive" />
        //         }
        //     </CardActions>
        // </Card>

