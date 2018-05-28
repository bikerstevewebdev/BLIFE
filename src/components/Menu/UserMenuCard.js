import React from 'react'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import { connect } from 'react-redux'
import { archiveMenu } from '../../ducks/userReducer'
import { IconButton } from 'material-ui';
import Archive from 'material-ui/svg-icons/action/exit-to-app'
import Info from 'material-ui/svg-icons/action/info'
import './Menu.css'


function UserMenuCard(props) {
    const { menu_id, title, total_p, total_c, total_f, total_fib, img, assigned, user_menu_id, archiveMenu } = props
    return(
        <section className="menu-card order-1-card">
            <div className="card-left-side">
                <img src={img} alt={title}/>
                <p>Author</p>
            </div>
            <div className="card-content">
                <div className="card-head">
                    <h2>{title}</h2>
                </div>
                <div className="card-info">
                    <p>{`P: ${total_p}g`}</p>
                    <p>{`C: ${total_c}g`}</p>
                    <p>{`F: ${total_f}g`}</p>
                    <p>{`Fib: ${total_fib}g`}</p>
                </div>
            </div>
            <div className="actions">
                <Link to={`/menu/${menu_id}`}><IconButton tooltip="Details"><Info/></IconButton></Link>
                {
                    assigned
                    ?
                    null
                    :
                    <IconButton tooltip="Archive" onClick={() => archiveMenu(user_menu_id)} ><Archive /></IconButton>
                }
            </div>
        </section>
        )
        
    
}
export default connect(null, { archiveMenu })(UserMenuCard)


        // <Card style={{backgroundColor: "#fcfcfc", maxWidth: "225px", maxHeight: "20em", width: "100%"}} >
        //     <CardMedia style={{overflow: "hidden", height: "10.5em"}} >
        //         <img src={img} style={{height: "100%"}} alt={title} />
        //     </CardMedia>
        //     <CardTitle style={{padding: "0.5em"}} title={title} />
        //     <CardText style={{padding: "0.5em"}}>
        //             {`P: ${total_p}g C: ${total_c} F: ${total_f}g Fib: ${total_fib}g`}
        //     </CardText>
        //     <CardActions style={{padding: "0.5em"}}>
        //         <Link to={`/menu/${menu_id}`}><FlatButton label="Details" /></Link>
        //         {
        //             assigned
        //             ?
        //             null
        //             :
        //             <FlatButton onClick={() => archiveMenu(user_menu_id)} label="Archive" />
        //         }
        //     </CardActions>
        // </Card>