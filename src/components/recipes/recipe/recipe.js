import React from 'react';
import './Recipe.css';

import { Link } from 'react-router-dom';
import { BiTime } from "react-icons/bi";

class Recipe extends React.Component {
    render() {
        const { id, name, image, time } = this.props.recipe

        return (
            <div className="recipe-container">
                <div className="image-container">
                    <Link to={`recipe-page/${id}`}><img src={image} recipeId={id} alt={name} /></Link>
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