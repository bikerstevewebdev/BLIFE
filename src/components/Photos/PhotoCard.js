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
        const { comparisonPhotos, deprecatePhoto, photo_id, date_added, alt, src } = this.props
        const { checked } = this.state
        return(
            <section className="photo-card">
                <section>
                    <img src={src} alt={alt} />
                </section>
                <section className="infoStyles">
                    <p>Date Added:<br /> {date_added.slice(0, 10)}</p>
                    <Checkbox label="compare" onClick={() => this.handleChange(!checked)} disabled={!checked && comparisonPhotos.length >= 2}/>
                    <RaisedButton secondary={true} style={{width: "70%", alignSelf: "center"}} label="Archive" onClick={() => deprecatePhoto(photo_id)}/>
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