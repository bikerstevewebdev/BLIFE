import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import RaisedButton from 'material-ui/RaisedButton'
// import seaVid from '../../seaVid.mp4'
import ChromeReader from 'material-ui/svg-icons/action/chrome-reader-mode';
import Logout from 'material-ui/svg-icons/hardware/keyboard-return';
import Admin from 'material-ui/svg-icons/social/people';
import { toggleSideNav, logoutUser, toggleMotivationalModal } from '../../ducks/userReducer'
import { toggleCoachReqModal } from '../../ducks/coachReducer'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton';
import Happy from 'material-ui/svg-icons/social/sentiment-satisfied'
import Chat from 'material-ui/svg-icons/communication/chat';


function Nav(props) {
    const home = (
        <section>
            <IconButton tooltip="Dashboard">
                <Link to="/dashboard">
                    <ActionHome />
                </Link>
            </IconButton>
            {
                props.coach_req_info.client_coach_id
                ?
                <IconButton tooltip="Coach Request" onClick={() => props.toggleCoachReqModal(true)} >
                    <Chat />
                </IconButton>
                :
                null
            }
        </section>
    )
    const titleStyles = {
        display: "flex",
        justifyContent: "center",
        margin: "0",
        letterSpacing: "3px",
        position: "fixed",
        width: "13%",
        left: "42%"
    }
    const rightStyles = {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    }
    const profileBtnStyles = {
        display: "flex",
        alignItems: "center"
    }
    const styles = {display: "flex", padding: "2em", width: "100%", justifyContent: "space-between", height: "80px", alignItems: "center"}
    const rightIcons = (
        <section style={rightStyles} className="icons">
            {
                props.userData.is_admin
                ?
                <IconButton tooltip="Coach Manager" onClick={() => props.history.push('/adminManager')}>
                    <Admin />
                </IconButton>
                :
                null
            }
            {
                props.userData.coach_id > 0
                ?
                <IconButton tooltip="Client Manager" onClick={() => props.history.push('/coachManager')}>
                    <Admin />
                </IconButton>
                :
                null
            }
            <IconButton tooltip="Find Your Why" onClick={() => props.toggleMotivationalModal(true)}>
                <Happy />
            </IconButton>
            <IconButton tooltip="Logout" onClick={props.logoutUser}>
                <Logout />
            </IconButton>
            <IconButton tooltip="Navigator" onClick={() => props.toggleSideNav(true)}>
                <ChromeReader />
            </IconButton>
            <FlatButton tooltip="Profile" >
                <Link style={{...profileBtnStyles, color: "inherit"}} to='/profile'>
                    <Avatar icon={<PersonOutline />} size={35} src={props.userData.profile_pic} />
                    {props.userData.username}
                </Link>
            </FlatButton>
        </section>
    )
    return(
        
                props.isLoggedIn && props.userData.user_id > 0
            ?
                (<header className="nav-comp">
                    <AppBar onTitleClick={() => props.history.push('/dashboard')} iconElementLeft={home} title={<h1 style={{cursor: "pointer"}}>BalancedLIFE</h1>} titleStyle={titleStyles} style={styles} iconElementRight={rightIcons}/>
                </header>)
            :
                (<section className="unauthorized">
                <section className="message">
                    <h1>403 FORBIDDEN</h1>
                    <h1>RELISH IN THE WAVES OR TRY LOGGING IN</h1>
                    <a id="arg" href={process.env.REACT_APP_LOGIN}>
                        <RaisedButton primary={true} >Login</RaisedButton>
                    </a>
                </section>
                {/* <video autoPlay muted loop id="video-background"> */}
                {/* <video autoPlay muted loop id="video-background">
                    <source src={seaVid} type="video/mp4" />
                </video> */}
                {/* </video> */}
                <iframe title="forbidden" loop id="video-background" src="https://www.youtube.com/embed/qREKP9oijWI?autoplay=1&controls=0&showinfo=0" frameborder="0" allow="autoplay; encrypted-media" ></iframe>
            </section>)
        
    )
}

function mapStateToProps(state) {
    const { userData } = state.users
    const { coach_id } = userData
    return {
        isLoggedIn: state.users.isLoggedIn,
        coach_id,
        userData,
        coach_req_info: state.coach.coach_req_info,
        authWarningMsg: state.users.warningMsg,
        // coachWarningMsg: state.coach.warningMsg
    }
}

export default connect(mapStateToProps, { toggleSideNav, logoutUser, toggleMotivationalModal, toggleCoachReqModal })(Nav)


// https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en