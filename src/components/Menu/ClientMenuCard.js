import React from 'react'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import { removeClientMenu } from '../../ducks/coachReducer'
import { connect } from 'react-redux'


function ClientMenuCard(props) {
    const { menu_id, title, total_p, total_c, total_f, cc_id, total_fib, img, um_id } = props
    return(
        <Card style={{maxWidth: "350px", width: "100%"}} >
            <CardMedia  >
                <img src={img} style={{height: "12.5em"}} alt={title} />
            </CardMedia>
            <CardTitle title={title} />
            <CardText>
                    {`P: ${total_p}g C: ${total_c} F: ${total_f}g Fib: ${total_fib}g`}
            </CardText>
            <CardActions>
                <Link to={`/menu/${menu_id}`}><FlatButton label="Details" /></Link>
                <FlatButton onClick={() => removeClientMenu(cc_id, um_id)} label="Remove From Client" />
            </CardActions>
        </Card>
          )
        
    
}
export default connect(null, { removeClientMenu})(ClientMenuCard)