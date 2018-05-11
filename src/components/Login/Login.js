import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ParticlePage from '../Particles/ParticlePage'
import { blue800 } from 'material-ui/styles/colors'

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
            <ParticlePage style={{zIndex: '-100'}}backgroundColor="#0c781f" bgimg="https://images.unsplash.com/photo-1520257119747-9591a2d38189?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1980&h=1280&fit=crop&ixid=eyJhcHBfaWQiOjIzNjgzfQ&s=b87818d8ad27a2857076d2f8ff6efd12"/>
            
            <section style={compStyles} className="login-comp">
                <a   href={process.env.REACT_APP_LOGIN}>
                    <RaisedButton backgroundColor={blue800} style={{width: "200px"}}>Login</RaisedButton>
                </a>
            </section>
        </section>
    )
}
export default Login