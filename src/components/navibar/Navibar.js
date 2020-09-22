import React from 'react';
import { Link } from 'react-router-dom';
import './Navibar.css';

import { RiMenu5Line, RiRestaurant2Fill, RiSearchLine } from "react-icons/ri";
import { BiSearchAlt, BiEdit, BiFoodMenu } from "react-icons/bi";

class Navibar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayMenu: false,
            displayCategory: false,

            searchValue: '',
            inputOpacity: false
        }

        this.changeCatDisplay = this.changeCatDisplay.bind(this);
        this.changeMenuDisplay = this.changeMenuDisplay.bind(this);

        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.makeInputVisible = this.makeInputVisible.bind(this);
        this.makeInputInvisible = this.makeInputInvisible.bind(this);
        this.makeInputInvisible = this.makeInputInvisible.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    changeMenuDisplay() {
        if (this.state.displayMenu) {
            this.setState({ displayMenu: false, displayCategory: false, displayAdd: false })
        } else {
            this.setState({ displayMenu: true })
        }
    }

    changeCatDisplay() {
        if (this.state.displayCategory) {
            this.setState({ displayCategory: false })
        } else {
            this.setState({ displayCategory: true })
        }
    }

    makeInputVisible() {
        this.setState({ inputOpacity: true })  
    }

    makeInputInvisible() {
        this.setState({ inputOpacity: false })  
    }

    updateSearchValue(event) {
        this.setState({searchValue: event.target.value})
    }

    handleSearch(event) {
        if (this.state.searchValue === '') {
            return;
        } else if (event.key === "Enter") {
            const searchObject = {name: this.state.searchValue};
            const searchTerm = searchObject;
            this.props.searchRecipes(searchObject, searchTerm);
            this.setState({searchValue: ''})
        }
        
    }
    
    render() {
        // this controls display status of full menu
        let displayCategory = { display: this.state.displayCategory ? 'block' : 'none' };
        const cuisineList = this.props.cuisineTypes.map(cuisine => {
            return cuisine.type
        })

        // this controls opacity of quick search
        let inputClass = this.state.inputOpacity ? 'input-opacity' : 'input-solid';
        let linkLocation = window.screen.width <= 780 ? 'search-by-recipe' : '/search-results';

        return (
            <div>
                <div className="navi-bar" >
                   
                    <div className="menu-icon" onClick={this.changeMenuDisplay}>
                        <RiMenu5Line className="link-color-unchanged" />
                    </div>

                    <div className="main-title">
                        <Link className="main-logo" to="/"><RiRestaurant2Fill />Recipes!</Link>
                    </div>

                    <div className="quick-search">
                        <input className={inputClass} type="text" value={this.state.searchValue} onMouseEnter={this.makeInputVisible} onMouseLeave={this.makeInputInvisible} onChange={this.updateSearchValue} onKeyPress={this.handleSearch} />
                        <Link to={linkLocation}><RiSearchLine className="link-color-unchanged" id="quick-search-logo" onClick={()=> this.handleSearch({key: "Enter"})} /></Link>
                    </div> 

                </div>
                <div className="menu" style={{ display: this.state.displayMenu ? 'block' : 'none' }}>
                    <p className="link" id="main-menu-item" onClick={this.changeCatDisplay}><Link to='/all-recipes'><BiFoodMenu />Recipes</Link></p>
                    <Link to="/all-recipes"><p className="link" id="category" style={displayCategory} onClick={this.props.changeAll}>All</p></Link>
                    {cuisineList.map(type => {
                        const displayName = type.charAt(0).toUpperCase() + type.slice(1);
                        return (
                            <Link to="/all-recipes"><p className="link" id="category" style={displayCategory} onClick={() => {this.props.changeCuisine(type)}}>{displayName}</p></Link>
                        )
                    })}
                    <Link to='/search-by-recipe'><p className="link" id="main-menu-item"><BiSearchAlt />Search</p></Link>
                    <Link to='/add-edit-recipe'><p className="link" id="main-menu-item"><BiEdit />Add New</p></Link>
                </div>
            </div>
        )
    }
}

export default Navibar;