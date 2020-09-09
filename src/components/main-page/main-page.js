import React from 'react';
import './main-page.css';
import { Link } from 'react-router-dom';
import { RiSearchLine } from "react-icons/ri";

class Mainpage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            inputOpacity: false
        }
    
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.makeInputVisible = this.makeInputVisible.bind(this);
        this.makeInputInvisible = this.makeInputInvisible.bind(this);
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
    
    render() {
        let inputClass = this.state.inputOpacity ? 'main-search-input-opacity' : 'main-search-input-solid';

        return (
            <div className="main">
                <h1>What shall we eat today?</h1>
                <div className="search-bar">
                    <input className={inputClass} type="text" value={this.state.searchValue} onMouseEnter={this.makeInputVisible} onMouseLeave={this.makeInputInvisible} onChange={this.updateSearchValue} />
                    <RiSearchLine className="link" id="main-search-logo" />
                </div>
                <div className="other-searches">
                    <Link to="/search-by-recipe" className="link">Advanced Search</Link>
                    <span>|</span>
                    <Link to="/recipe-page" className="link" onClick={this.props.randomRecipe}>Surprise me!</Link>
                </div>
            </div>
        )
    }
}

//when surprise me is clicked, generate another random recipe page.

export default Mainpage;