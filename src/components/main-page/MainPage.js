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

    handleSearch(event) {
        if (this.state.searchValue === '') {
            return;
        } else if (event.key === 'Enter') {
            const searchObject = {name: this.state.searchValue};
            const searchTerm = {name: this.state.searchValue};
            this.props.searchRecipes(searchObject, searchTerm);
            this.setState({isRedirect: true})
        } else {
            return;
        }
    }

    componentDidMount() {
        this.props.hideMenuDisplay();
    }
    
    render() {
        if (this.state.isRedirect) {
            return <Redirect to={`/search-results`} />
        } else {
            let inputClass = this.state.inputOpacity ? 'main-search-input-opacity' : 'main-search-input-solid';
            const randomRecipeIndex = Number(Math.floor((Math.random() * this.props.recipeTotal) + 1));

            return (
                <div className="main-page">
                    <h1>What shall we eat today?</h1>
                    <div className="search-bar">
                        <input className={inputClass} type="text" value={this.state.searchValue} onMouseEnter={this.makeInputVisible} onMouseLeave={this.makeInputInvisible} onChange={this.updateSearchValue} onKeyPress={this.handleSearch} />
                        <RiSearchLine className="link" id="main-search-logo" onClick={()=> this.handleSearch({key: "Enter"})} />
                    </div>
                    <div className="other-searches">
                        <Link to="/search-by-recipe" className="link">Advanced Search</Link>
                        <span>&nbsp;|&nbsp;</span>
                        <Link to={`/recipe-page/${randomRecipeIndex}`} className="link">Surprise me!</Link>
                    </div>
                </div>
            )
        }
        
    }
}

export default Mainpage;