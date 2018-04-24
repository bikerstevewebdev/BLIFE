import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    return(
        <nav>
            <h2>BalancedLIFE</h2>
            <section className="links">
                <Link to='/'>Dashboard</Link>
                <Link to='/auth'>Login</Link>
                <Link to='/profile'>Profile</Link>
            </section>
        </nav>
    )
}
export default Nav