import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    return(
        <nav>
            <h2>BalancedLIFE</h2>
            <section className="links">
                <Link to='/dashboard'><button>Dashboard</button></Link>
                <Link to='/'><button>Login</button></Link>
                <Link to='/profile'><button>Profile</button></Link>
                <Link to='/macroCalc'><button>Macro Calc</button></Link>
            </section>
        </nav>
    )
}
export default Nav