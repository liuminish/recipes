import React from 'react';
import './recipe-page.css';

import { RiTeamLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { BiTime } from "react-icons/bi";

class RecipePage extends React.Component {
    render() {
        const { name, image, time, servings, cost, ingredients, instructions, notes } = this.props.recipe;
        const ingredientsList = ingredients.map(ingredient => {
            return <li key={ingredient.id}>{ingredient.amount}<span>&nbsp;</span>{ingredient.unit}<span>&nbsp;</span>{ingredient.ingredient}</li>
        });
        const instructionsList = instructions.map(step => {
            return <li key={step.id}>{step.instruction}</li>
        });

        return (
            <div className="recipe-page">

                <div className="recipe-page-part-one">
                    <div className="recipe-page-image-container">
                        <img src={image} alt={name} />
                    </div>
                    <div className="recipe-title-info">
                        <h1>{name}</h1>
                        <div className="recipe-information">
                            <p><BiTime /><span>&nbsp;&nbsp;</span>{time}<span>&nbsp;</span>minutes</p>
                            <p><RiTeamLine /><span>&nbsp;&nbsp;</span>{servings}<span>&nbsp;</span>servings</p>
                            <p><RiMoneyDollarCircleLine /> {cost}</p>
                        </div>
                    </div>
                </div>

                <div className="recipe-page-part-two">
                    <div className="ingredients-list">
                        <h2>Ingredients</h2>
                        <ul>{ingredientsList}</ul>
                    </div>
                    <div className="preparation-list">
                        <h2>Instructions</h2>
                        <ol>{instructionsList}</ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecipePage;