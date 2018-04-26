import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMenu } from '../../ducks/foodReducer'
import { Redirect } from 'react-router-dom'

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
            titleInput: '',
            imgInput: '',
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
            <section className="menu-creator" >
                <p>Title of the Menu:</p>
                <input value={this.state.titleInput} onChange={(e) => this.updateMenuTitle(e.target.value)} />
                <p>Menu Image Url:</p>
                <input value={this.state.imgInput} onChange={(e) => this.updateimgInput(e.target.value)} />
                <button onClick={() => this.sendMeNUUp()}>Create Menu!</button>
                {
                    this.state.creating
                    ?
                    null
                    :
                    <Redirect to={`/menu/${this.state.titleInput}`} />
                }
            </section>
        )
    }
}
export default connect(null, { createMenu })(Menu)