import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uploadPhoto } from '../../ducks/userReducer'
import AddPhoto from 'material-ui/svg-icons/image/add-a-photo'
import RaisedButton from 'material-ui/RaisedButton'
import FileUpload from 'material-ui/svg-icons/file/file-upload'
import Dialog from 'material-ui/Dialog/Dialog';

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

        const inputStyles = {
            display: "flex",
            opacity: "0",
            flexDirection: "column",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "5"
        }
        // let noPics = this.props.empty ? { gridArea: "2/1/3/4", width: "33%" } : { width: "100%" }
        
        return (
            <Dialog contentStyle={{display:"flex", justifyContent: "space-around", width: "100%", flexWrap: "column"}} open={this.props.uploadingPhoto} className="photo-upload">
                <h1 style={{fontSize: "1.75em", textAlign: "center", padding: "0.5em"}}>Upload a Progress Picture</h1>    
                <section style={{display:"flex", width: "100%", alignItems: "center",  justifyContent: "space-around", flexDirection: "column"}}>
                    {
                        this.state.file &&
                        <img src={this.state.file} style={{margin: "0.25em", maxWidth: "400px"}} alt="preview" className="file-preview"/>  
                    }
                    <RaisedButton style={{margin: "0.25em", display: "flex", justifyContent: "center", alignItems: "center", width: "50%"}} icon={<FileUpload/>} secondary={true} label="Select File" >
                        <label htmlFor="file-input">
                        <input style={{...inputStyles, cursor: "pointer", width: "100%", height: "100%"}} type="file" id="file-input" onChange={this.handlePhoto}/>
                        </label>
                    </RaisedButton>
                    {
                    this.state.filename.length > 0
                    ?
                    <RaisedButton style={{margin: "0.25em", width: "50%"}} secondary={true} onClick={this.sendPhoto} icon={<AddPhoto/>} label="Upload" />
                    :
                    null
                    }
                    <RaisedButton secondary={true} style={{margin: "0.25em", width: "50%"}}  onClick={this.props.toggleOpen} label="Close" />
                </section>
            </Dialog>


            // <div style={{...uploadStyles, gridColumn: "1/4", width: "33%"}} className="photo-upload">
            //     {/* {
            //                 this.state.filename.length > 0
            //                 ?
            //                 null
            //                 :
                            
            //     } */}
            // </div>
        )
    }
}
export default connect(null, { uploadPhoto })(PhotoUpload)