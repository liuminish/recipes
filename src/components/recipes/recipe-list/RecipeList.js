import React from 'react';
import './RecipeList.css';
import Recipe from '../recipe/Recipe';

import { BiSad } from "react-icons/bi";
import { RiLoader5Fill } from "react-icons/ri";

import { Link } from 'react-router-dom';

class RecipeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        }
    }

    componentDidMount() {
        const currentCuisine = this.props.cuisine;

        if (currentCuisine === 'all') {
            this.setState({recipes: this.props.recipes})
        } else {
            const foundRecipes = this.props.recipes.filter(recipe => recipe.cuisineType.find(cuisine => cuisine === currentCuisine));
            this.setState({recipes: foundRecipes})
        }
    }

    render() {
        const { recipes } = this.state;
        if (this.props.isFetching) {
            return <RiLoader5Fill /> 
        } else if (recipes.length <=0) {
            return (<div className="no-recipes-found">
                <p>No recipes found <BiSad /></p>
                <p>Please add recipes<span>&nbsp;</span><Link to='/add-edit-recipe'>here</Link>!</p>
            </div>)
        } else {
            return (
                <div className="recipes-container">
                    {recipes.map(recipe => {
                        return <Recipe recipe={recipe} key={recipe.id} />
                        })
                    }
                </div>
            ) 
        } 
    }
}

export default RecipeList;