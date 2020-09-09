import React from 'react';
import './add-recipe.css';

import Checkbox from '../utils/checkbox';
import { ItemizedListExtended, ItemizedListNoDelete } from '../utils/itemized-list';

import { RiAddLine, RiDeleteBinLine, RiArrowUpCircleLine, RiArrowDownCircleLine, RiEdit2Line } from "react-icons/ri";

import UploadLogo from '../../media/upload_logo.png';

// arrays and objects for checkbox monitoring
const mealOptions = ['Breakfast', 'Desserts', 'Dinner', 'Snacks'];
const cuisineOptions = ['Chinese', 'Filipino', 'Thai', 'Western'];
const styleOptions = ['Easy', 'InstantPot', 'Panfry', 'Slow-cook', 'Vegetarian'];

const mealOptionsReduced = mealOptions.reduce(
    (mealOptions, option) => ({...mealOptions,[option]: false}),{}
);

const cuisineOptionsReduced = cuisineOptions.reduce(
    (cuisineOptions, option) => ({...cuisineOptions,[option]: false}),{}
);

const styleOptionsReduced = styleOptions.reduce(
    (styleOptions, option) => ({...styleOptions,[option]: false}),{}
);

// array for cooking units of measurement
const unitsMeasure = ['select', 'teaspoon', 'tablespoon', 'cup', 'millilitre', 'litre', 'gram', 'kilogram', 'slice', 'piece'];

class AddRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeName: '',
            recipeTime: '',
            recipeServings: '',
            notes: '',
            image: UploadLogo,

            // below states relate to options on form
            mealOptions: mealOptionsReduced,
            cuisineOptions: cuisineOptionsReduced,
            styleOptions: styleOptionsReduced,

            // below states handle ingredients
            currentIngreAmount: '',
            currentIngreUnit: '',
            currentIngre: '',

            addedIngreList: [],

            //below states handle instructions
            instructionCount: 1,
            currentInstruct: '',
            instructList: []

        }

        this.onImageChange = this.onImageChange.bind(this);

        this.changeRecipeName = this.changeRecipeName.bind(this);
        this.changeRecipeTime = this.changeRecipeTime.bind(this);
        this.changeRecipeServings = this.changeRecipeServings.bind(this);
        this.changeNotes = this.changeNotes.bind(this);

        this.changeIngreAmount = this.changeIngreAmount.bind(this);
        this.changeIngreUnit = this.changeIngreUnit.bind(this);
        this.changeIngre = this.changeIngre.bind(this);
        this.addIngre = this.addIngre.bind(this);
        this.deleteIngre = this.deleteIngre.bind(this);
        this.editIngre = this.editIngre.bind(this);

        this.changeInstruct = this.changeInstruct.bind(this);
        this.addInstruct = this.addInstruct.bind(this);
        this.editInstruct = this.editInstruct.bind(this);
        this.deleteInstruct = this.deleteInstruct.bind(this);
        this.moveInstructUp = this.moveInstructUp.bind(this);
        this.moveInstructDown = this.moveInstructDown.bind(this);

        this.handleMealCheckboxChange = this.handleMealCheckboxChange.bind(this);
        this.handleCuisineCheckboxChange = this.handleCuisineCheckboxChange.bind(this);
        this.handleStyleCheckboxChange = this.handleStyleCheckboxChange.bind(this);

        this.saveRecipe = this.saveRecipe.bind(this);
        this.clearRecipe = this.clearRecipe.bind(this);
    }

    // function to handle image upload
    onImageChange(event){
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
              image: URL.createObjectURL(img)
            });
          }
        
    }

    // functions to handle change in name, time, servings, notes
    changeRecipeName(e) {
        this.setState({
            recipeName: e.target.value
        })
    }

    changeRecipeTime(e) {
        this.setState({
            recipeTime: e.target.value
        })
    }

    changeRecipeServings(e) {
        this.setState({
            recipeServings: e.target.value
        })
    }

    changeNotes(e) {
        this.setState({
            notes: e.target.value
        })
    }

    // functions to handle checkbox changes
    handleMealCheckboxChange(e) {
        const selected = e.target.name;
        let newMealOptions = {...this.state.mealOptions};

        if (this.state.mealOptions[selected]) {
            newMealOptions[selected] = false
            this.setState({mealOptions: newMealOptions})
        } else {
            newMealOptions[selected] = true
            this.setState({mealOptions: newMealOptions})
        }
    }

    handleCuisineCheckboxChange(e) {
        const selected = e.target.name;
        let newCuisineOptions = {...this.state.cuisineOptions};

        if (this.state.cuisineOptions[selected]) {
            newCuisineOptions[selected] = false
            this.setState({cuisineOptions: newCuisineOptions})
        } else {
            newCuisineOptions[selected] = true
            this.setState({cuisineOptions: newCuisineOptions})
        }
    }

    handleStyleCheckboxChange(e) {
        const selected = e.target.name;
        let newStyleOptions = {...this.state.styleOptions};

        if (this.state.styleOptions[selected]) {
            newStyleOptions[selected] = false
            this.setState({styleOptions: newStyleOptions})
        } else {
            newStyleOptions[selected] = true
            this.setState({styleOptions: newStyleOptions})
        }
    }

    // functions to handle ingredients
    changeIngreAmount(e) {
        this.setState({
            currentIngreAmount: e.target.value
        })
    }

    changeIngreUnit(e) {
        this.setState({
            currentIngreUnit: e.target.value
        })
    }

    changeIngre(e) {
        this.setState({
            currentIngre: e.target.value
        })
    }

    addIngre() {
        
        if (this.state.currentIngreAmount === '' || this.state.currentIngreUnit === '' || this.state.currentIngre === '' ) {
            return;
        } else if (this.state.currentIngreAmount < 1) {
            alert('Please input valid ingredient amount.');
            return;
        }

        const newIngre = {
            amount: this.state.currentIngreAmount,
            unit: this.state.currentIngreUnit,
            ingredient: this.state.currentIngre
        };

        const newIngreList = [...this.state.addedIngreList];
        newIngreList.push(newIngre);

        this.setState({
            currentIngreAmount: '',
            currentIngreUnit: '',
            currentIngre: '',
            addedIngreList: newIngreList
        })
    }

    editIngre(ingredient) {
        const newArray = [...this.state.addedIngreList];
        newArray.splice(newArray.findIndex(ingre => ingre === ingredient), 1)

        this.setState({
            currentIngreAmount: ingredient.amount,
            currentIngreUnit: ingredient.unit,
            currentIngre: ingredient.ingredient,
            addedIngreList: newArray
        })
    }

    deleteIngre(ingredient) {
        const newArray = [...this.state.addedIngreList];
        newArray.splice(newArray.findIndex(ingre => ingre === ingredient), 1)

        this.setState({
            addedIngreList: newArray
        })
    }

    // functions to handle instructions

    changeInstruct(e) {
        this.setState({
            currentInstruct: e.target.value
        })
    }

    addInstruct() {

        const clonedInstructList = [...this.state.instructList];

        // check if instructions are blank
        if (this.state.currentInstruct === '') {
            return;
        } 
        
        // check if this addition is due to editing of existing instruction
        else if (this.state.instructionCount <= clonedInstructList.length) {
            const indexToReplace = this.state.instructionCount - 1;
            clonedInstructList.splice(indexToReplace, 1, this.state.currentInstruct);
        } 
        
        // check if duplicate instructions
        else if (this.state.instructList.find(instruct => instruct === this.state.currentInstruct)) {
            alert('Duplicated instructions.');
            return;
        } 
        
        // else normal adding of new instructions
        else {
            clonedInstructList.push(this.state.currentInstruct);
        }

        // setting state finally
        this.setState({
            currentInstruct: '',
            instructList: clonedInstructList,
            instructionCount: clonedInstructList.length + 1
        })
        
    }

    editInstruct(instruction) {
        const index = this.state.instructList.findIndex(instruct => instruct === instruction) + 1;

        this.setState({
            currentInstruct: instruction,
            instructionCount: index
        })
    }

    deleteInstruct(instruction) {
        
        const clonedArray = [...this.state.instructList];

        // delete instruction
        clonedArray.splice(clonedArray.findIndex(instruct => instruct === instruction), 1)

        // update state of instruction list and instruction count
        this.setState({
            instructList: clonedArray,
            instructionCount: this.state.instructionCount - 1
        })
    }

    moveInstructUp(instruction) {
        
        const clonedArray = [...this.state.instructList];
        const index = clonedArray.findIndex(instruct => instruct === instruction);

        // checks if instruction is 1st
        if (index < 1) {
            return;
        }

        // delete instruction
        clonedArray.splice(index, 1)

        // insert instruction above
        clonedArray.splice(index - 1, 0, instruction)

        this.setState({
            instructList: clonedArray
        })
    }

    moveInstructDown(instruction) {
        
        const clonedArray = [...this.state.instructList];
        const index = clonedArray.findIndex(instruct => instruct === instruction);

        // checks if instruction is last
        if (index === clonedArray.length - 1) {
            return;
        }

        // delete instruction
        clonedArray.splice(index, 1)

        // insert instruction below
        clonedArray.splice(index + 1, 0, instruction)

        this.setState({
            instructList: clonedArray
        })
    }

    // function to handle save recipe & clear recipe

    saveRecipe() {
        const {
            recipeName,
            recipeTime,
            recipeServings,
            notes,
            image,
            mealOptions,
            cuisineOptions,
            styleOptions,
            addedIngreList,
            instructList
        } = this.state;

        const chosenMealTypes = Object.keys(mealOptions).filter(meal => mealOptions[meal]);
        const chosenCuisineTypes = Object.keys(cuisineOptions).filter(cuisine => cuisineOptions[cuisine]);
        const chosenStyleTypes = Object.keys(styleOptions).filter(style => styleOptions[style]);

        // checking for blank name input
        if (recipeName === '') {
            alert('Please ensure you have filled in a name for the recipe');
            return;
        } 
        
        // checking for invalid time needed input
        else if (isNaN(recipeTime) || recipeTime <= 0 || recipeTime === '') {
            alert('Please input valid "Time needed".');
            return;
        }

        // checking for invalid servings input
        else if (isNaN(recipeServings) || recipeServings <= 0) {
            alert('Please input valid "Servings".');
            return;
        }

        // checking for meal type selection
        else if (chosenMealTypes.length <= 0) {
            alert('Please choose at least one meal type.');
            return;
        }

        // checking for cuisine type selection
        else if (chosenCuisineTypes.length <= 0) {
            alert('Please choose at least one cuisine type.');
            return;
        }

        // checking for style type selection
        else if (chosenStyleTypes.length <= 0) {
            alert('Please choose at least one cooking style.');
            return;
        }
        
        // checking for ingredients
        else if (addedIngreList.length <= 0) {
            alert('Please add at least one ingredient.');
            return;
        }

        // checking for instructions
        else if (instructList.length <= 0) {
            alert('Please add at least one instruction.');
            return;
        }

        // to be replaced with request
        console.log('saving recipe...')
        console.log('Name of recipe: ' + recipeName)
        console.log('Image of recipe :' + image)
        console.log('Meal types are: ' + chosenMealTypes)
        console.log('Cuisine types are: ' + chosenCuisineTypes)
        console.log('Cooking styles are: ' + chosenStyleTypes)
        console.log('Time needed: ' + recipeTime + ' minutes')
        console.log('Serving suggestion: ' + recipeServings)
        console.log('Ingredients needed: ' + addedIngreList)
        console.log('Instructions: ' + instructList)
        console.log('Notes: ' + notes)

        // clearing form
        this.setState({
            recipeName: '',
            recipeTime: '',
            recipeServings: '',
            notes: '',
            image: UploadLogo,
            mealOptions: mealOptionsReduced,
            cuisineOptions: cuisineOptionsReduced,
            styleOptions: styleOptionsReduced,
            currentIngreAmount: '',
            currentIngreUnit: '',
            currentIngre: '',
            addedIngreList: [],
            instructionCount: 1,
            currentInstruct: '',
            instructList: []
        })

        alert('Recipe saved.')
    }

    clearRecipe() {
        this.setState({
            recipeName: '',
            recipeTime: '',
            recipeServings: '',
            notes: '',
            image: UploadLogo,
            mealOptions: mealOptionsReduced,
            cuisineOptions: cuisineOptionsReduced,
            styleOptions: styleOptionsReduced,
            currentIngreAmount: '',
            currentIngreUnit: '',
            currentIngre: '',
            addedIngreList: [],
            instructionCount: 1,
            currentInstruct: '',
            instructList: []
        })
    }

    render() {
        return (
            <div className="add-recipe-main-container">

                <h1>Add/Edit Recipe</h1>

                {/* renders name field */}
                <div className="add-recipe-secondary-container">
                    <div className="add-recipe-individual-row">
                        <div className="add-recipe-key">
                            Recipe Name:
                        </div>
                        <div className="add-recipe-value">
                            <input type="text" value={this.state.recipeName} onChange={this.changeRecipeName} />
                        </div>
                    </div>

                    {/* renders photo upload field */}
                    <div className="add-recipe-individual-row">
                        <div className="add-recipe-key">
                            Photo:
                        </div>
                        <div className="add-recipe-value">
                            <input type="file" name="myImage" onChange={this.onImageChange} />
                            <div className="add-recipe-image-container">
                                <img src={this.state.image} alt="upload" />
                                </div>
                        </div>
                    </div>
                    
                    <div className="add-recipe-divider"></div>

                    {/* renders checkboxes selection */}
                    <div className="add-recipe-individual-row">
                        <div className="add-recipe-main-checkbox-container">
                            <div className="add-recipe-checkbox-container">
                                <p>Meal Type</p>
                                <p className="add-recipe-checkbox">
                                    {mealOptions.map(option => {
                                    return <Checkbox label={option} onCheckboxChange={this.handleMealCheckboxChange} isSelected={this.state.mealOptions[option]} key={option} />
                                    })}
                                </p>
                            </div>
                            <div className="add-recipe-checkbox-container">
                                <p>Cuisine Type</p>
                                <p className="add-recipe-checkbox">
                                    {cuisineOptions.map(option => {
                                    return <Checkbox className="add-recipe-checkbox" label={option} onCheckboxChange={this.handleCuisineCheckboxChange} isSelected={this.state.cuisineOptions[option]} key={option} />
                                    })}
                                </p>
                            </div>
                            <div className="add-recipe-checkbox-container">
                                <p>Cooking Style</p>
                                <p className="add-recipe-checkbox">
                                    {styleOptions.map(option => {
                                    return <Checkbox className="add-recipe-checkbox" label={option} onCheckboxChange={this.handleStyleCheckboxChange} isSelected={this.state.styleOptions[option]} key={option} />
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="add-recipe-divider"></div>

                    {/* renders time and servings field */}
                    <div className="add-recipe-individual-row">
                        <div className="add-recipe-key">
                            Time needed:
                        </div>
                        <div className="add-recipe-value">
                            <input type="number" value={this.state.recipeTime} onChange={this.changeRecipeTime} />
                            minutes
                        </div>
                    </div>

                    <div className="add-recipe-individual-row">
                        <div className="add-recipe-key">
                            Servings:
                        </div>
                        <div className="add-recipe-value">
                            <input type="number" value={this.state.recipeServings} onChange={this.changeRecipeServings} />
                            servings
                        </div>
                    </div>

                    <div className="add-recipe-divider"></div>

                    {/* renders ingredients field */}
                    <div className="add-recipe-individual-row">
                        <div className="add-recipe-key">
                            Ingredients:
                        </div>
                        <div className="add-recipe-ingre-container">
                            <div className="add-recipe-new-ingre">
                                <input type="number" value={this.state.currentIngreAmount} onChange={this.changeIngreAmount} />
                                <select value={this.state.currentIngreUnit} onChange={this.changeIngreUnit}>
                                    {unitsMeasure.map(unit => {
                                        return <option value={unit} key={unit}>{unit}</option>
                                    })}
                                </select>
                                <input type="text" value={this.state.currentIngre} onChange={this.changeIngre} />
                                <RiAddLine id="add-button" onClick={this.addIngre}/>
                            </div>
                            <div className="add-recipe-ingre-list">
                                {this.state.addedIngreList.map(ingredient => {
                                    return (<div className="add-recipe-ingre-list-item">
                                        <div><ItemizedListExtended item={ingredient} key={ingredient} /></div>
                                        <div className="add-recipe-ingre-icon"><RiEdit2Line onClick={() => this.editIngre(ingredient)}/></div>
                                        <div className="add-recipe-ingre-icon"><RiDeleteBinLine onClick={() => this.deleteIngre(ingredient)}/></div>
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="add-recipe-divider"></div>

                    {/* renders instructions field */}
                    <div className="add-recipe-individual-row">
                        <div className="add-recipe-key">
                            Instructions:
                        </div>
                        <div className="add-recipe-instructions">

                            <div className="add-recipe-instructions-list-container">
                                {this.state.instructList.map(instruction => {
                                    return (
                                    <div className="add-recipe-instructions-list-row">
                                        <div className="add-recipe-instruction-number">
                                            {this.state.instructList.findIndex(item => item === instruction) + 1}
                                        </div>
                                        <div className="add-recipe-instruction-item">
                                        <ItemizedListNoDelete item={instruction} />
                                        </div>
                                        <div className="add-recipe-edit-instruction">
                                            <RiEdit2Line className="add-recipe-edit-button" onClick={() => this.editInstruct(instruction)}/>
                                            <RiDeleteBinLine className="add-recipe-edit-button" onClick={() => this.deleteInstruct(instruction)}/>
                                            <RiArrowUpCircleLine className="add-recipe-edit-button" onClick={() => this.moveInstructUp(instruction)}/>
                                            <RiArrowDownCircleLine className="add-recipe-edit-button" onClick={() => this.moveInstructDown(instruction)}/>
                                        </div>
                                    </div>)
                                })} 
                            </div>

                            <div className="add-recipe-new-instructions">
                                <div className="add-recipe-instruction-number">
                                    {this.state.instructionCount}
                                </div>
                                <textarea value={this.state.currentInstruct} onChange={this.changeInstruct} />
                                <RiAddLine id="add-button" onClick={this.addInstruct}/>
                            </div>

                        </div>
                    </div>

                    <div className="add-recipe-divider"></div>

                    {/* renders notes field */}
                    <div className="add-recipe-individual-row">
                        <div className="add-recipe-key">
                            Notes:
                        </div>
                        <div className="add-recipe-value">
                            <textarea value={this.state.notes} onChange={this.changeNotes} />
                        </div>
                    </div>

                </div>

                <div className="add-recipe-divider"></div>

                {/* renders buttons to save or clear recipe */}
                <div className="add-recipe-form-button-container">
                    <div className="add-recipe-form-button" onClick={this.saveRecipe}>
                        Save Recipe
                    </div>
                    <div className="add-recipe-form-button" onClick={this.clearRecipe}>
                        Clear Recipe
                    </div>
                </div>
            </div>
        )
    }
}

export default AddRecipe;