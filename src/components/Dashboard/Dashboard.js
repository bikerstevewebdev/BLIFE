import React, { Component } from 'react'
import { getUserData } from '../../ducks/userReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SearchMeal from '../Search/SearchMeals'
import SearchMenu from '../Search/SearchMenus'
import SearchWorkout from '../Search/SearchWorkouts'
import { Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'


class Dashboard extends Component{
    constructor() {
        super()
        this.state = {
            firstVisit: false
            // searchingMeals: true,
            // searchingMenus: true,
            // searchingWorkouts: true
        }
        // this.endWorkoutSearch = this.endWorkoutSearch.bind(this)
        // this.endMealSearch = this.endMealSearch.bind(this)
        // this.endMenuSearch = this.endMenuSearch.bind(this)
    }
    componentDidMount() {
        if(!this.props.userData.user_id){
            this.props.getUserData()
        }
        console.log('DBoard props', this.props)
    }

    componentDidUpdate() {
        console.log('DBoard updated props', this.props)
        if(!(this.props.userData.username.length > 0)){
            this.setState({
                firstVisit: true
            })
        }
    }

    // getUserObjs() {
    //     axios.get('/auth/me').then(res => {
    //         console.log(res.data)
    //     })
    // }
    
    
    render() {
        return(
            <section className="comp dashboard">
                <h1>Welcome back {this.props.userData.username}</h1>
                <RaisedButton secondary={true} style={{width: "200px"}}><Link to="/firstLogin">First Login</Link></RaisedButton>
                <SearchMeal />
                <SearchMenu />
                <SearchWorkout />
                {
                    this.state.firstVisit
                    ?
                    <Redirect to={`/firstLogin`} />
                    :
                    null
                }
            </section>
        )
    }
}

function mapStateToProps(state){
    return {
        userData: state.users.userData
    }
}

export default connect(mapStateToProps, { getUserData })(Dashboard)
