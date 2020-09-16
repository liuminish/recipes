import React from 'react';
import './MainPage.css';
import { Link, Redirect } from 'react-router-dom';
import { RiSearchLine } from "react-icons/ri";

class Mainpage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            inputOpacity: false,
            isRedirect: false
        }
    
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.makeInputVisible = this.makeInputVisible.bind(this);
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
        if (this.state.searchValue === '') {
            return;
        } else {
            const searchObject = {name: this.state.searchValue}
            this.props.searchRecipes(searchObject);
            this.setState({isRedirect: true})
        }
    }
    
    render() {
        if (this.state.isRedirect) {
            return <Redirect to={`/search-results`} />
        } else {
            let inputClass = this.state.inputOpacity ? 'main-search-input-opacity' : 'main-search-input-solid';
            const randomRecipeIndex = Number(Math.floor((Math.random() * this.props.recipeTotal) + 1));

            return (
                <div className="main">
                    <h1>What shall we eat today?</h1>
                    <div className="search-bar">
                        <input className={inputClass} type="text" value={this.state.searchValue} onMouseEnter={this.makeInputVisible} onMouseLeave={this.makeInputInvisible} onChange={this.updateSearchValue} />
                        <RiSearchLine className="link" id="main-search-logo" onClick={this.handleSearch}/>
                    </div>
                    <div className="other-searches">
                        <Link to="/search-by-recipe" className="link">Advanced Search</Link>
                        <span>|</span>
                        <Link to={`/recipe-page/${randomRecipeIndex}`} className="link">Surprise me!</Link>
                    </div>
                </div>
            )
        }
        
    }
}

//when surprise me is clicked, generate another random recipe page.

export default Mainpage;