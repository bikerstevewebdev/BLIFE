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
                    <Link to='/'><button>Login</button></Link>
                    <Link to='/profile'><button>Profile</button></Link>
                    <Link to='/macroCalc'><button>Macro Calc</button></Link>
                    <Link to='/meal/-1'><button>Meal Viewer</button></Link>
                    <Link to='/mealCreator'><button>Meal Creator</button></Link>
                    <Link to='/food/nav'><button>Food Creator</button></Link>
                </section>
            </nav>
            :
            <section className="unauthorized">
                YOU ARE NOT LOGGED IN<br />
                YOU DON'T SAY THAT
            </section>
        }
        </header>
    )
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.users.isLoggedIn
    }
}

export default connect(mapStateToProps)(Nav)