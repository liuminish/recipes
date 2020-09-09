import React from 'react';
import './search-by.css';

import { Link } from 'react-router-dom';

import { BiFoodMenu } from "react-icons/bi";
import { RiShoppingBasket2Line } from "react-icons/ri";


import Checkbox from '../../utils/checkbox';

// creating of arrays and objects for checkbox monitoring
const mealOptions = ['Breakfast', 'Desserts', 'Dinner', 'Snacks'];
const cuisineOptions = ['Chinese', 'Filipino', 'Thai', 'Western'];
const styleOptions = ['Easy', 'InstantPot', 'Panfry', 'Slow-cook', 'Vegetarian'];

const mealOptionsReduced = mealOptions.reduce(
    (mealOptions, option) => ({...mealOptions,[option]: false}),{}
);

const cuisineOptionsReduced = cuisineOptions.reduce(
    (cuisineOptions, option) => ({...cuisineOptions,[option]: false}),{}
);

const styleOptionsReduced = styleOptions.reduce(
    (styleOptions, option) => ({...styleOptions,[option]: false}),{}
);

class SearchByRecipe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
            //below states control if active tab is recipe or ingredient
            searchByRecipe: true,
            searchByIngre: false,

            //below states relate to options on form
            mealOptions: mealOptionsReduced,
            cuisineOptions: cuisineOptionsReduced,
            styleOptions: styleOptionsReduced,

            //below states will change based on form input
            searchValue: ''
        }

        this.updateSearchValue = this.updateSearchValue.bind(this);

        this.handleMealCheckboxChange = this.handleMealCheckboxChange.bind(this);
        this.handleCuisineCheckboxChange = this.handleCuisineCheckboxChange.bind(this);
        this.handleStyleCheckboxChange = this.handleStyleCheckboxChange.bind(this);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    // state changes relating to main search bar
    updateSearchValue(event) {
        this.setState({searchValue: event.target.value})
    }

    // functions to handle checkboxes states
    handleMealCheckboxChange(e) {
        const selected = e.target.name;
        let newMealOptions = {...this.state.mealOptions};

        if (this.state.mealOptions[selected]) {
            newMealOptions[selected] = false
            this.setState({mealOptions: newMealOptions})
        } else {
            newMealOptions[selected] = true
            this.setState({mealOptions: newMealOptions})
        }
    }

    handleCuisineCheckboxChange(e) {
        const selected = e.target.name;
        let newCuisineOptions = {...this.state.cuisineOptions};

        if (this.state.cuisineOptions[selected]) {
            newCuisineOptions[selected] = false
            this.setState({cuisineOptions: newCuisineOptions})
        } else {
            newCuisineOptions[selected] = true
            this.setState({cuisineOptions: newCuisineOptions})
        }
    }

    handleStyleCheckboxChange(e) {
        const selected = e.target.name;
        let newStyleOptions = {...this.state.styleOptions};

        if (this.state.styleOptions[selected]) {
            newStyleOptions[selected] = false
            this.setState({styleOptions: newStyleOptions})
        } else {
            newStyleOptions[selected] = true
            this.setState({styleOptions: newStyleOptions})
        }
    }

    // handles form submit
    handleFormSubmit(e) {

        const chosenMealTypes = Object.keys(this.state.mealOptions).filter(meal => this.state.mealOptions[meal]);
        const chosenCuisineTypes = Object.keys(this.state.cuisineOptions).filter(cuisine => this.state.cuisineOptions[cuisine]);
        const chosenStyleTypes = Object.keys(this.state.styleOptions).filter(style => this.state.styleOptions[style]);

        // checks if filters are chosen
        if (chosenMealTypes.length <= 0 && chosenCuisineTypes <= 0 && chosenStyleTypes <= 0) {
            alert('Please choose at least one filter');
            return;
        }

        // this will be replaced with request to server
        console.log('search term is ' + this.state.searchValue);
        console.log('meal type filters selected are ' + chosenMealTypes)
        console.log('cuisine type filters selected are ' + chosenCuisineTypes)
        console.log('cooking style filters selected are ' + chosenStyleTypes)

        // clears form
        this.setState({
            searchValue: '',
            mealOptions: mealOptionsReduced,
            cuisineOptions: cuisineOptionsReduced,
            styleOptions: styleOptionsReduced
        })
    }

    render() {
        //this controls whether "recipe" or "ingredient" tab is active
        let searchByRecipe = this.state.searchByRecipe ? 'active-search' : 'inactive-search';
        let searchByIngre = this.state.searchByIngre ? 'active-search' : 'inactive-search';

        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                <h1>Advanced Search</h1>

                {/* the below renders the main search bar + recipe/ingredient tabs */}

                <div className="advanced-search-bar">
                    <div>
                        <input className='advanced-search-input' type="text" value={this.state.searchValue} onChange={this.updateSearchValue} />
                        <div className='search-by'>
                            <div className={searchByRecipe} id="link"><BiFoodMenu />Search by Recipe</div>
                            <Link to="/search-by-ingre"><div className={searchByIngre} id="link"><RiShoppingBasket2Line />Search by Ingredients</div></Link>
                        </div>
                    </div>
                </div>

                {/* the below renders the checkboxes */}

                <div className="search-by-container">
                    <div className="search-by-detailed">
                        <h3>Meal Type</h3>
                        {mealOptions.map(option => {
                            return <Checkbox className="search-by-detailed-checkbox" label={option} onCheckboxChange={this.handleMealCheckboxChange} isSelected={this.state.mealOptions[option]} />
                        })}
                    </div>
                    <div className="search-by-detailed">
                        <h3>Cuisine Type</h3>
                        {cuisineOptions.map(option => {
                            return <Checkbox className="search-by-detailed-checkbox" label={option} onCheckboxChange={this.handleCuisineCheckboxChange} isSelected={this.state.cuisineOptions[option]} />
                        })}
                    </div>  
                    <div className="search-by-detailed">
                        <h3>Cooking Style</h3>
                        {styleOptions.map(option => {
                            return <Checkbox className="search-by-detailed-checkbox" label={option} onCheckboxChange={this.handleStyleCheckboxChange} isSelected={this.state.styleOptions[option]} />
                        })}
                    </div>      
                </div>
                <div className="advanced-search-button" onClick={this.handleFormSubmit}>
                    Advanced Search
                </div>
                </form>
            </div>
        )
    }
}

export default SearchByRecipe;