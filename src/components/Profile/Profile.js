import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserData, updateUserStats, addMacrosToState, getAllProgressPics, getCurrentPhotos, toggleUpdateProfileModal, togglePhotoCompModal } from '../../ducks/userReducer';
import { changeUpdating, clearMacroEntry } from '../../ducks/macroCalcReducer'
import PhotoUpload from '../Photos/PhotoUpload'
import PhotoCard from '../Photos/PhotoCard'
import RaisedButton from 'material-ui/RaisedButton'
import {List, ListItem} from 'material-ui/List'
import MobileTearSheet from '../MobileTearSheet/MobileTearSheet'
import Subheader from 'material-ui/Subheader'
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import Avatar from 'material-ui/Avatar';
import ProgressChart from '../Measurements/ProgressChart'
import PhotoComparison from '../Photos/PhotoComparison'
import Dialog from 'material-ui/Dialog/Dialog';
import './Profile.css'
import IconButton from 'material-ui/IconButton'
import AddPhoto from 'material-ui/svg-icons/image/add-a-photo'


class Profile extends Component{
    constructor() {
        super()
        this.state = {
            showingAllProgressPics: false,
            picturesRetrieved: false,
            updatedHtWtBf: false,
            showingCoachRequest: false,
            isUpdating: false,
            uploadingPhoto: false
        }
        this.updateNewMes = this.updateNewMes.bind(this)
        this.discardNewMes = this.discardNewMes.bind(this)
    }

    
    componentDidMount() {
        console.log("profile props on mount: ", this.props)
        const { userData } = this.props
        const { user_id } = userData
        // if(!user_id){
            this.props.getUserData()
        // }
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
    
        togglePhotoUpload(){
            this.setState({
                uploadingPhoto: !this.state.uploadingPhoto
            })
        }
    
//////////////////////Handles Macro Changes///////////////////
        updateNewMes() {
            const { current_protein, current_carbs, current_fat, current_weight, current_height, current_bf, current_happyness } = this.props
            const { waist, neck, chest } = this.props.curr_mes
            this.props.updateUserStats(current_protein, current_carbs, current_fat, current_weight, current_height, current_bf, waist, chest, neck, current_happyness)
            this.props.changeUpdating()
            console.log('updating measurements')
            this.setState({
                updatedHtWtBf: false
            })
        }
        
        discardNewMes() {
            this.props.clearMacroEntry()
            this.setState({
                updatedHtWtBf: false
            })
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
            // const profileStyles = {
            //     boxShadow: "rgb(90, 123, 132) 0px 1px 1px 1px",
            //     borderRadius: "3px",
            //     width: "100%",
            //     padding: "2em",
            //     gridGap: "0.75em",
            //     backgroundColor: "rgba(237, 255, 237, 0.7)",
            //     height: "100%",
            //     display: "grid",
            //     gridTemplateColumns: "repeat(3, 1fr)",
            //     gridTemplateRows: "100px 100px",
            //     gridAutoFlow: "rows",
            //     width: "100%",
            //     gridGap: "0.75em"            
            // }
            // const jcFlex = {
            //     height: "100%",
            //     display: "flex",
            //     justifyContent: "space-around",
            //     width: "100%",
            //     alignItems: "center"
            // }
            
            // const jcFlexCol = {
            //     height: "100%",
            //     display: "flex",
            //     flexDirection: "column",
            //     justifyContent: "center",
            //     width: "100%",
            //     alignItems: "center"
            // }
            const compareBtn = (this.props.comparisonPhotos.length > 0
                                    ?
                                    <RaisedButton secondary={true} onClick={() => this.props.togglePhotoCompModal(true)} label="Compare Selected"/>
                                    :
                                    null
                                )
        return(
                <section className="comp profile">
                    <h1>Welcome Home</h1>
                    <section className="jcFlex curr-stats">
                        <MobileTearSheet style={{width: "100%", fontSize: "2.75em", backgroundColor: "#4e4b4b33"}}>
                                <Subheader style={{display: "flex", alignItems: "center", lineHeight: "1.25em", padding: "0.5em", justifyContent: "center"}}   >Measurements</Subheader>
                                <List style={{display: "flex", justifyContent: "space-around"}}>
                                    <ListItem innerDivStyle={{fontSize: "0.95em" ,padding: "0.25em 2em"}} onClick={() => this.props.history.push('/measurements')} primaryText="Weight" secondaryText={<span style={{fontSize: "0.85em"}}>{`${current_weight} lbs`}</span>} />
                                    <ListItem innerDivStyle={{fontSize: "0.95em" ,padding: "0.25em 2em"}} onClick={() => this.props.history.push('/measurements')} insetChildren={true} primaryText="Height" secondaryText={<span style={{fontSize: "0.85em"}}>{`${current_height} in`}</span>} />
                                    <ListItem innerDivStyle={{fontSize: "0.95em" ,padding: "0.25em 2em"}} onClick={() => this.props.history.push('/measurements')} insetChildren={true} primaryText="Bodyfat" secondaryText={<span style={{fontSize: "0.85em"}}>{`${current_bf} %`}</span>} />
                                </List>
                        </MobileTearSheet>
                        <MobileTearSheet style={{backgroundColor: "#4e4b4b33", width: "100%"}} >
                            <Subheader style={{display: "flex", alignItems: "center", lineHeight: "1.25em", padding: "0.5em", justifyContent: "center"}}>Current Macros</Subheader>
                            <List style={{display: "flex", justifyContent: "space-around"}}>
                                <ListItem innerDivStyle={{fontSize: "0.95em" ,padding: "0.25em 2em"}} onClick={() => this.props.history.push('/macroCalc')} primaryText="Protein" secondaryText={<span style={{fontSize: "0.85em"}}>{`${current_protein}g`}</span>} />
                                <ListItem innerDivStyle={{fontSize: "0.95em" ,padding: "0.25em 2em"}} onClick={() => this.props.history.push('/macroCalc')} insetChildren={true} primaryText="Fat" secondaryText={<span style={{fontSize: "0.85em"}}>{`${current_fat}g`}</span>} />
                                <ListItem innerDivStyle={{fontSize: "0.95em" ,padding: "0.25em 2em"}} onClick={() => this.props.history.push('/macroCalc')} insetChildren={true} primaryText="Carbs" secondaryText={<span style={{fontSize: "0.85em"}}>{`${current_carbs}g`}</span>} />
                            </List>
                        </MobileTearSheet >
                    {coachRequest}
                </section>
                <section className="comp profile progress-pics">
                    <section className="progress-pic-btn jcFlex">
                        {
                                this.state.showingAllProgressPics
                                ?
                                <section className="jcFlexCol">
                                    <h3 style={{fontSize: "1.75em"}}>All Progress Pictures</h3>
                                    <section className="jcFlex progress-btns" >
                                        <RaisedButton style={{margin: "0 0.5em"}} secondary={true} onClick={()=>this.showAllProgressPics(false)}label="Focus on the Present" />
                                        { compareBtn }
                                    </section>
                                </section>
                                :
                                <section className="jcFlexCol">
                                    <h3 style={{ fontSize: "1.75em"}}>Current Progress Pictures</h3>
                                    <section className="jcFlex progress-btns">
                                        <RaisedButton secondary={true} style={{margin: "0 0.5em"}} onClick={()=>this.showAllProgressPics(true)} label="Reveal the Path" />
                                        { compareBtn }
                                    </section>
                                </section>
                        }
                    </section>
                    <RaisedButton className="add-photo-btn" labelPosition="before" label="Add a Photo" secondary={true} onClick={this.togglePhotoUpload.bind(this)} icon={<AddPhoto />}/>
                    {progressPics}
                    <PhotoUpload toggleOpen={this.togglePhotoUpload.bind(this)} uploadingPhoto={this.state.uploadingPhoto} empty={!progress_pics.length}/>
                </section>
                {
                    this.props.userData.curr_mes_id > 0
                    ?
                    <ProgressChart />
                    :
                    null
                }
                {
                    this.props.isUpdating
                    ?
                    <Dialog open={this.state.updatedHtWtBf} className="new-mes-logic">
                        <p>Looks like you've got some new measurements.</p>
                        <p>Would you like to update them?</p>
                        <RaisedButton secondary={true} onClick={this.updateNewMes}>Yes</RaisedButton>
                        <RaisedButton secondary={true} onClick={this.discardNewMes}>No, get rid of them.</RaisedButton>
                    </Dialog>
                    :
                    null
                }
                <PhotoComparison />
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

export default connect(mapStateToProps, { getUserData, updateUserStats, addMacrosToState, changeUpdating, clearMacroEntry, getAllProgressPics, getCurrentPhotos, toggleUpdateProfileModal, togglePhotoCompModal })(Profile)