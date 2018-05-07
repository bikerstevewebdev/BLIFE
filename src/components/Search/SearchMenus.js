import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchMenus, endNutritionSearch } from '../../ducks/foodReducer'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import MenuCard from '../Menu/MenuCard'

class SearchMenu extends Component{
    constructor(){
        super()
        this.state = {
            menuSearch: ''
        }
        this.searchMenus = this.searchMenus.bind(this)
        this.updateMenuSearch = this.updateMenuSearch.bind(this)
        this.endSearches = this.endSearches.bind(this)
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

    endSearches(){
        this.props.endNutritionSearch()
    }

    componentWillUnmount(){
        this.props.endNutritionSearch()
    }


    render() {
        const { arg2, arg3, handleBtnClick, btnMsg, doSomething, menuSearchResults, btn2Fn } = this.props
        const menuResults = menuSearchResults.map(res => {
                return <MenuCard menu_id={res.menu_id} btn2Fn={btn2Fn} btn2Label="Add to my menus" title={res.title} total_p={res.total_p} total_c={res.total_c} total_f={res.total_f} total_fib={res.total_fib} img={res.img} parentFn={() => handleBtnClick(res.menu_id, arg2, arg3)} action2={this.endSearches} />
            // }
            // return(
            //     <section className="menu-search-result" key={res.menu_id}>
            //         <p>{res.title}</p>
            //         <img src={res.img} alt={res.title} />
            //         {
            //             doSomething
            //             ?
            //             <RaisedButton secondary={true} onClick={() => handleBtnClick(res.menu_id, arg2, arg3)}>{btnMsg}</RaisedButton>
            //             :
            //             <Link to={`/menu/${res.menu_id}`}><RaisedButton secondary={true} onClick={this.endSearches}>Take me to this menu!</RaisedButton></Link>
            //         }
            //     </section>
            // )
        })
        // const ownStyle = {
        //     width: "100%",
        //     display: "grid",
        //     gridTemplateRows: "auto",
        //     gridTemplateColumns: "1fr 1fr",
        //     justifyContent: "center",
        //     gridGap: "0.75em"
        // }
        return (
            <section style={{...this.props.style}} className="menu-search">
                <h3 style={{gridColumn: "1/3", justifySelf: "center"}}>Search for a MENU:</h3>
                <TextField underlineStyle={{zIndex: "-3", height: "65%", border: "1px solid rgb(178, 255, 89)"}} style={{gridColumn: "1/2"}} floatingLabelText="Search the menu database" value={this.state.menuSearch}  onChange={this.updateMenuSearch} />
                <RaisedButton style={{alignSelf: "center", width: "100%", gridColumn: "2/3"}} onClick={this.searchMenus} label="Search Menus!" primary={true} />
                {/* <button style={{width: "300px"}} >Search!</button> */}
                {menuResults}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        menuSearchResults: state.foods.menuSearchResults,
    }
}


export default connect(mapStateToProps, { searchMenus, endNutritionSearch })(SearchMenu)