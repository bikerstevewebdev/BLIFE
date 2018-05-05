import React from 'react'
// import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'

function ExternalFoodCard(props) {
    const { name, p, c, f, fib, img, addFood } = props
    let truImg = img
    if(img && img.slice(0, 22) === "https://d2xdmhkmkbyw75"){
        truImg = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=de4c158f22af1fe9c21fbb0effd2d30d&auto=format&fit=crop&w=500&q=60"
    }else if(img && img.slice(0, 21) === "https://d2eawub7utcl6"){
        truImg = "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f24c844d6944b8d3c47c372fbbfc0a11&auto=format&fit=crop&w=500&q=60"
    }
    return(
        <Card style={{width: "20%"}} >
            <CardMedia  >
                <img src={truImg} alt={name} />
            </CardMedia>
            <CardTitle title={name} />
            <CardText>
            <p>Protein: {p}</p>
            <p>Carbs: {c}</p>
            <p>Fat: {f}</p>
            <p>Fiber: {fib}</p>
            </CardText>
            <CardActions>
                <FlatButton label="Details" onClick={() => addFood(name, p, c, f, fib, truImg, true)}>Add Name</FlatButton>
                <FlatButton label="Archive" />
            </CardActions>
        </Card>
    )
}
export default ExternalFoodCard


        