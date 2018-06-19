import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import PersonOutline from 'material-ui/svg-icons/social/person-outline'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import RaisedButton from 'material-ui/RaisedButton'
import seaVid from '../../seaVid.mp4'
import ChromeReader from 'material-ui/svg-icons/action/chrome-reader-mode'
import Logout from 'material-ui/svg-icons/hardware/keyboard-return'
import Admin from 'material-ui/svg-icons/social/people'
import { toggleSideNav, logoutUser, toggleMotivationalModal } from '../../ducks/userReducer'
import { toggleCoachReqModal } from '../../ducks/coachReducer'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import Happy from 'material-ui/svg-icons/social/sentiment-satisfied'
import Chat from 'material-ui/svg-icons/communication/chat'
import Hamburg from 'material-ui/svg-icons/navigation/menu'
import './Nav.css'
import { Menu, IconMenu, MenuItem } from 'material-ui';

function Nav(props) {
    // if(!props.userData.isLoggedIn){
    //     props.history.push('/unauthorized')
    // }
    const logoutUser = () => {
        props.logoutUser()
        props.history.push('/')
    }
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
    
    const profileBtnStyles = {
        display: "flex",
        alignItems: "center"
    }
    const iconStyles = { 
        width: "100%", height: "100%", color: "#eee", width: "1.5rem", height: "1.5rem", padding: "0"
    }
    const iconBtnStyles = { 
        margin: "0.45rem", padding: "0"
    }
    const styles = {display: "flex", padding: "2em", width: "100%", justifyContent: "space-between", height: "100%", alignItems: "center", backgroundColor: "rgba(19, 131, 162, 0.56)", backgroundColor: "rgba(14, 99, 123, 0.68)"}
    const home = (
        <section>
            <IconButton tooltipStyles={{marginLeft: "0.375em"}} iconStyle={{...iconStyles, width: "2rem", height: "2rem"}} onClick={() => props.history.push("/dashboard")} style={{iconBtnStyles}} tooltip="Dashboard">
                    <ActionHome />
            </IconButton>
            {
                props.coach_req_info.client_coach_id
                ?
                <IconButton tooltipStyles={{marginLeft: "0.1em"}} tooltip="Coach Request" iconStyle={{...iconStyles}} style={{iconBtnStyles}} onClick={() => props.toggleCoachReqModal(true)} >
                    <Chat />
                </IconButton>
                :
                null
            }
        </section>
    )
    const profileAv = (
        <FlatButton className="profile-av-btn" style={{margin: "0.45rem"}} tooltip="Profile" >
                <Link style={{...profileBtnStyles, color: "#eee"}} to='/profile'>
                    <Avatar icon={<PersonOutline />} size={35} src={props.userData.profile_pic} />
                    {props.userData.username}
                </Link>
        </FlatButton>
    )
    const rightIcons = (
        <section className="right-icons desktop">
            {
                props.userData.is_admin
                ?
                <IconButton tooltipStyles={{marginLeft: "0.1em"}} tooltip="Coach Manager" iconStyle={{...iconStyles}} style={{iconBtnStyles}} onClick={() => props.history.push('/adminManager')}>
                    <Admin />
                </IconButton>
                :
                null
            }
            {
                props.userData.coach_id > 0
                ?
                <IconButton tooltipStyles={{marginLeft: "0.1em"}} iconStyle={{...iconStyles}} style={{iconBtnStyles}} tooltip="Client Manager" onClick={() => props.history.push('/coachManager')}>
                    <Admin />
                </IconButton>
                :
                null
            }
            <IconButton tooltipStyles={{marginLeft: "0.1em"}} iconStyle={{...iconStyles}} style={{iconBtnStyles}} tooltip="Find Your Why" onClick={() => props.toggleMotivationalModal(true)}>
                <Happy />
            </IconButton>
            <IconButton tooltipStyles={{marginLeft: "0.1em"}} tooltip="Logout" iconStyle={{...iconStyles}} style={{iconBtnStyles}} onClick={logoutUser}>
                <Logout />
            </IconButton>
            <IconButton tooltipStyles={{marginLeft: "0.1em"}} tooltip="Navigator" iconStyle={{...iconStyles}} style={{iconBtnStyles}} onClick={() => props.toggleSideNav(true)}>
                <ChromeReader />
            </IconButton>
        </section>
    )
    const hamMenu = (
        <section className="hamburger-menu mobile">
            <IconMenu
            listStyle={{backgroundColor: "rgb(76, 55, 8)"}}
            menuItemStyle={{color: "#eee"}}
            className="ham-burg-i"
            iconButtonElement={<IconButton><Hamburg /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
            >
                {
                    props.userData.is_admin
                    ?
                    <MenuItem
                        leftIcon={<Admin />}
                        primaryText="Coach Manager"
                        onClick={() => props.history.push('/adminManager')}
                    />
                    :
                    null
                }
                {
                    props.userData.coach_id > 0
                    ?
                    <MenuItem
                       primaryText="Client Manager"
                       onClick={() => props.history.push('/coachManager')}    leftIcon={<Admin />}
                    />
                    :
                    null
                }
                <MenuItem
                    primaryText="Find Your Why"
                    onClick={() => props.toggleMotivationalModal(true)}
                    leftIcon={<Happy />}
                />
                <MenuItem
                    primaryText="Logout"
                    onClick={logoutUser}
                    leftIcon={<Logout />}
                />
                <MenuItem
                    primaryText="Navigator"
                    onClick={() => props.toggleSideNav(true)}
                    leftIcon={<ChromeReader />}
                />
                <MenuItem
                    innerDivStyle={{display: "flex", alignItems: "center", width: "100%"}}
                    onClick={() => props.history.push('/profile')}>
                    <Avatar  icon={<PersonOutline />} size={35} src={props.userData.profile_pic} />
                        {props.userData.username}
                </MenuItem>
            </IconMenu>
        </section>
    )
    return(
        
                props.isLoggedIn && props.userData.user_id > 0
            ?
                (<header className="nav-comp">
                    <AppBar onTitleClick={() => props.history.push('/dashboard')} iconElementLeft={home} title={<h1 className="nav-title">BalancedLIFE</h1>} titleStyle={titleStyles} className="app-bar" iconElementRight={<section className="right-icons">{rightIcons}{profileAv}{hamMenu}</section>}/>
                </header>)
            :
                (<section className="unauthorized">
                <section className="message">
                    <h1 style={{color: "rgb(95, 0, 0)", fontSize: "3.5em"}}>403 FORBIDDEN</h1>
                    <h1 style={{color: "#000", fontSize: "3.5em"}}>RELISH IN THE WAVES OR TRY LOGGING IN</h1>
                    <a id="arg" href={process.env.REACT_APP_LOGIN}>
                        <RaisedButton primary={true} label="Login" />
                    </a>
                </section>
                <video autoPlay muted loop id="video-background">
                    <source src={seaVid} type="video/mp4" />
                </video>
                {/* <iframe  title="forbidden" loop id="video-background" src="https://www.youtube.com/embed/qREKP9oijWI?autoplay=1&controls=0&showinfo=0" frameBorder="0" allow="autoplay; encrypted-media" ></iframe> */}
            </section>)
        
    )
}

function mapStateToProps(state) {
    const { userData, loginAttempted } = state.users
    const { coach_id } = userData
    return {
        isLoggedIn: state.users.isLoggedIn,
        coach_id,
        userData,
        loginAttempted,
        coach_req_info: state.coach.coach_req_info,
        authWarningMsg: state.users.warningMsg,
        // coachWarningMsg: state.coach.warningMsg
    }
}

export default connect(mapStateToProps, { toggleSideNav, logoutUser, toggleMotivationalModal, toggleCoachReqModal })(Nav)


// https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en