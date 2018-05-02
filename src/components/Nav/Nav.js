import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import ActionHome from 'material-ui/svg-icons/action/home';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import PieChart from 'material-ui/svg-icons/editor/pie-chart-outlined';
import Dining from 'material-ui/svg-icons/maps/local-dining';
// import EventNote from 'material-ui/svg-icons/notification/event-note';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Fitness from 'material-ui/svg-icons/places/fitness-center'

const nutrition = (
    <IconMenu
      iconButtonElement={<IconButton><Dining /></IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <Link to="/mealCreator">
        <MenuItem primaryText="Meal Creator" />
      </Link>
      <Link to="/menuCreator">
        <MenuItem primaryText="Menu Creator" />
      </Link>
      <Link to="/food/nav">
        <MenuItem primaryText="Food Creator" />
      </Link>
    </IconMenu>
)
const fitness = (
    <IconMenu
      iconButtonElement={<IconButton><Fitness /></IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <Link to="/workoutCreator">
        <MenuItem primaryText="Workout Creator" />
      </Link>
      <Link to="/exercise/0">
        <MenuItem primaryText="Exercise Creator" />
      </Link>
    </IconMenu>
)



const rightIcons = (
    <section className="icons">
        <IconButton tooltip="Profile">
            <Link to="/profile">
                <PersonOutline />
            </Link>
        </IconButton>
        <IconButton tooltip="Macro Calculator">
            <Link to="/macroCalc">
                <PieChart />
            </Link>
        </IconButton>
        {nutrition}
        {fitness}
    </section>
)

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
    // display: "flex",
    alignSelf: "center",
    margin: "0",
    letterSpacing: "3px",
    WebkitMarginBefore: "0",
    WebkitMarginAfter: 0
}
const rightStyles = {
    display: "flex",
    justifyContent: "flex-end"
}
const styles = {display: "flex", justifyContent: "space-between", height: "80px", alignItems: "center"}


function Nav(props) {
    return(
        <header className="nav-comp">
        {
            props.isLoggedIn
            ?
        <AppBar iconElementLeft={home} title={<h2>BalancedLIFE</h2>} titleStyle={titleStyles} style={styles} iconStyleRight={rightStyles} iconElementRight={rightIcons}>
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
                    {
                        props.coach_id > 0
                        ?
                        <Link to={`/coachManager/${props.coach_id}`}>Coach Manager</Link>
                        :
                        null
                    }
                </section>
            </AppBar>
            :
            <section className="unauthorized">
                YOU ARE NOT LOGGED IN<br />
                YOU DON'T SAY THAT
                <Link to='/'><button>Login</button></Link>
            </section>
        }
        {
            props.warningMsg
            ?
            <section className="unauthorized">
                {props.authWarningMsg}<br />
                <Link to='/'><button>Please Hang Up and Try Again</button></Link>
            </section>
            :
            null
        }
        {/* {
            props.warningMsg
            ?
            <section className="unauthorized">
                {props.authWarningMsg}<br />
                <Link to='/'><button>Please Hang Up and Try Again</button></Link>
            </section>
            :
            null
        } */}
        </header>
    )
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.users.isLoggedIn,
        coach_id: state.users.userData.coach_id,
        authWarningMsg: state.users.warningMsg
        // coachWarningMsg: state.coach.warningMsg
    }
}

export default connect(mapStateToProps)(Nav)