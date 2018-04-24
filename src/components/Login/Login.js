import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    return(
        <nav>
            <a href={process.env.REACT_APP_LOGIN}>
                <button>Login</button>
            </a>
        </nav>
    )
}
export default Login