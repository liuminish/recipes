import React from 'react';
import './recipe.css';

import { Link } from 'react-router-dom';
import { BiTime } from "react-icons/bi";

class Recipe extends React.Component {
    render() {
        const { id, name, image, time } = this.props.recipe

        return (
            <div className="recipe-container">
                <div className="image-container" onClick={this.props.setCurrentRecipe}>
                    <Link to='/recipe-page'><img src={image} recipeId={id} alt={name} /></Link>
                </div>
                <div className="recipe-quick-info">
                    <div>{name}</div>
                    <div className="recipe-quick-info-time">
                        <p><BiTime /> {time} </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Recipe;