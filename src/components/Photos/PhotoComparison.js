import React, { Component } from 'react'
import { connect } from 'react-redux'
import { togglePhotoCompModal } from '../../ducks/userReducer'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
// import FlatButton from 'material-ui/FlatButton'


class PhotoComparison extends Component {
    // constructor(){
        // super()
        
        // this.state={
        // }
        // this.sendToback=this.sendToback.bind(this)
    // }
    
    // sendToback(photo){
    //     console.log(photo)
    //     this.props.uploadPhoto({ photo, type: 'progress' })
    // }

    render(){
        const photoCompStyles = {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            // boxShadow: "1px 1px 2px 0px rgb(25, 39, 31)",
            // borderRadius: "3px",
            // backgroundColor: "#99d066"
        }
        const photos = this.props.comparisonPhotos.map(v => {
            return (<section key={v.photo_id} className="comparison-photo-card">
                <img style={{width: "300px"}} src={v.src} alt={v.alt}/>
                <p>Date Uploaded: {v.date_added.slice(0, 10)}</p>
            </section>)
        })
        return (
            <Dialog titleStyle={{textAlign: "center"}} title={<h1>Photo Comparison</h1>} open={this.props.photoCompModalOpen} className="photo-comparison">
                <section style={photoCompStyles}>
                    <section style={{display: "grid", gridAutoColumns: "1fr", alignItems: "center", justifyItems: "center", gridAutoFlow: "column"}}>
                        {photos}
                    </section>
                    <RaisedButton onClick={() => this.props.togglePhotoCompModal(false)} label="close" />
                </section>
            </Dialog>
        )
    }
}

function mapStateToProps(state) {
    return {
        comparisonPhotos: state.users.comparisonPhotos,
        photoCompModalOpen: state.users.photoCompModalOpen
    }
}

export default connect(mapStateToProps, { togglePhotoCompModal })(PhotoComparison)