import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'


function Login() {
    return(
        <nav>
            <a href={process.env.REACT_APP_LOGIN}>
                <RaisedButton primary={true} style={{width: "200px"}}>Login</RaisedButton>
            </a>
        </nav>
    )
}
export default Login