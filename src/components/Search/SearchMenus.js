import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchMenus, endNutritionSearch } from '../../ducks/foodReducer'

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
        const menuResults = this.props.menuSearchResults.map(res => {
            return(
                <section className="menu-search-result" key={res.menu_id}>
                    <p>{res.title}</p>
                    <img src={res.img} alt={res.title} />
                    {
                        this.props.doSomething
                        ?
                        <button onClick={this.props.handleBtnClick}>{this.props.btnMsg}</button>
                        :
                        <Link to={`/menu/${res.menu_id}`}><button onClick={this.endSearches}>Take me to this menu!</button></Link>
                    }
                </section>
            )
        })
        return (
            <section className="menu-search">
                <h3>Search fo a MENU:</h3>
                <input value={this.state.menuSearch} onChange={this.updateMenuSearch} />
                <button style={{width: "300px"}} onClick={this.searchMenus}>Search!</button>
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