import React, { Component } from 'react'
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'
import ClientMenuCard from '../Menu/ClientMenuCard'
import ClientWorkoutCard from '../Workout/ClientWorkoutCard'
import SearchMenu from '../Search/SearchMenus'
import SearchWorkout from '../Search/SearchWorkouts'
import { getClientData, assignWorkoutToClient, assignMenuToClient, toggleCoachChatModal, removeClientMenu, removeClientWorkout } from '../../ducks/coachReducer'
import RaisedButton from 'material-ui/RaisedButton'
import CommunicationChat from 'material-ui/svg-icons/communication/chat'
import { FloatingActionButton } from 'material-ui';

class ClientManager extends Component{
    constructor(){
        super()
        this.state = {
            addingWorkout: false,
            addingMenu: false
        }
        this.prepareToAddWorkout = this.prepareToAddWorkout.bind(this)
        this.prepareToAddMenu = this.prepareToAddMenu.bind(this)
    }



    componentDidMount(){
        // const { currentClient } = this.props
        // const { client_coach_id } = currentClient
        // // this.props.getClientData(this.props.match.params.id)
        // if(this.props.match.params.id !== client_coach_id){
        //     getClientData(this.props.match.params.id)
        // }
        
    }

    componentDidUpdate(){
        // const { currentClient } = this.props
        // const { client_coach_id } = currentClient
        // // this.props.getClientData(this.props.ma   `tch.params.id)
        // if(this.props.match.params.id !== client_coach_id){
        //     getClientData(this.props.match.params.id)
        // }
    }
    
    prepareToAddWorkout(){
        this.setState({
            addingWorkout: true
        })
    }

    prepareToAddMenu(){
        this.setState({
            addingMenu: true
        })
    }


    render() {
            const { currentClient, coachChatModalOpen, clientWorkouts, clientMenus, toggleCoachChatModal } = this.props,
                  { username, last_login, fullname, client_coach_id, curr_pro, curr_carb, curr_fat, profile_pic, email } = currentClient
                   
            const menusList = clientMenus.map(v => {
                      return <ClientMenuCard key={v.user_menu_id} cc_id={client_coach_id} um_id={v.user_menu_id} menu_id={v.menu_id} total_p={v.total_p} total_c={v.total_c} total_f={v.total_f} removeFn={this.props.removeClientMenu.bind(this)} total_fib={v.total_fib} img={v.img} btn2Fn={this.props.removeClientMenu.bind(this)} />
                  })
            const workoutsList = clientWorkouts.map(v => {
                      return <ClientWorkoutCard removeFn={this.props.removeClientWorkout.bind(this)} key={v.user_workout_id} uw_id={v.user_workout_id} workout_id={v.workout_id} cc_id={client_coach_id} title={v.title} img={v.img} type={v.type} />
                  })
                  const layoutStyles = {
                    display: "grid",
                    width: "100%",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gridTemplateRows: "10em",
                    //  gridAutoRows: "",
                    alignItems: "center",
                    gridGap: "0.5em",
                    padding: "5%",
                    boxShadow: "rgb(29, 39, 41) 0px 2px 1px 1px",
                    borderRadius: "3px",
                    width: "auto",
                    textAlign: "center",
                    backgroundColor: "rgba(236, 234, 255, 0.76)"
                 }
                 const workSearchStyle = {
                    width: "100%",
                    display: "grid",
                    boxShadow: "rgba(10, 6, 15, 0.59) 0px 1px 6px 3px",
                    backgroundColor: "#c2d8c4",
                    borderRadius: "3px",
                    gridTemplateRows: "auto",
                    gridTemplateColumns: "1fr 1fr",
                    justifyContent: "center",
                    gridGap: "0.75em",
                    gridColumn: "3/5",
                    padding: "0.5em",
                    alignContent: "baseline"
                }
                 const subStyles = {gridGap: "0.75em", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", justifyItems: "center", width: "100%"}
        return (
            <section style={{...layoutStyles}} className="comp client-manager">
                {/* <Link to={`/coachManager/${this.props.coach_id}`}><RaisedButton secondary={true}>Back to Coach Manager</RaisedButton></Link> */}
                <h1 style={{fontSize:"3em", gridColumn: "1/5"}} >{fullname}/{username}</h1>
                <section style={{gridArea: "2/3/3/4"}}>
                    <p>Email: {email}</p>
                    <h3 style={{fontSize: "1.5em"}} >Last Login: {new Date(last_login/1).toDateString().slice(0, 15)}</h3>
                </section>
                <img style={{maxWidth: "200px"}} src={profile_pic} alt={username} />
                <section style={{display: "flex", flexDirection: "column", justifyContent: "space-around", gridArea: "2/2/3/3"}} className="client-stats">
                    {/* <h2>Current Stats</h2> */}
                    <h3 style={{alignSelf: "center", fontSize: "1.25em"}}>Macros:</h3>
                    <p style={{alignSelf: "flex-start"}}>Protein: {curr_pro}</p>
                    <p style={{alignSelf: "flex-start"}}>Carbs: {curr_carb}</p>
                    <p style={{alignSelf: "flex-start"}}>Fat: {curr_fat}</p>
                </section>
                    {
                        currentClient.mes_id > 0
                        ?
                        <section style={{display: "flex", flexDirection: "column", justifyContent: "space-around", gridArea: "2/1/3/2"}} >
                            <h3 style={{alignSelf: "center", fontSize: "1.25em"}}>Measurements:</h3>
                            <p style={{alignSelf: "flex-start"}}>Happyness at time of measurement: {currentClient.happy_level}</p>
                            <p style={{alignSelf: "flex-start"}}>Height: {currentClient.height} inches</p>
                            <p style={{alignSelf: "flex-start"}}>Weight: {currentClient.weight} pounds</p>
                            <p style={{alignSelf: "flex-start"}}>Bodyfat: {currentClient.bf} %</p>
                            <p style={{alignSelf: "flex-start"}}>Waist: {currentClient.waist} inches</p>
                            <p style={{alignSelf: "flex-start"}}>Neck: {currentClient.neck} inches</p>
                            <p style={{alignSelf: "flex-start"}}>Chest: {currentClient.chest} inches</p>
                            <p style={{alignSelf: "flex-start"}}>Last Taken: {new Date(currentClient.date_taken/1).toDateString().slice(0, 15)}</p>
                        </section>
                        :
                        <h2 style={{fontSize: "1.5em", gridArea: "2/1/3/2"}} >{username} does not have any measurements yet</h2>
                    }
                    <section style={{...subStyles, alignSelf: "start", gridColumn: "1/3"}}>
                        <h2 style={{alignSelf: "center", gridColumn: "1/3", fontSize: "1.75em"}}>Current Fitness Plan</h2>
                        {workoutsList}
                        {
                            this.state.addingWorkout
                            ?
                            <SearchWorkout style={{...workSearchStyle, gridColumn: "1/3"}} arg1={client_coach_id} btn2msg={`Add this workout to ${username}'s plan`} btn2Fn={this.props.assignWorkoutToClient.bind(this)} />
                            :
                            <RaisedButton style={{gridColumn: "1/3", width: "66%"}}  secondary={true} onClick={this.prepareToAddWorkout}>Add a workout to {username}'s plan?</RaisedButton>
                        }
                    </section>
                <section style={{...subStyles, gridColumn: "3/5"}}>
                    <h2 style={{gridColumn: "1/3", fontSize: "1.75em"}}>Current Meal Plan</h2>
                    {menusList}
                    {
                        this.state.addingMenu
                        ?
                        <SearchMenu style={{...workSearchStyle, gridColumn: "1/3"}} arg1={client_coach_id}  btn2msg={`Add this menu to ${username}'s plan`} btn2Fn={this.props.assignMenuToClient.bind(this)} />
                        :
                        <RaisedButton style={{gridColumn: "1/3", width: "66%"}} secondary={true} onClick={this.prepareToAddMenu}>Add a menu to {username}'s plan?</RaisedButton>
                    }
                </section>
                {
                    coachChatModalOpen
                    ?
                    null
                    :
                    <FloatingActionButton style={{position: "fixed", bottom: "30px", right: "30px"}} onClick={() => toggleCoachChatModal(true)}>
                        <CommunicationChat />
                    </FloatingActionButton>
                }
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        coach_id: state.users.userData.coach_id,
        currentClient: state.coach.currentClient,
        clientWorkouts: state.coach.clientWorkouts,
        clientMenus: state.coach.clientMenus
    }
}

export default connect(mapStateToProps, { getClientData, assignWorkoutToClient, assignMenuToClient, toggleCoachChatModal, removeClientMenu, removeClientWorkout })(ClientManager)