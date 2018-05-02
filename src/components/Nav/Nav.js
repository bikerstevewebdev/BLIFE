import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function Nav(props) {
    return(
        <header className="nav-comp">
        {
            props.isLoggedIn
            ?
            <nav>
                <h2>BalancedLIFE</h2>
                <section className="links">
                    <Link to='/dashboard'><button>Dashboard</button></Link>
                    <Link to='/profile'><button>Profile</button></Link>
                    <Link to='/macroCalc'><button>Macro Calc</button></Link>
                    <Link to='/meal/-1'><button>Meal Viewer</button></Link>
                    <Link to='/mealCreator'><button>Meal Creator</button></Link>
                    <Link to='/menu/nav'><button>Menu Viewer</button></Link>
                    <Link to='/menuCreator'><button>Menu Creator</button></Link>
                    <Link to='/food/nav'><button>Food Creator</button></Link>
                    <Link to='/exercise/0'><button>Exercise Creator</button></Link>
                    <Link to='/workoutCreator'><button>Workout Creator</button></Link>
                    <Link to='/mealFromRecipe'><button>Meal From Recipe</button></Link>
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
            </nav>
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