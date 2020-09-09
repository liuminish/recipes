import React from 'react';
import './recipe-list.css';
import Recipe from '../recipe/recipe';

import { BiSad } from "react-icons/bi";

import { Link } from 'react-router-dom';

class RecipeList extends React.Component {
    render() {
        const currentCuisine = this.props.cuisine;
        const foundRecipes = [];
        this.props.recipes.map(recipe => {
            if (recipe.cuisineType.find(cuisine => cuisine === currentCuisine)) {
                foundRecipes.push(recipe)
            }
        });

        if (currentCuisine === 'all') {
            return (
                <div className="recipes-container">
                    {this.props.recipes.map(recipe => {
                        return <Recipe recipe={recipe} key={recipe.id} setCurrentRecipe={this.props.setCurrentRecipe}/>
                        })
                    }
                </div>
            )
        } else if (foundRecipes.length <= 0) {
            return (<div className="no-recipes-found">
                <p>No recipes found <BiSad /></p>
                <p>Please add recipes<span>&nbsp;</span><Link to='/add-recipe'>here</Link>!</p>
            </div>)
        } else {
            return (
                <div className="recipes-container">
                    {foundRecipes.map(recipe => {
                        return <Recipe recipe={recipe} key={recipe.id} setCurrentRecipe={this.props.setCurrentRecipe}/>
                        
                    })}
                </div>
            )
        }
        
    }
}

export default RecipeList;