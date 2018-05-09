import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
// import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import RaisedButton from 'material-ui/RaisedButton'
import seaVid from '../../seaVid.mp4'
import ChromeReader from 'material-ui/svg-icons/action/chrome-reader-mode';
import { toggleSideNav } from '../../ducks/userReducer'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton';

// import PieChart from 'material-ui/svg-icons/editor/pie-chart-outlined';
// import Dining from 'material-ui/svg-icons/maps/local-dining';
// import Fitness from 'material-ui/svg-icons/places/fitness-center'
// import EventNote from 'material-ui/svg-icons/notification/event-note';
// import IconMenu from 'material-ui/IconMenu'
// import MenuItem from 'material-ui/MenuItem'

const home = (
    <IconButton tooltip="Dashboard">
        <Link to="/dashboard">
            <ActionHome />
        </Link>
    </IconButton>
)
// const macroCalc = (
// )
// const mealCreator = (
// )
// const menuCreator = (
// )
// const rightIcons = [profile, macroCalc, mealCreator, menuCreator]
// const title = <h1>BalancedLIFE</h1>
const titleStyles = {
    display: "flex",
    justifyContent: "center",
    margin: "0",
    letterSpacing: "3px",
    WebkitMarginBefore: "0",
    WebkitMarginAfter: 0
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

function Nav(props) {
    const rightIcons = (
        <section style={rightStyles} className="icons">
            <IconButton onClick={() => props.toggleSideNav(true)}>
                <ChromeReader />
            </IconButton>
            <FlatButton  >
                <Link style={{...profileBtnStyles, color: "inherit"}} to='/profile'>
                    <Avatar size={35} src={props.userData.profile_pic} />
                    {props.userData.username}
                </Link>
            </FlatButton>
        </section>
    )
    return(
        
            props.isLoggedIn
            ?
    (<header className="nav-comp">
        <AppBar iconElementLeft={home} title={<h2>BalancedLIFE</h2>} titleStyle={titleStyles} style={styles} iconElementRight={rightIcons}>
                <section className="links">
                    {/* <Link to='/dashboard'><button>Dashboard</button></Link> */}
                    {/* <Link to='/profile'><button>Profile</button></Link> */}
                    {/* <Link to='/macroCalc'><button>Macro Calc</button></Link> */}
                    {/* <Link to='/mealCreator'><button>Meal Creator</button></Link> */}
                    {/* <Link to='/meal/-1'><button>Meal Viewer</button></Link> */}
                    {/* <Link to='/menu/nav'><button>Menu Viewer</button></Link> */}
                    {/* <Link to='/menuCreator'><button>Menu Creator</button></Link> */}
                    {/* <Link to='/food/nav'><button>Food Creator</button></Link> */}
                    {/* <Link to='/exercise/0'><button>Exercise Creator</button></Link>
                    <Link to='/workoutCreator'><button>Workout Creator</button></Link> */}
                    {/* <Link to='/mealFromRecipe'><button>Meal From Recipe</button></Link> */}
                    {
                        props.coach_id > 0
                        ?
                        <Link to={`/coachManager/${props.coach_id}`}>Coach Manager</Link>
                        :
                        null
                    }
                </section>
        </AppBar>
    </header>)
            :
            (<section className="unauthorized">
            <section className="message">
                <h1>YOU ARE NOT LOGGED IN<br />
                YOU DON'T SAY THAT</h1>
                <a id="arg" href={process.env.REACT_APP_LOGIN}>
                    <RaisedButton primary={true} >Login</RaisedButton>
                </a>
            </section>
            <video autoPlay muted loop id="video-background">
                <source src={seaVid} type="video/mp4" />
            </video>
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
        authWarningMsg: state.users.warningMsg
        // coachWarningMsg: state.coach.warningMsg
    }
}

export default connect(mapStateToProps, { toggleSideNav })(Nav)
