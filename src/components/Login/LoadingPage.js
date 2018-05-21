import React from 'react'
import ParticlePage from '../Particles/ParticlePage'

const compStyles = {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

function Loading() {
    return(
        <section style={{width: "100%", position: "fixed", top: "0", left: "0"}}>
            <ParticlePage weather="snow" style={{zIndex: '-100'}}backgroundColor="#0c781f" bgimg="https://images.unsplash.com/photo-1521029231118-b6f725bd0f34?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d52cd7f141fb6ddf39ddf7c712523ab&auto=format&fit=crop&w=500&q=60"/>
            
            <section style={compStyles} className="loading-comp">
            </section>
        </section>
    )
}
export default Loading


