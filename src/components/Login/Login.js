import React from 'react'

function Login() {
    return(
        <nav>
            <a href={process.env.REACT_APP_LOGIN}>
                <button width="200px">Login</button>
            </a>
        </nav>
    )
}
export default Login