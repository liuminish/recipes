import React from 'react';
import './AllRecipes.css';
import RecipeList from '../recipe-list/RecipeList';

import { RiLoader5Fill } from "react-icons/ri";

class AllRecipes extends React.Component {
    constructor(props) {
        super(props);
    }
    

    render() {
        if (this.props.isFetching || this.props.searchedRecipes === []) {
            return <RiLoader5Fill />
        } else {
            return (
                <div>
                    <h1>
                        Search Results
                    </h1>
                    <div className="recipes-list-container">
                        <RecipeList recipes={this.props.searchedRecipes} cuisine={this.props.cuisine} />
                    </div>
                </div>
            )
        }
        
    }
}

export default AllRecipes;