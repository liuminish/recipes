import React from 'react';
import { Link } from 'react-router-dom';
import './Navibar.css';

import { RiMenu5Line, RiRestaurant2Fill } from "react-icons/ri";
import { BiSearchAlt, BiEdit, BiFoodMenu } from "react-icons/bi";

class Topbar extends React.Component {
    render() {
        return (
            <div className="topbar">
                <div><RiRestaurant2Fill id="main-logo" /></div>
                <div><Link className="main-logo" to="/"><span id="main-logo">Recipes!</span></Link></div>
            </div>
        )
    }
}

class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayMenu: false,
            displayCategory: false,
        }

        this.changeCatDisplay = this.changeCatDisplay.bind(this);
        this.changeMenuDisplay = this.changeMenuDisplay.bind(this);
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
    
    render() {
        let displayCategory = { display: this.state.displayCategory ? 'block' : 'none' };
        const cuisineList = this.props.cuisineTypes.map(cuisine => {
            return cuisine.type
        })

        return (
            <div className="full-menu">
                <div id="menu-icon" onClick={this.changeMenuDisplay}>
                    <RiMenu5Line className="link-color-unchanged" />
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

export { Topbar, Menu };
