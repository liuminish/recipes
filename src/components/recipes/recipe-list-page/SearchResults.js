import React from 'react';
import './AllRecipes.css';
import RecipeList from '../recipe-list/RecipeList';

import { RiLoader5Fill } from "react-icons/ri";

let searchHashTags = [];
let searchStrikeOut = [];

class AllRecipes extends React.Component {

    componentDidMount() {  
        
        this.props.hideMenuDisplay();
        
        searchHashTags = [];
        searchStrikeOut = [];
        searchHashTags.push(this.props.searchTerm.name);

        if (this.props.searchTerm.cuisineType) {
            const { cuisineType, mealType, cookingStyle } = this.props.searchTerm;
            searchHashTags = searchHashTags.concat(cuisineType, mealType, cookingStyle)
        } else if (this.props.searchTerm.inclIngre) {
            searchHashTags = searchHashTags.concat(this.props.searchTerm.inclIngre);
            searchStrikeOut = this.props.searchTerm.exclIngre;
        }

        console.log(this.props.searchTerm)
        console.log(searchHashTags, searchStrikeOut)
    }

    render() {
        
        if (this.props.isFetching || this.props.searchedRecipes === []) {
            return <RiLoader5Fill />
        } else {
            return (
                <div>
                    <h1 className="search-results">
                        Search Results
                    </h1>
                    <div className="search-term-container">
                        <div className="search-hashtag">
                            {searchHashTags.map(type => {
                                return (
                                    <span>#{type}&nbsp;&nbsp;</span>
                                )
                            })}
                        </div>
                        <div className="search-strikeout">
                            {searchStrikeOut.map(type => {
                                return (
                                    <span>#{type}&nbsp;&nbsp;</span>
                                )
                            })}
                        </div>
                    </div>
                    <div className="recipes-list-container">
                        <RecipeList recipes={this.props.searchedRecipes} cuisine={this.props.cuisine} />
                    </div>
                </div>
            )
        }
        
    }
}

export default AllRecipes;