import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import seaVid from '../../seaVid.mp4'

function ErrorPage(){
    return(
        <section className="unauthorized">
            <section className="message">
                <h1 style={{color: "rgb(95, 0, 0)", fontSize: "3.5em"}}>403 FORBIDDEN</h1>
                <h1 style={{color: "#000", fontSize: "3.5em"}}>RELISH IN THE WAVES OR TRY LOGGING IN</h1>
                <a id="arg" href={process.env.REACT_APP_LOGIN}>
                    <RaisedButton primary={true} label="Login" />
                </a>
            </section>
            <video autoPlay muted loop id="video-background">
                <source src={seaVid} type="video/mp4" />
            </video>
            {/* <iframe title="forbidden" loop id="video-background" src="https://www.youtube.com/embed/qREKP9oijWI?autoplay=1&controls=0&showinfo=0" frameBorder="0" allow="autoplay; encrypted-media" ></iframe> */}
        </section>
    )
}

export default ErrorPage
{/* <section className="unauthorized">
              <section className="message">
                  <h1>YOU ARE NOT LOGGED IN<br />
                  YOU DON'T SAY THAT</h1>
                  <a id="arg" href={process.env.REACT_APP_LOGIN}>
                      <RaisedButton primary={true} >Login</RaisedButton>
                  </a>
              </section>
              <video autoPlay muted loop id="video-background">
                  <source src={seaVid} type="video/mp4" />
              </video>
            </section> */}