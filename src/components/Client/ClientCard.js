import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { getClientData } from '../../ducks/coachReducer'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'

function ClientCard(props) {
    const sendToPage = (id, mes_id) => {
        props.getClientData(id, mes_id)
        props.history.push(`/clientManager/${id}`)
    }
    const { username, fullname, last_login, client_coach_id, img, curr_mes_id } = props
    return(
        <Card containerStyle={{height: "100%"}} style={{backgroundColor: "#fff", maxWidth: "350px", height: "23em", width: "100%", display: "flex", flexDirection: "column"}} key={username} className="client-card">
            <CardMedia style={{overflow: "hidden", height: "12.5em"}} >
                <img src={img} alt={fullname} />
            </CardMedia>
            <CardTitle style={{height: "4.5em"}} title={fullname}/>
            <CardText style={{height: "3.75em", padding: "0 0.5em", display: "flex"}} >
                <p>Last Login: {new Date(last_login).toDateString().slice(0, 15)}</p>
            </CardText>
            <CardActions style={{padding: "0 0.5em"}} >
                <FlatButton  fullWidth onClick={() => sendToPage(client_coach_id, curr_mes_id)} secondary={true} label={`Go to ${username}'s page`} />
            </CardActions>
        </Card>
    )
}
export default connect(null, { getClientData })(ClientCard)