import React from 'react';
import './AllRecipes.css';
import RecipeList from '../recipe-list/RecipeList';

import { RiLoader5Fill } from "react-icons/ri";

class AllRecipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false
        }
    }

    async componentDidMount() {
        this.setState({isFetching: true});
        await this.props.getAllRecipes();
        this.setState({isFetching: false})
    }

    render() {
        const cuisine = this.props.cuisine.charAt(0).toUpperCase() + this.props.cuisine.slice(1);

        if (this.state.isFetching) {
            return <RiLoader5Fill />
        } else {

            return (
                <div>
                    <h1>
                        {cuisine} Recipes
                    </h1>
                    <div className="recipes-list-container">
                        <RecipeList recipes={this.props.recipes} setCurrentRecipe={this.props.setCurrentRecipe} isFetching={this.state.isFetching} cuisine={this.props.cuisine} />
                    </div>
                </div>
            )

        }

    }
}

export default AllRecipes;