import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMenu, toggleMenuModal } from '../../ducks/foodReducer'
import { Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField/TextField';

class Menu extends Component{
    constructor() {
        super()
        this.state = {
            titleInput: '',
            imgInput: '',
            creating: true
        }
        this.updateimgInput = this.updateimgInput.bind(this)
        this.updateMenuTitle = this.updateMenuTitle.bind(this)
        this.sendMenuUp = this.sendMenuUp.bind(this)
    }

    sendMenuUp() {
        const { titleInput, imgInput } = this.state        
        this.props.createMenu(titleInput, imgInput)
        this.setState({
            creating: false
        })
    }

    updateimgInput(val) {
        this.setState({
            imgInput: val
        })
    }

    updateMenuTitle(val) {
        this.setState({
            titleInput: val
        })
    }
    
    render() {
        const mainStyles ={
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            gridGap: "0.75em",
            alignItems: "center"
        }
        return(
            <Dialog contentStyle={{maxWidth: "53%"}} bodyStyle={{...mainStyles}}  open={this.props.menuDialogOpen} className="menu-creator" >
                <h1 style={{gridArea: "1/1/2/2", fontSize: "2em", borderRadius: "5px"}}>Create a Menu</h1>
                <TextField style={{gridArea: "2/1/3/2"}} value={this.state.titleInput} floatingLabelText="Title of the Menu:" onChange={(e) => this.updateMenuTitle(e.target.value)} />
                <TextField style={{gridArea: "3/1/4/2"}}  value={this.state.imgInput} floatingLabelText="Menu Image Url:" onChange={(e) => this.updateimgInput(e.target.value)} />
                <img style={{gridArea: "2/2/5/3", maxWidth: "500px"}} src={this.state.imgInput} alt={this.state.titleInput}/>
                <RaisedButton style={{gridArea: "4/1/5/2"}}  secondary={true} onClick={() => this.sendMenuUp()}>Create Menu!</RaisedButton>
                {
                    this.state.creating
                    ?
                    null
                    :
                    <Redirect to={`/menu/${this.state.titleInput}`} />
                }
                <FlatButton style={{gridArea: "5/1/6/2"}}  onClick={() => this.props.toggleMenuModal(false)} label="close" />
            </Dialog>
        )
    }
}

function mapStateToProps(state) {
    return {
        menuDialogOpen: state.foods.menuDialogOpen
    }
}

export default connect(mapStateToProps, { createMenu, toggleMenuModal })(Menu)