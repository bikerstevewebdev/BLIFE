import React from 'react'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import { connect } from 'react-redux'
import { archiveMenu } from '../../ducks/userReducer'


function UserMenuCard(props) {
    const { menu_id, title, total_p, total_c, total_f, total_fib, img, assigned, user_menu_id, archiveMenu } = props
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
                {
                    assigned
                    ?
                    null
                    :
                    <FlatButton onClick={() => archiveMenu(user_menu_id)} label="Archive" />
                }
            </CardActions>
        </Card>
          )
        
    
}
export default connect(null, { archiveMenu })(UserMenuCard)
