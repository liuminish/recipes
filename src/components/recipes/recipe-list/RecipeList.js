import React from 'react';
import './RecipeList.css';
import Recipe from '../recipe/Recipe';

import { BiSad } from "react-icons/bi";
import { RiLoader5Fill } from "react-icons/ri";

import { Link } from 'react-router-dom';

class RecipeList extends React.Component {

    render() {
        const currentCuisine = this.props.cuisine;

        if (this.props.isFetching) {
            return <RiLoader5Fill /> 
        } else if (this.props.recipes.length <=0) {
            return (<div className="no-recipes-found">
                <p>No recipes found <BiSad /></p>
                <p>Please add recipes<span>&nbsp;</span><Link to='/add-edit-recipe'>here</Link>!</p>
            </div>)
        } else if (currentCuisine === 'all') {
            return (
                <div className="recipes-container">
                    {this.props.recipes.map(recipe => {
                        return <Recipe recipe={recipe} key={recipe.id} />
                        })
                    }
                </div>
            ) 
        } else {
            const foundRecipes = this.props.recipes.filter(recipe => recipe.cuisineType.find(cuisine => cuisine === currentCuisine));
            if (foundRecipes.length <= 0) {
                return (<div className="no-recipes-found">
                <p>No recipes found <BiSad /></p>
                <p>Please add recipes<span>&nbsp;</span><Link to='/add-edit-recipe'>here</Link>!</p>
            </div>)
            } else {
                return (
                    <div className="recipes-container">
                        {foundRecipes.map(recipe => {
                            return <Recipe recipe={recipe} key={recipe.id} />
                            })
                        }
                    </div>
                ) 
            }
            
        }
    }
}

export default RecipeList;