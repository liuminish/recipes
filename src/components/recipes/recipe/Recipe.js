import React from 'react';
import './Recipe.css';

import { Link } from 'react-router-dom';
import { BiTime } from "react-icons/bi";

class Recipe extends React.Component {
    render() {
        const { id, name, imageLink, time, cuisineType, mealType, cookingStyle } = this.props.recipe

        return (
            <div className="recipe-container">
                <div className="image-container">
                    <Link to={`recipe-page/${id}`}><img src={imageLink} recipeId={id} alt={name} /></Link>
                </div>
                <div className="recipe-quick-info">
                    <div className="recipe-quick-info-name">
                        {name}
                    </div>
                    <div className="recipe-quick-info-time">
                        <BiTime /> {time}
                    </div>
                </div>
                <div className="recipe-type-container">
                    <div className="recipe-type">
                        {cuisineType.map(type => {
                            return (
                                <span>#{type}&nbsp;&nbsp;</span>
                            )
                        })}
                    </div>
                    <div className="recipe-type">
                        {mealType.map(type => {
                            return (
                                <span>#{type}&nbsp;&nbsp;</span>
                            )
                        })}
                    </div>
                    <div className="recipe-type">
                        {cookingStyle.map(type => {
                            return (
                                <span>#{type}&nbsp;&nbsp;</span>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Recipe;
