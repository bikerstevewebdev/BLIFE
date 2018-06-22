import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ParticlePage from '../Particles/ParticlePage'
import { blue800 } from 'material-ui/styles/colors'
import loginBG from './loginBG.jpg'

const compStyles = {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

function Login() {
    return(
        <section style={{width: "100%", position: "fixed", top: "0", left: "0"}}>
            <ParticlePage style={{zIndex: '-100'}}backgroundColor="#0c781f" bgimg={loginBG}/>
            
            <section style={compStyles} className="login-comp">
                <a   href={process.env.REACT_APP_LOGIN}>
                    <RaisedButton backgroundColor={blue800} style={{width: "200px"}}>Login</RaisedButton>
                </a>
            </section>
        </section>
    )
}
export default Login