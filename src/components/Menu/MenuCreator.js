import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMenu, toggleMenuModal } from '../../ducks/foodReducer'
import { Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
        return(
            <Dialog open={this.props.menuDialogOpen} className="menu-creator" >
                <p>Title of the Menu:</p>
                <input value={this.state.titleInput} onChange={(e) => this.updateMenuTitle(e.target.value)} />
                <p>Menu Image Url:</p>
                <input value={this.state.imgInput} onChange={(e) => this.updateimgInput(e.target.value)} />
                <RaisedButton secondary={true} onClick={() => this.sendMenuUp()}>Create Menu!</RaisedButton>
                {
                    this.state.creating
                    ?
                    null
                    :
                    <Redirect to={`/menu/${this.state.titleInput}`} />
                }
                <FlatButton onClick={() => this.props.toggleMenuModal(false)} label="close" />
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