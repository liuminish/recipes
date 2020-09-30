import React from 'react';
import './SearchBy.css';

import { Link, Redirect } from 'react-router-dom';

import { RiShoppingBasket2Line } from "react-icons/ri";
import { BiFoodMenu } from "react-icons/bi";

import { ItemizedList } from '../../../utils/itemized-list';

class SearchByIngre extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRedirect: false,

            // states which affect include/exclude ingredient list
            includeIngreStatus: false,
            excludeIngreStatus: false,

            // state relating to main search bar
            searchValue: '',

            // state relating to recipe/ingre tab
            searchByRecipe: false,
            searchByIngre: true,

            // state relating to list of ingre to include/exclude
            includeIngre: [],
            excludeIngre: [],

            // state relating to individual ingre searched, before being added to the ingre list
            includeIngreInput: '',
            excludeIngreInput: ''
        }

        this.updateSearchValue = this.updateSearchValue.bind(this);

        this.updateIncludeIngre = this.updateIncludeIngre.bind(this);
        this.updateExcludeIngre = this.updateExcludeIngre.bind(this);

        this.updateIncludeIngreInput = this.updateIncludeIngreInput.bind(this);
        this.updateExcludeIngreInput = this.updateExcludeIngreInput.bind(this);

        this.removeIncludeIngre = this.removeIncludeIngre.bind(this);
        this.removeExcludeIngre = this.removeExcludeIngre.bind(this);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    updateSearchValue(event) {
        this.setState({searchValue: event.target.value})
    }

    // this updates the state of the input fields

    updateIncludeIngreInput(e) {
        this.setState({
            includeIngreInput: e.target.value
        })
    }

    updateExcludeIngreInput(e) {
        this.setState({
            excludeIngreInput: e.target.value
        })
    }

    // this pushes the searched ingredient into respective arrays

    updateIncludeIngre(event) {
        let includeIngreArray = [...this.state.includeIngre];
        
        if  (this.state.includeIngreInput === '') {
            return;
        } else if (event.key !== "Enter") {
            return;
        } else if (this.state.excludeIngre.find(ingre => ingre === this.state.includeIngreInput) || this.state.includeIngre.find(ingre => ingre === this.state.includeIngreInput)) {
            alert('Duplicate item found.');
            return;
        } else {
            includeIngreArray.push(this.state.includeIngreInput);
        }
        
        this.setState({
            includeIngre: includeIngreArray,
            includeIngreInput: '',
            includeIngreStatus: true
        })
    }

    updateExcludeIngre(event) {
        let excludeIngreArray = [...this.state.excludeIngre];
        if  (this.state.excludeIngreInput === '') {
            return;
        } else if (event.key !== "Enter") {
            return;
        } else if (this.state.includeIngre.find(ingre => ingre === this.state.excludeIngreInput) || this.state.excludeIngre.find(ingre => ingre === this.state.excludeIngreInput)) {
            alert('Duplicate item found.');
            return;
        } else {
            excludeIngreArray.push(this.state.excludeIngreInput);
        }
        
        this.setState({
            excludeIngre: excludeIngreArray,
            excludeIngreInput: '',
            excludeIngreStatus: true
        })
    }

    // this removes clicked ingredient from respective array

    removeIncludeIngre(ingredient) {
        const newArray = [...this.state.includeIngre];
        newArray.splice(newArray.findIndex(ingre => ingre === ingredient), 1)

        this.setState({
            includeIngre: newArray
        })
    }

    removeExcludeIngre(ingredient) {
        const newArray = [...this.state.excludeIngre];
        newArray.splice(newArray.findIndex(ingre => ingre === ingredient), 1)

        this.setState({
            excludeIngre: newArray
        })
    }

    // this handles form submit

    handleFormSubmit(event) {
        // checks if any ingredients are added
        if (this.state.includeIngre.length <= 0 && this.state.excludeIngre.length <= 0) {
            alert('You have not added any ingredients to include or exclude.');
            return;
        } else if (event.key !== "Enter") {
            return;
        }

        // fetching search results
        let searchObject = {};

        searchObject.name = this.state.searchValue;
        searchObject.inclIngre = this.state.includeIngre;
        searchObject.exclIngre = this.state.excludeIngre;

        const searchTerm = searchObject;
        
        this.props.searchRecipes(searchObject, searchTerm);
        
        // clear states
        this.setState({
            searchValue: '',
            includeIngre: [],
            excludeIngre: [],
            includeIngreStatus: false,
            excludeIngreStatus: false,
            isRedirect: true
        })
    }

    componentDidMount() {
        this.props.hideMenuDisplay();
    }

    render() {
        // the following sets class for "recipe" or "ingre" tab, which affects css style
        let searchByRecipe = this.state.searchByRecipe ? 'active-search' : 'inactive-search';
        let searchByIngre = this.state.searchByIngre ? 'active-search' : 'inactive-search';

        // the following sets class for list of ingredients to include/exclude, affecting css style
        let includeIngreStatus = this.state.includeIngreStatus ? 'ingre-active-include' : 'ingre-inactive';
        let excludeIngreStatus = this.state.excludeIngreStatus ? 'ingre-active-exclude' : 'ingre-inactive';

        if (this.state.isRedirect) {
            return <Redirect to={`/search-results`} />
        } else {
            return (
                <div className="advanced-search-main">
                    <h1>Advanced Search</h1>
    
                    {/* the below renders the main search bar */}
    
                    <div className="advanced-search-bar">
                        <div>
                            <input className='advanced-search-input' type="text" value={this.state.searchValue} onChange={this.updateSearchValue} onKeyPress={this.handleFormSubmit} />
                            <div className='search-by'>
                                <Link to="/search-by-recipe"><div className={searchByRecipe} id="link"><BiFoodMenu /><span className="search-by-words">Search by</span>&nbsp;Recipe</div></Link>
                                <div className={searchByIngre} id="link"><RiShoppingBasket2Line /><span className="search-by-words">Search by</span>&nbsp;Ingredients</div>
                            </div>
                        </div>
                    </div>
    
                    {/* the below renders the ingredient filters */}
    
                    <div className="search-by-container">
                        <div className="ingredients-component">
                            <h3>Ingredients to Include</h3>
                            <input className="ingre-input" type="text" value={this.state.includeIngreInput} onChange={this.updateIncludeIngreInput} onKeyPress={this.updateIncludeIngre} />
                            <input type="submit" value="Include" onClick={() => this.updateIncludeIngre({key: "Enter"})} />
                            <div className="ingre-input-container">
                                {this.state.includeIngre.map((ingredient, index) => 
                                    <div className={includeIngreStatus} key={index}>
                                        <ItemizedList item={ingredient} handleClick={() => this.removeIncludeIngre(ingredient)} />
                                    </div>)}
                            </div>
                        </div>
                        <div className="ingredients-component">
                            <h3>Ingredients to Exclude</h3>
                            <input className="ingre-input" type="text" value={this.state.excludeIngreInput} onChange={this.updateExcludeIngreInput} onKeyPress={this.updateExcludeIngre} />
                            <input type="submit" value="Exclude" onClick={() => this.updateExcludeIngre({key: "Enter"})} />
                            <div className="ingre-input-container">
                                {this.state.excludeIngre.map((ingredient, index) => 
                                    <div className={excludeIngreStatus} key={index}>
                                        <ItemizedList item={ingredient} handleClick={() => this.removeExcludeIngre(ingredient)} />
                                    </div>)}
                            </div>
                        </div>
                    </div>
                    <div className="advanced-search-button" onClick={() => this.handleFormSubmit({key: "Enter"})}>
                        Advanced Search
                    </div>
                </div>
            )
        }

    }
}

export default SearchByIngre;