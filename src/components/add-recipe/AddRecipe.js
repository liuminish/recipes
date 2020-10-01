import React from 'react';
import './AddRecipe.css';

import Checkbox from '../../utils/checkbox';
import { ItemizedListExtended, ItemizedListNoDelete } from '../../utils/itemized-list';
import fetchData from '../../utils/fetch-data';
import { Modal } from '../../utils/modal';

import { RiAddLine, RiDeleteBinLine, RiArrowUpCircleLine, RiArrowDownCircleLine, RiEdit2Line, RiLoader5Fill, RiErrorWarningLine } from "react-icons/ri";
import { GiFoodTruck } from "react-icons/gi";

import { Redirect } from 'react-router-dom';

import UploadLogo from '../../media/upload_logo.png';

// function for manipulation of cuisine, meal and cooking type states into arrays
const reduceArray = (array) => {
    const newArray = array.map(object => {
        return object.type
    })
    
    const newerArray = newArray.reduce(
        (array, option) => ({...array,[option]: false}),{}
    );

    return newerArray
}

// function to change an array of objects to an array of strings
const changeToArray = (arrayOfObjects) => {
    const newArray = arrayOfObjects.map(object => {
        return object.type
    })

    return newArray
}

class AddRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeName: '',
            recipeTime: '',
            recipeServings: '',
            notes: '',
            imageLink: UploadLogo,
            image: '',

            // below state handles redirect/error state of page
            isRedirect: false,
            isError: false,

            // below states relate to options on form
            mealTypes: reduceArray(this.props.mealTypes),
            cuisineTypes: reduceArray(this.props.cuisineTypes),
            cookingStyles: reduceArray(this.props.cookingStyles),
            
            units: changeToArray(this.props.units),

            // below states handle ingredients
            currentIngreAmount: '',
            currentIngreUnit: '',
            currentIngre: '',

            addedIngreList: [],

            //below states handle instructions
            instructionCount: 1,
            currentInstruct: '',
            instructList: [],

            // below state stores current recipe to post
            recipeToPost: {},

            modalIcon: <RiErrorWarningLine />,
            modalTitle: '',
            modalContent: '',
            modalButton: '',
            displayModal: false
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

        this.uploadImage = this.uploadImage.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        this.convertRecipe = this.convertRecipe.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.updateRecipe = this.updateRecipe.bind(this);
        this.clearRecipe = this.clearRecipe.bind(this);
        this.toAllRecipes = this.toAllRecipes.bind(this);

        this.hideModal = this.hideModal.bind(this)

    }
    
    // function to control image upload
    onImageChange(event){
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
              imageLink: URL.createObjectURL(img),
              image: img
            });
        }
    }

    // functions to control change in name, time, servings, notes
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

    // functions to control checkbox changes
    handleMealCheckboxChange(e) {
        const selected = e.target.name;
        let newmealTypes = {...this.state.mealTypes};

        if (this.state.mealTypes[selected]) {
            newmealTypes[selected] = false
            this.setState({mealTypes: newmealTypes})
        } else {
            newmealTypes[selected] = true
            this.setState({mealTypes: newmealTypes})
        }
    }

    handleCuisineCheckboxChange(e) {
        const selected = e.target.name;
        let newcuisineTypes = {...this.state.cuisineTypes};

        if (this.state.cuisineTypes[selected]) {
            newcuisineTypes[selected] = false
            this.setState({cuisineTypes: newcuisineTypes})
        } else {
            newcuisineTypes[selected] = true
            this.setState({cuisineTypes: newcuisineTypes})
        }
    }

    handleStyleCheckboxChange(e) {
        const selected = e.target.name;
        let newcookingStyles = {...this.state.cookingStyles};

        if (this.state.cookingStyles[selected]) {
            newcookingStyles[selected] = false
            this.setState({cookingStyles: newcookingStyles})
        } else {
            newcookingStyles[selected] = true
            this.setState({cookingStyles: newcookingStyles})
        }
    }

    // functions to control ingredients
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

    addIngre(event) {
        
        if (this.state.currentIngreAmount === '' || this.state.currentIngre === '' ) {
            return;
        } else if (this.state.currentIngreAmount < 1) {
            this.setState({
                modalIcon: <RiErrorWarningLine />,
                modalTitle: 'Warning',
                modalContent: 'Please input valid ingredient.',
                modalButton: 'close',
                displayModal: true
            });
            return;
        } else if (event.key !== "Enter") {
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

    // functions to control instructions
    changeInstruct(e) {
        this.setState({
            currentInstruct: e.target.value
        })
    }

    addInstruct(event) {

        const clonedInstructList = [...this.state.instructList];

        // check if instructions are blank
        if (this.state.currentInstruct === '') {
            return;
        } 

        // check if event key is "Enter"
        else if (event.key !== "Enter") {
            return;
        }
        
        // check if this addition is due to editing of existing instruction
        else if (this.state.instructionCount <= clonedInstructList.length) {
            const indexToReplace = this.state.instructionCount - 1;
            clonedInstructList.splice(indexToReplace, 1, this.state.currentInstruct);
        } 
        
        // check if duplicate instructions
        else if (this.state.instructList.find(instruct => instruct === this.state.currentInstruct)) {
            this.setState({
                modalIcon: <RiErrorWarningLine />,
                modalTitle: 'Warning',
                modalContent: 'Duplicated instructions',
                modalButton: 'close',
                displayModal: true
            });
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
            instructionCount: index,
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

        if (this.state.instructionCount <= this.state.instructList.length) {
            return;
        }
        
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

        if (this.state.instructionCount <= this.state.instructList.length) {
            return;
        }
        
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

    // function to upload image
    uploadImage() {
        const imageType = /image.*/;

        if (this.state.image === '') {
            return
        } else if (!this.state.image.type) {
            return
        } else if (!this.state.image.type.match(imageType)) {
            this.setState({
                modalIcon: <RiErrorWarningLine />,
                modalTitle: 'Warning',
                modalContent: 'Sorry, only images are allowed.',
                modalButton: 'close',
                displayModal: true
            });
            return
        } else {
            return fetchData.uploadImage(this.state.image).then(fileName => {
                this.setState({image: fileName})
                console.log('image uploading done! image is', fileName)
            })
        }

    }

    // function to "delete" image
    deleteImage() {
        this.setState({
            imageLink: UploadLogo,
            image: ''
        })
    }


    // function to convert data to database format and set state of recipe to post
    convertRecipe() {
        console.log('start recipe conversion...')
        this.setState({isError: true})
        const {
            recipeName,
            recipeTime,
            recipeServings,
            notes,
            image,
            mealTypes,
            cuisineTypes,
            cookingStyles,
            addedIngreList,
            instructList
        } = this.state;
        
        // converting meal, cuisine and style types to database format
        const chosenMealTypes = Object.keys(mealTypes).filter(meal => mealTypes[meal]);
        const chosenCuisineTypes = Object.keys(cuisineTypes).filter(cuisine => cuisineTypes[cuisine]);
        const chosenStyleTypes = Object.keys(cookingStyles).filter(style => cookingStyles[style]);

        const convertedCuisineTypes = chosenCuisineTypes.map(type => {
            const foundCuisine = this.props.cuisineTypes.find(object => object.type === type)
            return foundCuisine.id;
        })

        const convertedMealTypes = chosenMealTypes.map(type => {
            const foundMeal = this.props.mealTypes.find(object => object.type === type)
            return foundMeal.id;
        })

        const convertedStyleTypes = chosenStyleTypes.map(type => {
            const foundStyle = this.props.cookingStyles.find(object => object.type === type)
            return foundStyle.id;
        })

        // checking for invalid inputs
        if (recipeName === '') {
            this.setState({
                modalIcon: <RiErrorWarningLine />,
                modalTitle: 'Warning',
                modalContent: 'Please fill in a name for the recipe.',
                modalButton: 'close',
                displayModal: true
            });
            return;
        } else if (isNaN(recipeTime) || recipeTime <= 0 || recipeTime === '') {
            this.setState({
                modalIcon: <RiErrorWarningLine />,
                modalTitle: 'Warning',
                modalContent: 'Please input valid "Time needed".',
                modalButton: 'close',
                displayModal: true
            });
            return;
        } else if (isNaN(recipeServings) || recipeServings <= 0) {
            this.setState({
                modalIcon: <RiErrorWarningLine />,
                modalTitle: 'Warning',
                modalContent: 'Please input valid "Servings".',
                modalButton: 'close',
                displayModal: true
            });
            return;
        } else if (chosenMealTypes.length <= 0) {
            this.setState({
                modalIcon: <RiErrorWarningLine />,
                modalTitle: 'Warning',
                modalContent: 'Please choose at least one meal type.',
                modalButton: 'close',
                displayModal: true
            });
            return;
        } else if (chosenCuisineTypes.length <= 0) {
            this.setState({
                modalIcon: <RiErrorWarningLine />,
                modalTitle: 'Warning',
                modalContent: 'Please choose at least one cuisine type.',
                modalButton: 'close',
                displayModal: true
            });
            return;
        } else if (chosenStyleTypes.length <= 0) {
            this.setState({
                modalIcon: <RiErrorWarningLine />,
                modalTitle: 'Warning',
                modalContent: 'Please choose at least one cooking style.',
                modalButton: 'close',
                displayModal: true
            });
            return;
        } else if (addedIngreList.length <= 0) {
            this.setState({
                modalIcon: <RiErrorWarningLine />,
                modalTitle: 'Warning',
                modalContent: 'Please add at least one ingredient.',
                modalButton: 'close',
                displayModal: true
            });
            return;
        } else if (instructList.length <= 0) {
            this.setState({
                modalIcon: <RiErrorWarningLine />,
                modalTitle: 'Warning',
                modalContent: 'Please add at least one instruction.',
                modalButton: 'close',
                displayModal: true
            });
            return;
        }

        // converting ingredients and instructions to database format
        const ingreArray = addedIngreList.map(object => {
            return `${object.amount}-${object.unit}-${object.ingredient}`
        })

        const convertedIngreArray = ingreArray.join();

        const convertedInstructList = instructList.join('&');

        // sending POST request to server
        const recipeToPost = {
            id: this.props.isEdit ? this.props.currentRecipe.id : null,
            name: recipeName,
            image: image,
            time: recipeTime,
            servings: recipeServings,
            cuisineTypes: convertedCuisineTypes.toString(),
            mealTypes: convertedMealTypes.toString(),
            cookingStyles: convertedStyleTypes.toString(),
            ingredients: convertedIngreArray,
            instructions: convertedInstructList,
            notes: notes
        }

        this.setState({
            recipeToPost: recipeToPost,
            isError: false
        });
        console.log('recipe conversion done!!')
        console.log(recipeToPost)
        
    }

    // function to add recipe
    async addRecipe() {
        console.log('adding recipe...')
        await this.uploadImage();
        await this.convertRecipe();
        if (this.state.isError) {
            return;
        } else {
            await fetchData.createRecipe(this.state.recipeToPost);
            this.setState({
                modalIcon: <GiFoodTruck />,
                modalTitle: 'Success!',
                modalContent: 'Recipe added.',
                modalButton: 'okay',
                displayModal: true
            });
            this.props.resetModes();
        }
        
    }

    // function to clear recipe
    clearRecipe() {
        this.setState({
            recipeName: '',
            recipeTime: '',
            recipeServings: '',
            notes: '',
            imageLink: UploadLogo,
            image: '',
            mealTypes: reduceArray(this.props.mealTypes),
            cuisineTypes: reduceArray(this.props.cuisineTypes),
            cookingStyles: reduceArray(this.props.cookingStyles),
            currentIngreAmount: '',
            currentIngreUnit: '',
            currentIngre: '',
            addedIngreList: [],
            instructionCount: 1,
            currentInstruct: '',
            instructList: []
        })
    }

    // function for updating of recipe
    async updateRecipe() {

        await this.uploadImage();
        await this.convertRecipe();
        if (this.state.isError) {
            return;
        } else {
            await fetchData.updateRecipe(this.state.recipeToPost);
            this.setState({
                modalIcon: <GiFoodTruck />,
                modalTitle: 'Success!',
                modalContent: 'Recipe updated.',
                modalButton: 'okay',
                displayModal: true
            });
            this.props.resetModes();
        }
    }

    // function to redirect to all recipes
    toAllRecipes() {
        this.props.resetModes();
        this.setState({isRedirect: true})
    }

    // function to close modal
    hideModal() {
        if (this.state.modalButton === 'okay') {
            this.setState({
                displayModal: false,
                isRedirect: true
            })
        } else if (this.state.modalButton === 'close') {
            this.setState({
                displayModal: false
            })
        }
        
    }

    // function to set input fields to current recipe (for duplicate/edit recipe buttons)
    componentDidMount() {
        this.props.hideMenuDisplay();
        
        if (this.props.isEdit || this.props.isDuplicate) {

            let updatedMealTypes = {...this.state.mealTypes};
            this.props.currentRecipe.mealType.map(type => {
               return updatedMealTypes[type] = true
            })

            let updatedCuisineTypes = {...this.state.cuisineTypes};
            this.props.currentRecipe.cuisineType.map(type => {
               return updatedCuisineTypes[type] = true
            })

            let updatedCookingStyles = {...this.state.cookingStyles};
            this.props.currentRecipe.cookingStyle.map(type => {
               return updatedCookingStyles[type] = true
            })

            this.setState({
                recipeName: this.props.currentRecipe.name,
                recipeTime: this.props.currentRecipe.time,
                recipeServings: this.props.currentRecipe.servings,
                notes: this.props.currentRecipe.notes,
                imageLink: this.props.currentRecipe.imageLink === ''? UploadLogo : this.props.currentRecipe.imageLink,
                image: this.props.currentRecipe.image === ''? '' : this.props.currentRecipe.image,
                mealTypes: updatedMealTypes,
                cuisineTypes: updatedCuisineTypes,
                cookingStyles: updatedCookingStyles,
                addedIngreList: this.props.currentRecipe.ingredients,
                instructionCount: this.props.currentRecipe.instructions.length + 1,
                instructList: this.props.currentRecipe.instructions
            })
        }

    }

    componentWillUnmount() {
        this.props.resetModes();
    }

    render() {
        let displayHeader = 'Add ';
        let saveButton = 'Save Recipe';
        let clearButton = 'Clear Recipe';
        let saveOnclick = this.addRecipe;
        let clearOnclick = this.clearRecipe;

        if (this.props.isEdit) {
            displayHeader = 'Edit ';
            saveButton = 'Update Recipe';
            clearButton = 'Cancel Edit';
            saveOnclick = this.updateRecipe;
            clearOnclick = this.toAllRecipes;

        } else if (this.state.isRedirect) {
            return <Redirect to={`/all-recipes`} />
        } else if (this.props.isFetching) {
            return (
                <div className="loading-screen">
                    <RiLoader5Fill />
                </div>
            )
        }

        return (
            <div>
                <Modal 
                        displayModal={this.state.displayModal}
                        handleClose={this.hideModal}
                        modalIcon={this.state.modalIcon}
                        modalTitle={this.state.modalTitle}
                        modalContent={this.state.modalContent}
                        modalButton={this.state.modalButton}
                    />
                <div className="add-recipe-main-container">

                    <h1>{displayHeader}Recipe</h1>

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
                                <div className="add-recipe-image-container" onClick={this.deleteImage}>
                                    <div className="add-recipe-image"><img src={this.state.imageLink} alt="upload" /></div>
                                    <div className="add-recipe-image-delete"><RiDeleteBinLine /></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="add-recipe-divider"></div>

                        {/* renders checkboxes selection */}
                        <div className="add-recipe-individual-row">
                            <div className="add-recipe-main-checkbox-container">
                                <div className="add-recipe-checkbox-container">
                                    <p>Cuisine Type</p>
                                    <p className="add-recipe-checkbox">
                                        {this.props.cuisineTypes.map(option => {
                                        return <Checkbox className="add-recipe-checkbox" label={option.type} key={option.type} onCheckboxChange={this.handleCuisineCheckboxChange} isSelected={this.state.cuisineTypes[option.type]} />
                                        })}
                                    </p>
                                </div>
                                <div className="add-recipe-checkbox-container">
                                    <p>Meal Type</p>
                                    <p className="add-recipe-checkbox">
                                        {this.props.mealTypes.map(option => {
                                        return <Checkbox label={option.type} key={option.type} onCheckboxChange={this.handleMealCheckboxChange} isSelected={this.state.mealTypes[option.type]} />
                                        })}
                                    </p>
                                </div>
                                <div className="add-recipe-checkbox-container">
                                    <p>Cooking Style</p>
                                    <p className="add-recipe-checkbox">
                                        {this.props.cookingStyles.map(option => {
                                        return <Checkbox className="add-recipe-checkbox" key={option.type} label={option.type} onCheckboxChange={this.handleStyleCheckboxChange} isSelected={this.state.cookingStyles[option.type]} />
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
                                <div className="add-recipe-new-ingre" onKeyPress={this.addIngre}>
                                    <input type="number" value={this.state.currentIngreAmount} onChange={this.changeIngreAmount} />
                                    <select value={this.state.currentIngreUnit} onChange={this.changeIngreUnit}>
                                        {this.state.units.map(unit => {
                                            return <option value={unit} key={unit}>{unit}</option>
                                        })}
                                    </select>
                                    <input type="text" value={this.state.currentIngre} onChange={this.changeIngre} />
                                    <RiAddLine id="add-button" onClick={() => this.addIngre({key: "Enter"})}/>
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
                            <div className="add-recipe-instructions-key">
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
                                    <textarea value={this.state.currentInstruct} onChange={this.changeInstruct} onKeyPress={this.addInstruct} />
                                    <RiAddLine id="add-button" onClick={() => this.addInstruct({key: "Enter"})}/>
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
                        <div className="add-recipe-form-button" onClick={saveOnclick}>
                            {saveButton}
                        </div>
                        <div className="add-recipe-form-button" onClick={clearOnclick}>
                            {clearButton}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddRecipe;