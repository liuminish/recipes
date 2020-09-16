import React from 'react';
import './RecipeList.css';
import Recipe from '../recipe/Recipe';

import { BiSad } from "react-icons/bi";
import { RiLoader5Fill } from "react-icons/ri";

import { Link } from 'react-router-dom';

class RecipeList extends React.Component {
    render() {

        const currentCuisine = this.props.cuisine;
        let foundRecipes = [];

        console.log(this.props.recipes)

        if (currentCuisine === 'all') {
            foundRecipes = this.props.recipes
        } else {
            this.props.recipes.map(recipe => {
                if (recipe.cuisineType.find(cuisine => cuisine === currentCuisine)) {
                    foundRecipes.push(recipe)
                }
            });
        }

        console.log(foundRecipes.length)

        if (currentCuisine === 'all' && foundRecipes.length > 0) {
            console.log('showing all recipes...')
            return (
                <div className="recipes-container">
                    {foundRecipes.map(recipe => {
                        return <Recipe recipe={recipe} key={recipe.id} />
                        })
                    }
                </div>
            ) 
        } else if (foundRecipes.length <= 0) {
            console.log('no recipes to show :(')
            return (<div className="no-recipes-found">
                <p>No recipes found <BiSad /></p>
                <p>Please add recipes<span>&nbsp;</span><Link to='/add-edit-recipe'>here</Link>!</p>
            </div>)
        } else {
            console.log('showing special recipes only')
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