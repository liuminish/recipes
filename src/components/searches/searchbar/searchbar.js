import React from 'react';
import './searchbar.css';
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

    handleSearch() {
        console.log('search term is ' + this.state.searchValue);

        this.setState({
            searchValue: ''
        })
        
    }

    render() {
        let inputClass = this.state.inputOpacity ? 'input-opacity' : 'input-solid';

        return (
            <div className="quick-search">
                    <input className={inputClass} type="text" value={this.state.searchValue} onMouseEnter={this.makeInputVisible} onMouseLeave={this.makeInputInvisible} onChange={this.updateSearchValue} />
                    <RiSearchLine className="link-color-unchanged" id="quick-search-logo" onClick={this.handleSearch} />
            </div> 
        )
    }
}

export default Searchbar;