import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserData, updateUserStats, addMacrosToState, getAllProgressPics, getCurrentPhotos, toggleUpdateProfileModal, togglePhotoCompModal } from '../../ducks/userReducer';
import { changeUpdating, clearMacroEntry } from '../../ducks/macroCalcReducer'
import { getCoachRequestInfo, acceptCoachRequest } from '../../ducks/coachReducer'
// import MenuCard from '../Menu/MenuCard'
// import WorkoutCard from '../Workout/WorkoutCard'
// import SearchMenus from '../Search/SearchMenus'
// import SearchWorkouts from '../Search/SearchWorkouts'
import PhotoUpload from '../Photos/PhotoUpload'
import PhotoCard from '../Photos/PhotoCard'
import RaisedButton from 'material-ui/RaisedButton'
// import { Image } from 'semantic-ui-react'
import {List, ListItem} from 'material-ui/List'
import MobileTearSheet from '../MobileTearSheet/MobileTearSheet'
// import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import Avatar from 'material-ui/Avatar';
import ProgressChart from '../Measurements/ProgressChart'
import PhotoComparison from '../Photos/PhotoComparison'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class Profile extends Component{
    constructor() {
        super()
        this.state = {
            // showingAssigned: false,
            showingAllProgressPics: false,
            picturesRetrieved: false,
            updatedHtWtBf: false,
            showingCoachRequest: false
        }
        this.updateNewMes = this.updateNewMes.bind(this)
        this.discardNewMes = this.discardNewMes.bind(this)
        // this.showAssigned = this.showAssigned.bind(this)
    }

    
    componentDidMount() {
        console.log(this.props)
        const { userData, getCoachRequestInfo } = this.props
        const { coach_id } = userData
        if(!this.props.userData.user_id){
            this.props.getUserData()
        }
        if(coach_id === -411){
            getCoachRequestInfo()
        }
        // const { pro, carbs, fat, curr_mes, userData, bodyfat, weight, height } = this.props
        // if(curr_mes.mes_id !== userData.curr_mes && pro > 0){
        //     this.props.addMacrosToState(pro, carbs, fat, bodyfat, weight, height)
        //     this.setState({
        //         updatedHtWtBf: true
        //     })
        // }else if(curr_mes.mes_id !== userData.curr_mes){
        //     this.setState({
        //         updatedHtWtBf: true
        //     })
        // }
    }
    componentDidUpdate() {
        console.log('profile updated:', this.props)
        const { pro, carbs, fat, bodyfat, weight, height, userData, isUpdating } = this.props
        if(isUpdating && !this.state.updatedHtWtBf){
            this.props.addMacrosToState(pro, carbs, fat, bodyfat/1, weight/1, height/1, userData.curr_mes)
            this.setState({
                updatedHtWtBf: true
            })
        }
        // console.log(curr_mes.mes_id, userData.curr_mes_id, pro)
        // Checking to see if macros were calced, and add them to state in userReducer if so
        // User can update their measurements and macros if they want to keep the new numbers or discard them
        // }else if(curr_mes.mes_id !== userData.curr_mes_id){
        //     this.setState({
        //         updatedHtWtBf: true
        //     })
        // }
    }

        showAllProgressPics(val){
            if(val){
                this.props.getAllProgressPics()
            }else{
                this.props.getCurrentPhotos()
            }
            this.setState({
                showingAllProgressPics: val
            })
        }
    
//////////////////////Handles Macro Changes///////////////////
        updateNewMes() {
            const { current_protein, current_carbs, current_fat, current_weight, current_height, current_bf, current_happyness } = this.props
            const { waist, neck, chest } = this.props.curr_mes
            this.props.updateUserStats(current_protein, current_carbs, current_fat, current_weight, current_height, current_bf, waist, chest, neck, current_happyness)
            this.props.changeUpdating()
            console.log('updating measurements')
        }

        discardNewMes() {
            this.props.clearMacroEntry()
            console.log('discarding new measurements')
        }
//////////////////////Handles Macro Changes///////////////////

        showCoachRequest(){
            this.setState({showingCoachRequest: true})
        }

        sendAccept(){
            this.props.acceptCoachRequest(this.props.coach_req_info.client_coach_id)
            this.setState({showingCoachRequest: false})
        }

        
        render() {
            const { current_protein, current_carbs, current_fat, current_weight, current_height, current_bf, userData, progress_pics, coach_req_info } = this.props
            const progressPics = progress_pics.map(pic => <PhotoCard key={pic.photo_id} date_added={pic.date_added} src={pic.url} photo_id={pic.photo_id} alt={userData.username + ' ' + pic.type} />)
            let reqBtn = <RaisedButton label="View Coach Request" onClick={this.showCoachRequest.bind(this)}/>
            let coachRequest = coach_req_info.client_coach_id ? reqBtn : null
            const profileStyles = {
                height: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "150px",
                gridAutoFlow: "rows",
                // gridAutoRows: "150px",
                width: "100%",
                gridGap: "0.75em"            
            }
            const statsStyles = {
                gridArea: "3/3/4/4",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                width: "100%",
            }
        return(
            <section style={{...profileStyles}} className="comp profile">
                <img style={{justifySelf: "end", width: "150px", height: "150px", borderRadius: "50%", overFlow: "hidden", gridArea: "1/1/2/2"}} src={userData.profile_pic} alt="Looks like you don't have a picture! Why don't you go ahead and update your profile and fix that real quick!"/>
                <h1 style={{gridArea: "1/2/2/3", justifySelf: "center", fontSize: "2em"}}>Welcome Home</h1>
                <section style={{gridArea: "1/3/2/4", display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "space-around"}}>
                    <Link to='/'><RaisedButton secondary={true} style={{backgroundColor: "yellow"}}>Back to Login</RaisedButton></Link>
                    {coachRequest}
                    <RaisedButton onClick={() => this.props.toggleUpdateProfileModal(true)} secondary={true} style={{backgroundColor: "orange"}}>Update Profile</RaisedButton>
                </section>
                <section style={{...profileStyles, gridArea: "2/1/3/4", justifyItems: "center", alignItems: "center", gridAutoRows: "9.375em"}} className="progress-pics">
                    <section style={{gridArea: "1/1/2/2"}} className="progress-pic-btn">
                        {
                            this.state.showingAllProgressPics
                            ?
                            <section>
                                <h3>All of your Progress Pics:</h3>
                                <RaisedButton secondary={true} onClick={()=>this.showAllProgressPics(false)}>Just Show Me My Current Progress Pictures</RaisedButton>
                            </section>
                            :
                            <section>
                                <h3>Your Current Progress Pics:</h3>
                                <RaisedButton secondary={true} onClick={()=>this.showAllProgressPics(true)}>Show me all my progress pictures</RaisedButton>
                            </section>
                        }
                        {
                            this.props.comparisonPhotos.length > 0
                            ?
                            <RaisedButton onClick={() => this.props.togglePhotoCompModal(true)} label="Compare Selected Photos"/>
                            :
                            null
                        }
                    </section>
                    {progressPics}
                    <PhotoUpload  />
                </section>
                <ProgressChart styles={{gridArea: "3/1/4/3"}}/>
                {
                    userData.coach_id > 0
                    ?
                    <Link to={`/coachManager/${userData.coach_id}`}><RaisedButton secondary={true} label="Coach Manager"/></Link>
                    :
                    null
                }
                <section style={{...statsStyles}} className="current-stats">
                    <MobileTearSheet >
                        <Subheader>Current Measurements</Subheader>
                        <List>
                            <ListItem onClick={() => this.props.history.push('/measurements')} leftAvatar={<Avatar icon={<EditorInsertChart />} backgroundColor={yellow600}/>} primaryText="Weight" secondaryText={current_weight} />
                            <ListItem onClick={() => this.props.history.push('/measurements')} insetChildren={true} primaryText="Height" secondaryText={current_height} />
                            <ListItem onClick={() => this.props.history.push('/measurements')} insetChildren={true} primaryText="Bodyfat" secondaryText={current_bf} />
                        </List>
                    </MobileTearSheet>
                    <MobileTearSheet >
                        <Subheader>Current Macros</Subheader>
                        <List>
                            <ListItem onClick={() => this.props.history.push('/macroCalc')} leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />} primaryText={`Protein`} secondaryText={`${current_protein}g`} />
                            <ListItem onClick={() => this.props.history.push('/macroCalc')} insetChildren={true} primaryText={`Fat`} secondaryText={`${current_fat}g`} />
                            <ListItem onClick={() => this.props.history.push('/macroCalc')} insetChildren={true} primaryText={`Carbs`} secondaryText={`${current_carbs}g`} />
                        </List>
                    </MobileTearSheet >
                </section>
                {
                    this.props.isUpdating
                    ?
                    <section className="new-mes-logic">
                        <p>Looks like you've got some new measurements.</p>
                        <p>Would you like to update them?</p>
                        <RaisedButton secondary={true} onClick={this.updateNewMes}>Yes</RaisedButton>
                        <RaisedButton secondary={true} onClick={this.discardNewMes}>No, get rid of them.</RaisedButton>
                    </section>
                    :
                    null
                }
                <PhotoComparison />
                <Dialog open={this.state.showingCoachRequest}>
                    <p>{this.props.coach_req_info.fullname} is requesting your approval to coach you.</p>
                    <RaisedButton primary={true} label="Accept" onClick={this.sendAccept.bind(this)} />
                    <FlatButton onClick={() => this.setState({showingCoachRequest: false})} label="close" />
                </Dialog>
            </section>
        )
    }
}

function mapStateToProps(state){
    const { user, curr_mes, userData, comparisonPhotos } = state.users,
          { profile_pic, current_protein, current_carbs, current_fat, current_weight, current_height, current_bf, progress_pics, current_happyness } = user,
          { macros, weight, height, bodyfat, isUpdating } = state.macros
    return{
        profile_pic,
        current_protein,
        current_carbs,
        current_fat,
        current_weight,
        current_height,
        current_bf,
        userData,
        curr_mes,
        pro: macros.protein,
        carbs: macros.carbs,
        fat: macros.fat,
        weight,
        height,
        bodyfat,
        isUpdating,
        progress_pics,
        comparisonPhotos,
        current_happyness,
        coach_req_info: state.coach.coach_req_info
    }
}

export default connect(mapStateToProps, { getUserData, updateUserStats, addMacrosToState, changeUpdating, clearMacroEntry, getAllProgressPics, getCurrentPhotos, toggleUpdateProfileModal, togglePhotoCompModal, getCoachRequestInfo, acceptCoachRequest })(Profile)