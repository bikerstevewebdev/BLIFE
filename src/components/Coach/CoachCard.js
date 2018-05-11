import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

function CoachCard(props) {
    const { coach_id, fullname, last_login, areYouSure, profile_pic } = props
    return(
        <section className="coach-card">
            <img style={{justifySelf: "end", width: "150px", height: "150px", borderRadius: "50%", overFlow: "hidden", /*gridArea: "1/1/2/2"*/}} src={profile_pic} alt={fullname}/>
            <h3>{props.fullname}</h3>
            <p>Last Login: {new Date(last_login).toDateString().slice(0, 15)}</p>
            <RaisedButton secondary={true} onClick={() => areYouSure(fullname, coach_id)} label="Revoke Coach Access"/>
        </section>
    )
}
export default CoachCard