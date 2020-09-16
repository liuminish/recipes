import React from 'react';
import './SearchBy.css';

import { Link, Redirect } from 'react-router-dom';

import { BiFoodMenu } from "react-icons/bi";
import { RiShoppingBasket2Line } from "react-icons/ri";


import Checkbox from '../../../utils/checkbox';

// function for manipulation of cuisine, meal and cooking type states into arrays

const reduceArray = (array) => {
    const newArray = array.map(object => {
        return object.type
    })
    
    const newerArray = newArray.reduce(
        (array, option) => ({...array,[option]: false}),{}
    );

    return newerArray
}

// function to change an array of objects to an array of strings

const changeToArray = (arrayOfObjects) => {
    const newArray = arrayOfObjects.map(object => {
        return object.type
    })

    return newArray
}

class SearchByRecipe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRedirect: false,
            
            //below states control if active tab is recipe or ingredient
            searchByRecipe: true,
            searchByIngre: false,

            //below states relate to options on form
            mealTypes: reduceArray(this.props.mealTypes),
            cuisineTypes: reduceArray(this.props.cuisineTypes),
            cookingStyles: reduceArray(this.props.cookingStyles),

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
        let newMealTypes = {...this.state.mealTypes};

        if (this.state.mealTypes[selected]) {
            newMealTypes[selected] = false
            this.setState({mealTypes: newMealTypes})
        } else {
            newMealTypes[selected] = true
            this.setState({mealTypes: newMealTypes})
        }
    }

    handleCuisineCheckboxChange(e) {
        const selected = e.target.name;
        let newCuisineTypes = {...this.state.cuisineTypes};

        if (this.state.cuisineTypes[selected]) {
            newCuisineTypes[selected] = false
            this.setState({cuisineTypes: newCuisineTypes})
        } else {
            newCuisineTypes[selected] = true
            this.setState({cuisineTypes: newCuisineTypes})
        }
    }

    handleStyleCheckboxChange(e) {
        const selected = e.target.name;
        let newCookingStyles = {...this.state.cookingStyles};

        if (this.state.cookingStyles[selected]) {
            newCookingStyles[selected] = false
            this.setState({cookingStyles: newCookingStyles})
        } else {
            newCookingStyles[selected] = true
            this.setState({cookingStyles: newCookingStyles})
        }
    }

    // handles form submit
    handleFormSubmit(e) {

        const chosenMealTypes = [];
        Object.keys(this.state.mealTypes).filter(meal => {
                return this.state.mealTypes[meal]
            }).map(meal => {
                return this.props.mealTypes.find(type => {
                    if(type.type === meal) {
                        return chosenMealTypes.push(type.id)
                    } else {
                        return;
                    }
                })
        });

        const chosenCuisineTypes = [];
        Object.keys(this.state.cuisineTypes).filter(cuisine => {
                return this.state.cuisineTypes[cuisine]
            }).map(cuisine => {
                return this.props.cuisineTypes.find(type => {
                    if(type.type === cuisine) {
                        return chosenCuisineTypes.push(type.id)
                    } else {
                        return;
                    }
                })
        });

        const chosenStyleTypes = [];
        Object.keys(this.state.cookingStyles).filter(style => {
                return this.state.cookingStyles[style]
            }).map(style => {
                return this.props.cookingStyles.find(type => {
                    if(type.type === style) {
                        return chosenStyleTypes.push(type.id)
                    } else {
                        return;
                    }
                })
        });

        // checks if filters are chosen
        if (chosenMealTypes.length <= 0 || chosenCuisineTypes <= 0 || chosenStyleTypes <= 0) {
            alert('Please choose at least one filter for each category.');
            return;
        }

        // fetching search results
        let searchObject = {};

        searchObject.name = this.state.searchValue;
        searchObject.mealType = chosenMealTypes;
        searchObject.cuisineType = chosenCuisineTypes;
        searchObject.cookingStyle = chosenStyleTypes;
        
        this.props.searchRecipes(searchObject);

        // clears form & redirect
        this.setState({
            searchValue: '',
            mealTypes: reduceArray(this.props.mealTypes),
            cuisineTypes: reduceArray(this.props.cuisineTypes),
            cookingStyles: reduceArray(this.props.cookingStyles),
            isRedirect: true
        })
    }

    render() {
        //this controls whether "recipe" or "ingredient" tab is active
        let searchByRecipe = this.state.searchByRecipe ? 'active-search' : 'inactive-search';
        let searchByIngre = this.state.searchByIngre ? 'active-search' : 'inactive-search';

        const mealOptions = changeToArray(this.props.mealTypes);
        const cuisineOptions = changeToArray(this.props.cuisineTypes);
        const styleOptions = changeToArray(this.props.cookingStyles);

        if (this.state.isRedirect) {
            return <Redirect to={`/search-results`} />
        } else {
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
                            <h3>Cuisine Type</h3>
                            {cuisineOptions.map(option => {
                                return <Checkbox className="search-by-detailed-checkbox" label={option} onCheckboxChange={this.handleCuisineCheckboxChange} isSelected={this.state.cuisineTypes[option]} />
                            })}
                        </div>  
    
                        <div className="search-by-detailed">
                            <h3>Meal Type</h3>
                            {mealOptions.map(option => {
                                return <Checkbox className="search-by-detailed-checkbox" label={option} onCheckboxChange={this.handleMealCheckboxChange} isSelected={this.state.mealTypes[option]} />
                            })}
                        </div>
                        
                        <div className="search-by-detailed">
                            <h3>Cooking Style</h3>
                            {styleOptions.map(option => {
                                return <Checkbox className="search-by-detailed-checkbox" label={option} onCheckboxChange={this.handleStyleCheckboxChange} isSelected={this.state.cookingStyles[option]} />
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
}

export default SearchByRecipe;