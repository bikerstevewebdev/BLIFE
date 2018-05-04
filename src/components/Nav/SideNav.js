import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
import Close from 'material-ui/svg-icons/navigation/close';
import PieChart from 'material-ui/svg-icons/editor/pie-chart-outlined';
import Dining from 'material-ui/svg-icons/maps/local-dining';
import Fitness from 'material-ui/svg-icons/places/fitness-center'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton';
import { toggleSideNav } from '../../ducks/userReducer'
// const sideNavStyles = {

// }

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
        <IconButton tooltip="Macro Calculator">
            <Link to="/macroCalc">
                <PieChart />
            </Link>
        </IconButton>
        {nutrition}
        {fitness}
    </section>
)

function SideNav(props) {    
        return(
            <Drawer onRequestChange={() => props.toggleSideNav(false)}
            docked={false} width={200} openSecondary={true} open={props.sideNavOpen} >
                <AppBar iconElementLeft={<IconButton onClick={() => props.toggleSideNav(false)}><Close /></IconButton>}title="AppBar" />
                {rightIcons}
            </Drawer>
        )
}

function mapStateToProps(state) {
    return {
        sideNavOpen: state.users.sideNavOpen
    }
}

export default connect(mapStateToProps, { toggleSideNav })(SideNav)
