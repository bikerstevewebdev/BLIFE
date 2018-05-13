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
    const titleStyles = {
        display: "flex",
        justifyContent: "center",
        margin: "0",
        letterSpacing: "3px",
        position: "fixed",
        width: "16%",
        left: "42%",
        overflow: "visible",
        fontSize: "3.5rem"
    }
    const rightStyles = {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%"
    }
    const profileBtnStyles = {
        display: "flex",
        alignItems: "center"
    }
    const iconStyles = { 
        width: "100%", height: "100%", color: "#eee"
    }
    const iconBtnStyles = { 
        margin: "0.45rem", padding: "0", width: "1.8rem", height: "1.8rem"
    }
    const styles = {display: "flex", padding: "2em", width: "100%", justifyContent: "space-between", height: "100%", alignItems: "center", backgroundColor: "#377D3D", backgroundImage: "linear-gradient(to top, #074b19, #0b641c, #177e1b, #279815, #3bb300)"}
    const home = (
        <section>
            <IconButton iconStyle={{...iconStyles}} onClick={() => props.history.push("/dashboard")} style={{iconBtnStyles}} tooltip="Dashboard">
                    <ActionHome />
            </IconButton>
            {
                props.coach_req_info.client_coach_id
                ?
                <IconButton tooltip="Coach Request" iconStyle={{...iconStyles}} style={{iconBtnStyles}} onClick={() => props.toggleCoachReqModal(true)} >
                    <Chat />
                </IconButton>
                :
                null
            }
        </section>
    )
    const rightIcons = (
        <section style={rightStyles} className="icons">
            {
                props.userData.is_admin
                ?
                <IconButton tooltip="Coach Manager" iconStyle={{...iconStyles}} style={{iconBtnStyles}} onClick={() => props.history.push('/adminManager')}>
                    <Admin />
                </IconButton>
                :
                null
            }
            {
                props.userData.coach_id > 0
                ?
                <IconButton iconStyle={{...iconStyles}} style={{iconBtnStyles}} tooltip="Client Manager" onClick={() => props.history.push('/coachManager')}>
                    <Admin />
                </IconButton>
                :
                null
            }
            <IconButton iconStyle={{...iconStyles}} style={{iconBtnStyles}} tooltip="Find Your Why" onClick={() => props.toggleMotivationalModal(true)}>
                <Happy />
            </IconButton>
            <IconButton tooltip="Logout" iconStyle={{...iconStyles}} style={{iconBtnStyles}} onClick={props.logoutUser}>
                <Logout />
            </IconButton>
            <IconButton tooltip="Navigator" iconStyle={{...iconStyles}} style={{iconBtnStyles}} onClick={() => props.toggleSideNav(true)}>
                <ChromeReader />
            </IconButton>
            <FlatButton style={{margin: "0.45rem"}} tooltip="Profile" >
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
                    <AppBar onTitleClick={() => props.history.push('/dashboard')} iconElementLeft={home} title={<h1 style={{webkitTextFillColor: "white", webkitTextStrokeWidth: "0.45px", webkitTextStrokeColor: "#000000", cursor: "pointer"}}>BalancedLIFE</h1>} titleStyle={titleStyles} style={styles} iconElementRight={rightIcons}/>
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