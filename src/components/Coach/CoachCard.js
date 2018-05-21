import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

function CoachCard(props) {
    const { coach_id, fullname, last_login, areYouSure, profile_pic } = props
    return(
        <section style={{boxShadow: "rgb(29, 39, 41) 0px 1px 1px 1px", padding: "0.25em", backgroundColor: "rgba(175, 210, 220, 0.76)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around"}} className="coach-card">
            <img style={{margin: "0.5em", justifySelf: "end", width: "150px", height: "150px", borderRadius: "50%", overFlow: "hidden", boxShadow: "rgb(29, 39, 41) 0px 1px 1px 1px", padding: "0.25em", backgroundColor: "rgba(236, 234, 255, 0.76)"}} src={profile_pic} alt={fullname}/>
            <h3 style={{margin: "0.5em"}}>{props.fullname}</h3>
            <p style={{margin: "0.5em"}}>Last Login: {new Date(last_login).toDateString().slice(0, 15)}</p>
            <RaisedButton backgroundColor="rgb(218, 5, 5)" labelColor="white" onClick={() => areYouSure(fullname, coach_id)} label="Revoke Coach Access"/>
        </section>
    )
}
export default CoachCard