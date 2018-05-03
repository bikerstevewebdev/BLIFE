import React from 'react'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'
// import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'



const contStyles = {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "7fr 1fr",
    justifyItems: "center"
}
const authorStyle = {
    display: "flex",
    flexDirection: "column",
    gridRow: "2 / 3",
    textAlign: "center",
    fontSize: "0.85em"
}
const mainStyles = {
    padding: "0.5em",
    textAlign: "center",
    gridRow: "1 / 2",
    gridColumn: "2 / 3"    
}
const smallStyles = {
    margin: "0.5em 0"
}
const cardStyles = {
    backgroundColor: "#e64a19a6",
    padding: "0.5em",
    width: "25%",
    borderRadius: "3px",
    boxShadow: "1px 1px 2px 0px #bd7a7a"
    
}
const mediaStyles = {
    width: "100%",
}
function MenuCard(props) {
    const { menu_id, title, total_p, total_c, total_f, total_fib, img } = props
    return(
        <section style={cardStyles}>
            <section style={contStyles}>
                <section style={mediaStyles}>
                    <img style={mediaStyles} src={img} alt={title} />
                </section>
                <section style={authorStyle}>
                    <p>Created by:</p>
                    <p>Author</p>
                </section>
                <section style={mainStyles}>
                    <h4 style={smallStyles}>{title}</h4>
                    <p style={smallStyles}>Total Protein: {total_p}</p>
                    <p style={smallStyles}>Total Carbs: {total_c}</p>
                    <p style={smallStyles}>Total Fat: {total_f}</p>
                    <p style={smallStyles}>Total Fiber: {total_fib}</p>
                </section>
                <Link style={{gridRow: "3 / 4", gridColumn: "1 / 2"}} to={`/menu/${menu_id}`}><FlatButton label="Details" /></Link>
                <FlatButton style={{gridRow: "3 / 4", gridColumn: "2 / 3"}} label="Archive" />
            </section>
        </section>
        
    )
}
export default MenuCard
