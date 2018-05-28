import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchMenus, endNutritionSearch } from '../../ducks/foodReducer'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Info from 'material-ui/svg-icons/action/info'
import Add from 'material-ui/svg-icons/action/note-add'
import IconButton from 'material-ui/IconButton'

class SearchMenu extends Component{
    constructor(){
        super()
        this.state = {
            menuSearch: ''
        }
        this.searchMenus = this.searchMenus.bind(this)
        this.updateMenuSearch = this.updateMenuSearch.bind(this)
        this.endSearches = this.endSearches.bind(this)
        this.handleBtn2Click = this.handleBtn2Click.bind(this)
    }

    searchMenus() {
        this.props.searchMenus(this.state.menuSearch)
        this.setState({
            menuSearch: ''
        })
    }
    
    updateMenuSearch(e) {
        this.setState({
            menuSearch: e.target.value
        })
    }
    
    handleBtn2Click(arg1, m_id){
        if(arg1){
            this.props.btn2Fn(arg1, m_id)
            this.endSearches()
        }else{
            this.props.btn2Fn(m_id)
            this.endSearches()
        }
    }
    
    endSearches(){
        this.setState({ menuSearch: '' })
        this.props.endNutritionSearch()
    }
    
    componentWillUnmount(){
        this.props.endNutritionSearch()
    }


    render() {
        const { arg1, menuSearchResults, btn2Fn, btn2msg, userData } = this.props
        const menuResults = menuSearchResults.map(res => {
                return (
                    <section key={res.menu_id}  className="menu-card order-1-card">
                        <div className="card-left-side">
                            <img src={res.img} alt={res.title}/>
                            <p>Author</p>
                        </div>
                        <div className="card-content">
                            <div className="card-head">
                                <h2>{res.title}</h2>
                            </div>
                            <div className="card-info">
                                <p>{`P: ${res.total_p}g`}</p>
                                <p>{`C: ${res.total_c}`}</p>
                                <p>{`F: ${res.total_f}g`}</p>
                                <p>{`Fib: ${res.total_fib}g`}</p>
                            </div>
                        </div>
                        <div className="actions">
                            <Link to={`/workout/${res.menu_id}`}><IconButton tooltip="Details"><Info/></IconButton></Link>
                            {
                                userData.coach_id !== -7
                                ?
                                <IconButton tooltip={btn2msg} onClick={() => this.handleBtn2Click(arg1, res.menu_id)} ><Add /></IconButton>
                                :
                                null
                            }
                        </div>
                    </section>
                    )   
                })
                return (
                    <section id="menu-search" className="user-menus">
                <h2>Search for a Menu:</h2>
                <div className="search-box">                
                    <TextField floatingLabelText="Search the menu database" value={this.state.menuSearch}  onChange={this.updateMenuSearch} />
                    <RaisedButton onClick={this.searchMenus} label="Search Menus!" secondary={true} />
                    {
                        this.props.menuSearchResults.length > 0
                            ?
                            <RaisedButton secondary={true} icon={<NavigationClose />} onClick={this.endSearches} label="End Search" />
                            :
                            null
                    }
                </div>
                {/* <button style={{width: "300px"}} >Search!</button> */}
                {menuResults}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        menuSearchResults: state.foods.menuSearchResults,
        userData: state.users.userData
    }
}


export default connect(mapStateToProps, { searchMenus, endNutritionSearch })(SearchMenu)





        // <Card key={res.menu_id} style={{backgroundColor: "#fff", maxWidth: "225px", width: "100%"}} >
        //     <CardMedia style={{overflow: "hidden", height: "9.5em"}} >
        //         <img src={res.img} style={{height: "100%"}} alt={res.title} />
        //     </CardMedia>
        //     <CardTitle style={{padding: "0.5em"}} title={res.title} />
        //     <CardText style={{padding: "0.5em"}}>
        //             {`P: ${res.total_p}g C: ${res.total_c} F: ${res.total_f}g Fib: ${res.total_fib}g`}
        //     </CardText>
        //     <CardActions style={{padding: "0.5em"}}>
        //         <Link to={`/menu/${res.menu_id}`}><FlatButton label="Details" /></Link>
        //         {
        //             userData.coach_id !== -7
        //             ?
        //             <FlatButton onClick={() => this.handleBtn2Click(arg1, res.menu_id)} label={btn2msg} />
        //             :
        //             null
        //         }
        //     </CardActions>
        // </Card>
          