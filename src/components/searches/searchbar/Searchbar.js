import React from 'react';
import './Searchbar.css';
import { Link } from 'react-router-dom';
import { RiSearchLine } from "react-icons/ri";

class Searchbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            inputOpacity: false
        }

        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.makeInputVisible = this.makeInputVisible.bind(this);
        this.makeInputInvisible = this.makeInputInvisible.bind(this);
        this.makeInputInvisible = this.makeInputInvisible.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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
        let inputClass = this.state.inputOpacity ? 'input-opacity' : 'input-solid';
        let linkLocation = window.screen.width <= 780 ? 'search-by-recipe' : '/search-results';

        return (
            <div className="quick-search">
                    <input className={inputClass} type="text" value={this.state.searchValue} onMouseEnter={this.makeInputVisible} onMouseLeave={this.makeInputInvisible} onChange={this.updateSearchValue} onKeyPress={this.handleSearch} />
                    <Link to={linkLocation}><RiSearchLine className="link-color-unchanged" id="quick-search-logo" onClick={()=> this.handleSearch({key: "Enter"})} /></Link>
            </div> 
        )
    }
}

export default Searchbar;
