import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleMotivationalModal } from '../../ducks/userReducer'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios'
import { grey400 } from 'material-ui/styles/colors';

class MotivationalQuote extends Component{
    constructor() {
        super()
        this.state = {
            qAuthor: '',
            qText: ''
        }
        this.getNewQuote = this.getNewQuote.bind(this)
    }
    componentDidMount(){
        this.getNewQuote()
    }
    getNewQuote() {
        axios.get('https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json').then(res => {
            console.log('res', res, 'and res.data',  res.data)
            this.setState({ qText: res.data.quoteText, qAuthor: res.data.quoteAuthor })
        })
    }

    
    render() {
        const { qText, qAuthor } = this.state
        const { motivationalModalOpen, toggleMotivationalModal } = this.props
        const textStyles = {color: grey400}
        return(
            <Dialog open={motivationalModalOpen} className="motivational-modal" >
                <p style={textStyles}>{qText ? `"${qText}"` : 'Try Another One'}</p>
                <br/>
                <p style={{...textStyles, fontStyle: "italic"}}>{qText ? (qAuthor ? `---> ${qAuthor}` : '---> Someone Fancy') : null}</p>
                <FlatButton  onClick={() => this.getNewQuote()} label="Another One"/>
                <RaisedButton secondary={true} onClick={() => toggleMotivationalModal(false)} label="I've Got This" />
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