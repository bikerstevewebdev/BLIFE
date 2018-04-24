import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    return(
        <nav>
            <Link to='/'>Dashboard</Link>
            <Link to='/auth'>Login</Link>
            <Link to='/profile'>Profile</Link>
        </nav>
    )
}
export default Nav