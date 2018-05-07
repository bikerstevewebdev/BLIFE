import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deprecatePhoto } from '../../ducks/userReducer';
import RaisedButton from 'material-ui/RaisedButton'

// import { Link } from 'react-router-dom'

function PhotoCard(props) {
    const cardStyles = {
        width: "100%",
        height: "100%",
        display: "flex",
        boxShadow: "1px 1px 2px 0px rgb(25, 39, 31)",
        borderRadius: "3px",
        backgroundColor: "#99d066"
        // justifySelf: "stretch"
        // flexDirection: "column",
        // flexWrap: "wrap"
    }
    const infoStyles = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
        width: "100%"
    }
    return(
        <section style={{...cardStyles}} className="photo-card">
            <section style={{justifySelf: "stretch", height: "100%"}}>
                <Link to='/dashboard'><img style={{height: "100%", borderRadius: "3px 0 0 3px"}} src={props.src} alt={props.alt} /></Link>
            </section>
            <section style={{...infoStyles}}>
                <p>Date Added: {props.date_added.slice(0, 10)}</p>
                <RaisedButton secondary={true} onClick={() => props.deprecatePhoto(props.photo_id)}>This photo is old, archive it</RaisedButton>
            </section>
        </section>
    )
}
export default connect(null, { deprecatePhoto })(PhotoCard)