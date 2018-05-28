import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestACoach } from '../../ducks/coachReducer'
import { getAssignedMenus, getUserMenus, addMenuToUser } from '../../ducks/userReducer'
import UserMenuCard from '../Menu/UserMenuCard'
import RaisedButton from 'material-ui/RaisedButton'
import SearchMenu from '../Search/SearchMenus'
import Dialog from 'material-ui/Dialog/Dialog';
import { IconButton, FlatButton } from 'material-ui';
import Add from 'material-ui/svg-icons/content/add'
import CloseBtn from 'material-ui/svg-icons/navigation/close'

class MenusHome extends Component{
    constructor(){
        super()
        this.state = {
            addMenuOpen: false
        }
    }

    componentDidMount(){
        const { userData, userMenus, getUserMenus, getAssignedMenus, assignedMenus } = this.props
        if(!userMenus.length && !userData.has_coach){
            getUserMenus()
        }else if(!assignedMenus.length && userData.has_coach){
            getAssignedMenus()
        }
    }


    
    render() {
        const { userData, userMenus, assignedMenus } = this.props
        let assignedMenuList, menusList
        if(userMenus){
            menusList = userMenus.map(menu => <UserMenuCard user_menu_id={menu.user_menu_id}  key={menu.user_menu_id} menu_id={menu.menu_id} title={menu.title} total_p={menu.total_p} total_c={menu.total_c} total_f={menu.total_f} total_fib={menu.total_fib} img={menu.img}/>)
        }else{
            menusList = null
        }
        if(assignedMenus){
            assignedMenuList = assignedMenus.map(menu => <UserMenuCard  user_menu_id={menu.user_menu_id} key={menu.user_menu_id} assigned menu_id={menu.menu_id} title={menu.title} total_p={menu.total_p} total_c={menu.total_c} total_f={menu.total_f} total_fib={menu.total_fib} img={menu.img}/>)
        }else{
            assignedMenuList = null
        }
        return(
            <section className="main-layout menus-home">
                    <section style={{display: "flex", height: "5rem", justifyContent: "center", alignItems: "center"}} >
                    {
                        menusList.length || assignedMenuList.length
                        ?
                        <h2 style={{fontSize: "1.75em", justifySelf: "center"}}>Your Menus</h2>
                        :
                        <section style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%", justifyContent: "space-around", height: "100%"}}>
                            <h2 style={{fontSize: "1.5em"}} >Looks Like you don't have any menus yet.</h2>
                            <h2 style={{fontSize: "1.25em"}}>{
                                    userData.has_coach
                                    ?
                                    "Chat with your coach to get started."
                                    :
                                    "Go ahead and search for some below!"
                                }
                            </h2>
                        </section>
                        }
                        {
                            // userData.has_coach
                            // ?
                            // <RaisedButton secondary={true} onClick={this.showAssigned} label="Show me my coach's plan" />
                            // :
                                (((userData.coach_id === -6 || userData.coach_id === -9) && !userData.is_admin)
                                ?
                                <RaisedButton onClick={this.props.requestACoach} secondary={true} label="Request a Coach" />
                                :
                                null)
                        }
                    </section>
                    {
                        // this.state.showingAssigned && assignedMenus
                        userData.has_coach
                        ?
                        assignedMenuList
                        :
                        menusList
                        
                    }
                    {
                        userData.has_coach
                        ?
                        null
                        :
                        <IconButton iconStyle={{width: "2rem", height: "2rem"}}  className="icon-btn menu-search-modal" onClick={() => this.setState({ addMenuOpen: true})} tooltip="Add a Menu" >
                            <Add className="icon menu-search-modal" />
                        </IconButton>
                    }
                    <Dialog className="menu-home-search" autoScrollBodyContent={true} open={this.state.addMenuOpen}>
                        <SearchMenu btn2msg={"Add to my Plan"} btn2Fn={this.props.addMenuToUser} />
                        <IconButton className="close-btn" onClick={() => this.setState({ addMenuOpen: false })} tooltip="close"><CloseBtn/></IconButton>
                    </Dialog>
                </section>
        )
    }
}

function mapStateToProps(state){
    const { userData, userMenus, assignedMenus } = state.users
    return {
        userData,
        assignedMenus,
        userMenus
    }
}

export default connect(mapStateToProps, { getAssignedMenus, getUserMenus, addMenuToUser, requestACoach })(MenusHome)