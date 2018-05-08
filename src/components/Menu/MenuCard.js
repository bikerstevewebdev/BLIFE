import React from 'react'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
// import { Card, Image } from 'semantic-ui-react'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
// import SvgIcon from 'material-ui/SvgIcon';




function MenuCard(props) {
    const { menu_id, title, total_p, total_c, total_f, total_fib, img, btn2Label, btn2Fn, user_menu_id } = props
    // const extra = (
    //     <a>
    //       <Icon name='numbered list' />
    //      {`P: ${total_p}g, C: ${total_c}, F: ${total_f}g, Fib: ${total_fib}g`}
    //     </a>
    //   )
    return(
        <Card style={{width: "100%"}} >
            <CardMedia  >
                <img src={img} style={{height: "12.5em"}} alt={title} />
            </CardMedia>
            <CardTitle title={title} />
            <CardText>
                <Link to={`/menu/${menu_id}`}>
                    {`P: ${total_p}g C: ${total_c} F: ${total_f}g Fib: ${total_fib}g`}
                </Link>
            </CardText>
            <CardActions>
                <Link to={`/menu/${menu_id}`}><FlatButton label="Details" /></Link>
                <FlatButton onClick={() => btn2Fn(user_menu_id || menu_id)} label={btn2Label} />
            </CardActions>
        </Card>
          )
        
    
}
export default MenuCard

            // <Card raised={true} style={{maxHeight: "300px", boxShadow: "1px 1px 2px 0px rgb(25, 39, 31)", borderRadius: "3px", backgroundColor: "#99d066", width: "20%", display: "flex", flexDirection: "column"}}>
            //     <Image style={{maxHeight: "200px", overflow: "hidden", width: "100%"}} src={img} />
            //     <Card.Content style={{padding: "0.5em", display: "flex", flexDirection: "column", justifyContent: "spaceBetween"}}>
            //         <Card.Content>
            //             <Card.Header as="h4">
            //                 {title}
            //             </Card.Header>
            //             <Card.Meta style={{fontSize: "0.85em"}}>
            //                 <p style={{color: "grey", fontStyle: "italic"}} >Created by:</p>
            //                 <p >Author</p>
            //             </Card.Meta>
            //             <Card.Description>
            //                 {`Some meals in this menu: meals, mealsss, and more meals.`}
            //             </Card.Description>
            //         </Card.Content>
            //         <Card.Content style={{display: "flex", justfyContent: "spaceBetween", fontSize: "0.9em"}} extra>
            //             <SvgIcon name='numbered list' />
            //             <Link to={`/menu/${menu_id}`}>
            //                 {`P: ${total_p}g, C: ${total_c}, F: ${total_f}g, Fib: ${total_fib}g`}
            //             </Link>
            //         </Card.Content>
            //     </Card.Content>
            // </Card>