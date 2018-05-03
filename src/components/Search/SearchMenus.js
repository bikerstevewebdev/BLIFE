import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchMenus, endNutritionSearch } from '../../ducks/foodReducer'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
// import MenuCard from '../Menu/MenuCard'

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


    render() {
        const { arg2, arg3, handleBtnClick, btnMsg, doSomething, menuSearchResults } = this.props
        const menuResults = menuSearchResults.map(res => {
            //     return <MenuCard menu_id={res.menu_id} title={res.title} total_p={res.total_p} total_c={res.total_c} total_f={res.total_f} total_fib={res.total_fib} img={res.img} parentFn={() => handleBtnClick(res.menu_id, arg2, arg3)} action2={this.endSearches} />
            // }
            return(
                <section className="menu-search-result" key={res.menu_id}>
                    <p>{res.title}</p>
                    <img src={res.img} alt={res.title} />
                    {
                        doSomething
                        ?
                        <RaisedButton secondary={true} onClick={() => handleBtnClick(res.menu_id, arg2, arg3)}>{btnMsg}</RaisedButton>
                        :
                        <Link to={`/menu/${res.menu_id}`}><RaisedButton secondary={true} onClick={this.endSearches}>Take me to this menu!</RaisedButton></Link>
                    }
                </section>
            )
        }
    )
        return (
            <section className="menu-search">
                <h3>Search for a MENU:</h3>
                <TextField floatingLabelText="Search the menu database" value={this.state.menuSearch}  onChange={this.updateMenuSearch} />
                <RaisedButton onClick={this.searchMenus} style={{width: "300px"}} label="Search Menus!" primary={true} />
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