import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deprecatePhoto, addToCompare, removeFromCompare } from '../../ducks/userReducer';
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'

// import { Link } from 'react-router-dom'

class PhotoCard extends Component {
    constructor() {
        super()
        this.state = {
            checked: false
        }
    }
    handleChange = value => {
        console.log(this.props, value)
        const { addToCompare, src, alt, date_added, photo_id, removeFromCompare } = this.props
        if(value){
            addToCompare(photo_id, src, alt, date_added)
        }else{
            removeFromCompare(photo_id)
        }
        this.setState({ checked: value })
      }
    render() {
        const cardStyles = {
        width: "100%",
        height: "100%",
        display: "flex",
        boxShadow: "1px 1px 2px 0px rgb(25, 39, 31)",
        borderRadius: "3px",
        backgroundColor: "#99d066"
        // justifySelf: "stretch"
        // flexDirection: "column",
        // flexWrap: "wrap"
        }
        const infoStyles = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "100%",
            width: "100%"
        }
        const { comparisonPhotos, deprecatePhoto, photo_id, date_added, alt, src } = this.props
        const { checked } = this.state
        return(
            <section style={{...cardStyles}} className="photo-card">
                <section style={{justifySelf: "stretch", height: "100%"}}>
                    <img style={{height: "100%", borderRadius: "3px 0 0 3px"}} src={src} alt={alt} />
                </section>
                <section style={{...infoStyles}}>
                    <p>Date Added: {date_added.slice(0, 10)}</p>
                    <Checkbox onClick={() => this.handleChange(!checked)} disabled={!checked && comparisonPhotos.length >= 4}/>
                    <RaisedButton secondary={true} onClick={() => deprecatePhoto(photo_id)}>This photo is old, archive it</RaisedButton>
                </section>
            </section>
        )
    }
}

function mapStateToProps(state){
    return {
        comparisonPhotos: state.users.comparisonPhotos
    }
}

export default connect(mapStateToProps, { deprecatePhoto, addToCompare, removeFromCompare })(PhotoCard)