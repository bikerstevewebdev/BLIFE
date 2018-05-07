import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uploadPhoto } from '../../ducks/userReducer'
import RaisedButton from 'material-ui/RaisedButton'
import AddPhoto from 'material-ui/svg-icons/image/add-a-photo'
import FileUpload from 'material-ui/svg-icons/file/file-upload'


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
        const uploadStyles = {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            boxShadow: "1px 1px 2px 0px rgb(25, 39, 31)",
            borderRadius: "3px",
            backgroundColor: "#99d066"
        }
        
        return (
            <div style={{...uploadStyles}} className="photo-upload">
                <h3>Upload a Progress Picture</h3>
                <RaisedButton style={{display: "flex", alignItems: "center", width: "200px"}} secondary={true} >
                    <FileUpload/>Choose a File
                    <label htmlFor="file-input">
                        <input style={{width: "100%", height: "36px", display: "none"}} type="file" id="file-input" onChange={this.handlePhoto}/>
                    </label>
                </RaisedButton>
                {
                this.state.file &&
                <img src={this.state.file} alt="preview" className="file-preview"/>  
                }
                <RaisedButton style={{width: "200px"}} secondary={true} onClick={this.sendPhoto}>Upload this Photo<AddPhoto /></RaisedButton>
            </div>
        )
    }
}
export default connect(null, { uploadPhoto })(PhotoUpload)