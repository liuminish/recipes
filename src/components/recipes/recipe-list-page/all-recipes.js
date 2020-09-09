import React from 'react';
import './all-recipes.css';
import RecipeList from '../recipe-list/recipe-list';

class AllRecipes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const cuisine = this.props.cuisine.charAt(0).toUpperCase() + this.props.cuisine.slice(1);

        return (
            <div>
                <h1>
                    {cuisine} Recipes
                </h1>
                <div className="recipes-list-container">
                    <RecipeList recipes={this.props.recipes} cuisine={this.props.cuisine} setCurrentRecipe={this.props.setCurrentRecipe} />
                </div>
            </div>
        )
    }
}

export default AllRecipes;