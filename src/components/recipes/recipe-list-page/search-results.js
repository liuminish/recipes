import React from 'react';
import './all-recipes.css';
import RecipeList from '../recipe-list/recipe-list';

class AllRecipes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>
                    Search Results
                </h1>
                <div className="recipes-list-container">
                    <RecipeList recipes={this.props.recipes} cuisine={this.props.cuisine} setCurrentRecipe={this.props.setCurrentRecipe} />
                </div>
            </div>
        )
    }
}

export default AllRecipes;