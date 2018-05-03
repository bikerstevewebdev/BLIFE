import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uploadPhoto } from '../../ducks/userReducer'
import RaisedButton from 'material-ui/RaisedButton'


class PhotoUpload extends Component {
    constructor(){
        super()
        
        this.state={
            file: '',
            filename: '',
            filetype: ''
        }
        this.handlePhoto=this.handlePhoto.bind(this)
        this.sendPhoto=this.sendPhoto.bind(this)
        // this.sendToback=this.sendToback.bind(this)
    }
    
    // sendToback(photo){
    //     console.log(photo)
    //     this.props.uploadPhoto({ photo, type: 'progress' })
    // }

    handlePhoto(event){
        const reader = new FileReader()
            , file = event.target.files[0]
        
        reader.onload = photo => {
            this.setState({
                file: photo.target.result,
                filename: file.name,
                filetype: file.type
            })
        }
        reader.readAsDataURL(file)
    }

    sendPhoto(event){
        event.preventDefault()
        this.props.uploadPhoto({ photo: this.state, type: 'progress' })
        this.setState({
            file: '',
            filename: '',
            filetype: ''
        })
    }

    render(){
        return (
            <div className="photo-upload">
                <h3>Upload a Progress Picture</h3>
                <input type="file" onChange={this.handlePhoto}/>
                <br/>
                {
                this.state.file &&
                <img src={this.state.file} alt="preview" className="file-preview"/>  
                }
                <RaisedButton secondary={true} onClick={this.sendPhoto}>Upload this Photo</RaisedButton>
            </div>
        )
    }
}
export default connect(null, { uploadPhoto })(PhotoUpload)