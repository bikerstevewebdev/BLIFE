import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleMotivationalModal } from '../../ducks/userReducer'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import axios from 'axios'
import { grey400 } from 'material-ui/styles/colors'
import { Redirect } from 'react-router-dom'

class MotivationalQuote extends Component{
    constructor() {
        super()
        this.state = {
            qAuthor: '',
            qText: '',
            img: '',
            imgUser: '',
            redirecting: false
        }
        this.getNewQuote = this.getNewQuote.bind(this)
    
    }
    componentDidMount(){
        this.getNewQuote()
    }
    getNewQuote() {
        axios.get('/motivational/quote').then(res => {
            console.log('res', res, 'and res.data',  res.data)
            this.setState({ qText: res.data.qText, qAuthor: res.data.qAuthor, img: res.data.imgURL, imgUser: res.data.imgUser })
        }).catch(err => {
            console.log(err)
        })
    }

    handleClose(){
        console.log(this.props)
        if(this.props.location.pathname === '/measurements'){
            this.props.toggleMotivationalModal(false)
            this.props.history.push('/profile')
            // this.setState({ redirecting: true })
        }else{
            this.props.toggleMotivationalModal(false)
        }
    }

    
    render() {
        const { qText, qAuthor, redirecting } = this.state
        const { motivationalModalOpen } = this.props
        const textStyles = {color: grey400}
        const jcFlex = {
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
        }
        return(
            <Dialog contentStyle={{...jcFlex, flexDirection: "column"}} open={motivationalModalOpen} className="motivational-modal" >
                <section style={{...jcFlex}}>
                    <section style={{...jcFlex, flexDirection: "column"}}>
                        <p style={{textShadow: "black 2px 4px 1px", color: "white"}}>{qText ? `"${qText}"` : 'Try Another One'}</p>
                        <br/>
                        <p style={{...textStyles, fontStyle: "italic"}}>{qText ? (qAuthor ? `---> ${qAuthor}` : '---> Someone Fancy') : null}</p>
                    </section>
                    <figure style={{...jcFlex, flexDirection: "column"}}>
                        <img style={{borderRadius: "5%"}} src={this.state.img} alt={this.state.imgUser}/>
                        <figcaption  >{this.state.imgUser}</figcaption>
                    </figure>
                </section>
                <FlatButton  style={{justifySelf: "center"}} onClick={() => this.getNewQuote()} label="Another One"/>
                <RaisedButton style={{justifySelf: "center"}} secondary={true} onClick={this.handleClose.bind(this)} label="I've Got This" />
            </Dialog>
        )
    }
}

function mapStateToProps(state) {
    return {
        motivationalModalOpen: state.users.motivationalModalOpen
    }
}

export default connect(mapStateToProps, { toggleMotivationalModal })(MotivationalQuote)