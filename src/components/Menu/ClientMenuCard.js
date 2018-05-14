import React from 'react'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'


function ClientMenuCard(props) {
    const { menu_id, title, total_p, total_c, total_f, cc_id, total_fib, img, um_id, removeFn } = props
    return(
        <Card style={{backgroundColor: "#fff", maxWidth: "350px", maxHeight: "23em", width: "100%"}}>
            <CardMedia style={{overflow: "hidden", height: "12.5em"}} >
                <img src={img} style={{height: "100%"}} alt={title} />
            </CardMedia>
            <CardTitle style={{padding: "0.5em"}}  title={title} />
            <CardText style={{padding: "0.5em"}}>
                    {`P: ${total_p}g C: ${total_c} F: ${total_f}g Fib: ${total_fib}g`}
            </CardText>
            <CardActions style={{padding: "0.5em"}}>
                <Link to={`/menu/${menu_id}`}><FlatButton label="Details" /></Link>
                <FlatButton onClick={() => removeFn(cc_id, um_id)} label="Remove From Client" />
            </CardActions>
        </Card>
          )
        
    
}
export default ClientMenuCard