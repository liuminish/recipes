import React from 'react';
import './RecipeList.css';
import Recipe from '../recipe/Recipe';

import { BiSad } from "react-icons/bi";

import { Link } from 'react-router-dom';

class RecipeList extends React.Component {
    render() {

        const currentCuisine = this.props.cuisine;
        let foundRecipes = [];

        if (currentCuisine === 'all') {
            return foundRecipes = this.props.recipes
        }

        if (currentCuisine === 'all' && foundRecipes.length > 0) {
            foundRecipes = this.props.recipes.filter(recipe => {
                return recipe.cuisineType.find(cuisine => {
                     return cuisine === currentCuisine
                 }) 
             });
             
            return (
                <div className="recipes-container">
                    {foundRecipes.map(recipe => {
                        return <Recipe recipe={recipe} key={recipe.id} />
                        })
                    }
                </div>
            ) 
        } else if (foundRecipes.length <= 0) {
            return (<div className="no-recipes-found">
                <p>No recipes found <BiSad /></p>
                <p>Please add recipes<span>&nbsp;</span><Link to='/add-edit-recipe'>here</Link>!</p>
            </div>)
        } else {
            return (
                <div className="recipes-container">
                    {foundRecipes.map(recipe => {
                        return <Recipe recipe={recipe} key={recipe.id} />
                        
                    })}
                </div>
            )
        }
        
        
    }
}

export default RecipeList;