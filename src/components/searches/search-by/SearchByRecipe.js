import React from 'react';
import './SearchBy.css';

import { Link, Redirect } from 'react-router-dom';

import { BiFoodMenu } from "react-icons/bi";
import { RiShoppingBasket2Line, RiErrorWarningLine } from "react-icons/ri";

import { Modal } from '../../../utils/modal';
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
            searchValue: '',

            // state relating to modal
            modalIcon: <RiErrorWarningLine />,
            modalTitle: 'Warning',
            modalContent: '',
            modalButton: 'okay',
            displayModal: false
        }

        this.updateSearchValue = this.updateSearchValue.bind(this);

        this.handleMealCheckboxChange = this.handleMealCheckboxChange.bind(this);
        this.handleCuisineCheckboxChange = this.handleCuisineCheckboxChange.bind(this);
        this.handleStyleCheckboxChange = this.handleStyleCheckboxChange.bind(this);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.hideModal = this.hideModal.bind(this)
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
        const chosenMealTypes = Object
            .keys(this.state.mealTypes)
            .filter(meal => {
                return this.state.mealTypes[meal]
        });
            
        const chosenMealNumbers = chosenMealTypes.map(meal => {
            const foundMealType = this.props.mealTypes.find(record => {
                return record.type === meal
            })

            return foundMealType.id
        });

        const chosenCuisineTypes = Object
            .keys(this.state.cuisineTypes)
            .filter(cuisine => {
                return this.state.cuisineTypes[cuisine]
        });

        const chosenCuisineNumbers = chosenCuisineTypes.map(cuisine => {
            const foundCuisineType = this.props.cuisineTypes.find(record => {
                return record.type === cuisine
            })

            return foundCuisineType.id
        });

        const chosenStyleTypes = Object
            .keys(this.state.cookingStyles)
            .filter(style => {
                return this.state.cookingStyles[style]
        });

        const chosenStyleNumbers = chosenStyleTypes.map(style => {
            const foundCookingStyle = this.props.cookingStyles.find(record => {
                return record.type === style
            })

            return foundCookingStyle.id
        });

        // checks if filters are chosen
        if (chosenMealTypes.length <= 0 || chosenCuisineTypes <= 0 || chosenStyleTypes <= 0) {
            this.setState({
                modalContent: 'Please choose at least one filter for each category.',
                displayModal: true
            });
            return;
        }

        // fetching search results
        let searchObject = {};

        searchObject.name = this.state.searchValue;
        searchObject.mealType = chosenMealNumbers;
        searchObject.cuisineType = chosenCuisineNumbers;
        searchObject.cookingStyle = chosenStyleNumbers;

        let searchTerm = {};
        searchTerm.name = this.state.searchValue;
        searchTerm.mealType = chosenMealTypes;
        searchTerm.cuisineType = chosenCuisineTypes;
        searchTerm.cookingStyle = chosenStyleTypes;
        
        this.props.searchRecipes(searchObject, searchTerm);

        // clears form & redirect
        this.setState({
            searchValue: '',
            mealTypes: reduceArray(this.props.mealTypes),
            cuisineTypes: reduceArray(this.props.cuisineTypes),
            cookingStyles: reduceArray(this.props.cookingStyles),
            isRedirect: true
        })
    }

    // function to hide modal
    hideModal() {
        this.setState({displayModal: false})
    }

    componentDidMount() {
        this.props.hideMenuDisplay();
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
                    <Modal 
                        displayModal={this.state.displayModal}
                        handleClose={this.hideModal}
                        modalIcon={this.state.modalIcon}
                        modalTitle={this.state.modalTitle}
                        modalContent={this.state.modalContent}
                        modalButton={this.state.modalButton}
                    />
                    <div className="advanced-search-main">
                        <form onSubmit={this.handleFormSubmit}>
                            <h1>Advanced Search</h1>
            
                            {/* the below renders the main search bar + recipe/ingredient tabs */}
            
                            <div className="advanced-search-bar">
                                <div>
                                    <input className='advanced-search-input' type="text" value={this.state.searchValue} onChange={this.updateSearchValue} />
                                    <div className='search-by'>
                                        <div className={searchByRecipe} id="link"><BiFoodMenu /><span className="search-by-words">Search by</span>&nbsp;Recipe</div>
                                        <Link to="/search-by-ingre"><div className={searchByIngre} id="link"><RiShoppingBasket2Line /><span className="search-by-words">Search by</span>&nbsp;Ingredients</div></Link>
                                    </div>
                                </div>
                            </div>
            
                            {/* the below renders the checkboxes */}
            
                            <div className="search-by-container">
            
                                <div className="search-by-detailed">
                                    <h3>Cuisine Type</h3>
                                    <div className="checkbox-main-container">
                                        {cuisineOptions.map(option => {
                                            return <Checkbox className="search-by-detailed-checkbox" label={option} onCheckboxChange={this.handleCuisineCheckboxChange} isSelected={this.state.cuisineTypes[option]} />
                                        })}
                                    </div>
                                </div>  
            
                                <div className="search-by-detailed">
                                    <h3>Meal Type</h3>
                                    <div className="checkbox-main-container">
                                        {mealOptions.map(option => {
                                            return <Checkbox className="search-by-detailed-checkbox" label={option} onCheckboxChange={this.handleMealCheckboxChange} isSelected={this.state.mealTypes[option]} />
                                        })}
                                    </div>
                                </div>
                                
                                <div className="search-by-detailed">
                                    <h3>Cooking Style</h3>
                                    <div className="checkbox-main-container">
                                        {styleOptions.map(option => {
                                            return <Checkbox className="search-by-detailed-checkbox" label={option} onCheckboxChange={this.handleStyleCheckboxChange} isSelected={this.state.cookingStyles[option]} />
                                        })}
                                    </div>
                                </div>  
                                    
                            </div>
                            <div className="advanced-search-button" onClick={this.handleFormSubmit}>
                                Advanced Search
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
        
    }
}

export default SearchByRecipe;