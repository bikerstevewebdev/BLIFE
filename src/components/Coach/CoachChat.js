import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleCoachChatModal } from '../../ducks/coachReducer'
import { Table, TableBody, TableRow, TableRowColumn, } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import io from 'socket.io-client'
import Avatar from 'material-ui/Avatar';

// const socket = io('http://localhost:7373'); // remove link for production

class CoachChat extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      userInput: '',
      roomPath: '/coachChat',
      connected: false,
      roomJoined: false,
      messages: []
    }
    this.socket = io('http://localhost:7373')
    // socket.on('response', data => { // username set or taken
    //   if (data.status === 'username set') {
    //     this.setState({ username: data.username })
    //   }
    // })
    this.socket.on('contact', data => {
      this.setState({
          id: data.id,
          connected: true
        })
    })
    this.socket.on('room joined', data => {
        console.log(data)
      this.setState({
          roomPath: data.room,
          messages: data.messages.reverse(),
          roomJoined: data.success
        })
    })
    this.socket.on('message received', data => {
      this.setState({messages: data.messages.reverse()})
    })
    this.handleMessageEvent = this.handleMessageEvent.bind(this);
  }

    componentDidMount() {
        if(this.props.userData.has_coach){
            const { roomPath } = this.state
            const { coach_info, userData } = this.props
            const { coach_id, has_coach } = userData
            const { client_coach_id } = coach_info
            // this.socket = io('http://localhost:7373')
            if(has_coach){
                this.socket.emit('join room', { isClient: true, id: client_coach_id, roomname: roomPath + client_coach_id })
            }else{
                this.socket.emit('join room', { id: coach_id, roomname: roomPath + client_coach_id })
            }
        }
    }
  

    // room
    
    handleMessageEvent() {
        if (!this.state.userInput.length) return // prevent empty message from being sent.
        const { coach_info, userData, client_info } = this.props
        let tNow = new Date().getTime()
        if(userData.has_coach){
            this.socket.emit('send message', { id: coach_info.client_coach_id, client_id: coach_info.client_coach_id, coach_id: coach_info.coach_id,message: this.state.userInput, time: tNow, room: this.state.roomPath, isClient: true, sender: userData.username })
            this.setState({ userInput: '' })
        }else{
            this.socket.emit('send message', { id: userData.coach_id, client_id: client_info.client_coach_id, coach_id: userData.coach_id, message: this.state.userInput, time: tNow, room: this.state.roomPath, isClient: false, sender: userData.username })
            this.setState({ userInput: '' })
        }
    }
  render() {
      const { userData } = this.props
    let messageList
    if (this.state.connected === true) {
        messageList = this.state.messages.map(msg => {
            let temp = new Date(msg.date_sent/1).toDateString()
            let timeDate = `${temp.slice(0, 15)} at ${temp.slice(15, 8)}`
            return (
                <TableRow key={msg.message_id}>
                    <TableRowColumn>
                        <Avatar src={msg.sender === userData.username ? userData.profile_pic : msg.profile_pic}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        {msg.content}
                    </TableRowColumn>
                    <TableRowColumn>
                        {timeDate}
                    </TableRowColumn>
                </TableRow>
            )
        })
    }
    return (
      <Dialog  contentStyle={{borderRadius: "10%", position: "fixed", left: "25%", top: "1%"}} autoScrollBodyContent={true} open={this.props.coachChatModalOpen} className="App">
            <Table>
                <TableBody>
                    {messageList ? messageList : null}
                </TableBody>
            </Table>
           

            <TextField name="message input" className='input-box' value={this.state.userInput} type="text" onChange={e => this.setState({ userInput: e.target.value })} />
            <RaisedButton onClick={() => this.handleMessageEvent()} label="send"/>
            <FlatButton onClick={() => this.props.toggleCoachChatModal(false)} label="close"/>
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
    return {
        coachChatModalOpen: state.coach.coachChatModalOpen,
        messages: state.coach.messages,
        coach_info: state.coach.coach_info,
        userData: state.users.userData,
        client_info: state.coach.client_info
    }
}

export default connect(mapStateToProps, { toggleCoachChatModal })(CoachChat)