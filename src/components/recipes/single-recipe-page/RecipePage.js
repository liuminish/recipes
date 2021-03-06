import React from 'react';
import './RecipePage.css';

import { RiTeamLine, RiStickyNoteLine, RiLoader5Fill, RiDeleteBinLine } from "react-icons/ri";
import { withRouter } from 'react-router-dom'
import { BiTime } from "react-icons/bi";
import { Link, Redirect } from 'react-router-dom';
import fetchData from '../../../utils/fetch-data';

import { ModalExtended } from '../../../utils/modal';

class RecipePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            isFetching: false,
            displayModal: false
        }
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    async componentDidMount() {
        this.props.hideMenuDisplay();
        this.setState({isFetching: true})
        const { params: { recipeId } } = this.props.match;
        await this.props.getFullRecipe(recipeId);
        this.setState({isFetching: false})
    }

    deleteRecipe() {
        fetchData.deleteRecipe(this.props.currentRecipe.id).then(
            this.setState({redirect: true})
        )
    }

    showModal() {
        this.setState({displayModal: true})
    }

    hideModal() {
        this.setState({displayModal: false})
    }

    render() {
        if (this.state.isFetching || !this.props.currentRecipe.ingredients) {
            return <RiLoader5Fill />
        } else if (this.state.redirect) {
            return <Redirect to='/all-recipes' />
        } else {
            const { name, imageLink, time, servings, ingredients, instructions, mealType, cuisineType, cookingStyle, notes } = this.props.currentRecipe;
            const ingredientsList = ingredients.map(ingredient => {
                return <li key={ingredient.id}>{ingredient.amount}<span>&nbsp;</span>{ingredient.unit}<span>&nbsp;</span>{ingredient.ingredient}</li>
            });
            const instructionsList = instructions.map(step => {
                return <li key={step}>{step}</li>
            });

            return (
                <div>
                    <ModalExtended 
                        displayModal={this.state.displayModal}
                        handleOk={this.deleteRecipe}
                        handleClose={this.hideModal}
                        modalIcon={<RiDeleteBinLine />}
                        modalTitle='Delete recipe'
                        modalContent='Are you sure?'
                        modalButton={this.state.modalButton}
                    />
                    <div className="recipe-page">

                        <div className="recipe-page-part-one">
                            <div className="recipe-page-image-container">
                                <img src={imageLink} alt={name} />
                            </div>
                            <div className="recipe-title-info">
                                <h1>{name}</h1>
                                <div className="recipe-cat-container">
                                    <div className="recipe-cat">
                                        {cuisineType.map(type => {
                                            return (
                                                <span>#{type}&nbsp;&nbsp;</span>
                                            )
                                        })}
                                    </div>
                                    <div className="recipe-cat">
                                        {mealType.map(type => {
                                            return (
                                                <span>#{type}&nbsp;&nbsp;</span>
                                            )
                                        })}
                                    </div>
                                    <div className="recipe-cat">
                                        {cookingStyle.map(type => {
                                            return (
                                                <span>#{type}&nbsp;&nbsp;</span>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="recipe-information">
                                    <p><BiTime /><span>&nbsp;&nbsp;</span>{time}<span>&nbsp;</span>minutes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<RiTeamLine /><span>&nbsp;&nbsp;</span>{servings}<span>&nbsp;</span>servings</p>
                                    <p><span><RiStickyNoteLine /></span><span>&nbsp;&nbsp;</span>{notes}</p>
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

                    <div className="edit-buttons-container">
                        
                        <Link to="/add-edit-recipe">
                        <div className="edit-buttons" onClick={this.props.isEditMode}>
                            Edit
                        </div>
                        </Link>

                        <Link to="/add-edit-recipe">
                        <div className="edit-buttons" onClick={this.props.isDuplicateMode}>
                            Duplicate
                        </div>
                        </Link>
                        
                        <div className="edit-buttons" onClick={this.showModal}>
                            Delete
                        </div>

                    </div>

                </div>
            )
        }
    }
}

export default withRouter(RecipePage);